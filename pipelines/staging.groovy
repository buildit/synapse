node {
  withEnv(["PATH+NODE=${tool name: 'latest', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
    currentBuild.result = "SUCCESS"

    try {
      stage "Set Up"
        sh "curl -L https://dl.bintray.com/buildit/maven/jenkins-pipeline-libraries-${env.PIPELINE_LIBS_VERSION}.zip -o lib.zip && echo 'A' | unzip lib.zip"

        ecr = load "lib/ecr.groovy"
        git = load "lib/git.groovy"
        npm = load "lib/npm.groovy"
        shell = load "lib/shell.groovy"
        slack = load "lib/slack.groovy"
        convox = load "lib/convox.groovy"
        template = load "lib/template.groovy"

        def domainName = "${env.MONGO_HOSTNAME}".substring(8)
        def registryBase = "006393696278.dkr.ecr.${env.AWS_REGION}.amazonaws.com"
        def registry = "https://${registryBase}"
        def appName = "synapse"

        // global for exception handling
        slackChannel = "synapse"
        gitUrl = "https://bitbucket.org/digitalrigbitbucketteam/synapse"
        appUrl = "http://synapse.staging.${domainName}"

      stage "Checkout"
        checkout scm

        // global for exception handling
        shortCommitHash = git.getShortCommit()
        def commitMessage = git.getCommitMessage()
        def version = npm.getVersion()

      stage "Install"
        sh "node --version"
        sh "npm install"

      stage "Test"
        try {
          sh "npm run test:ci"
        }
        finally {
          junit 'reports/test-results.xml'
          publishHTML(target: [reportDir: 'reports', reportFiles: 'test-results.html', reportName: 'Test Results'])
        }

      stage "Analysis"
        sh "npm run lint"

      stage "Build"
        sh "NODE_ENV='production' MIDAS_API_URL='http://midas-api.${domainName}/' npm run build"

      stage "Docker Image Build"
        def tag = "${version}-${shortCommitHash}-${env.BUILD_NUMBER}"
        def image = docker.build("${appName}:${tag}", '.')
        ecr.authenticate(env.AWS_REGION)

      stage "Docker Push"
        docker.withRegistry(registry) {
          image.push("${tag}")
        }

      stage "Deploy To AWS"
        def tmpFile = UUID.randomUUID().toString() + ".tmp"
        def ymlData = template.transform(readFile("docker-compose.yml.template"), [tag: tag, registry_base: registryBase, domain_name: domainName])
        writeFile(file: tmpFile, text: ymlData)

        sh "convox login ${env.CONVOX_RACKNAME} --password ${env.CONVOX_PASSWORD}"
        sh "convox env set NODE_ENV=production MIDAS_API_URL=http://midas-api.${domainName}/ --app ${appName}-staging"
        sh "convox deploy --app ${appName}-staging --description '${tag}' --file ${tmpFile}"

      stage "Run Functional Tests"
        // wait until the app is deployed
        convox.waitUntilDeployed("${appName}-staging")
        convox.ensureSecurityGroupSet("${appName}-staging", env.CONVOX_SECURITYGROUP)
        // run Selenium tests
        try {
          sh 'URL=http://synapse.staging.buildit.tools/# xvfb-run -d -s "-screen 0 1280x1024x16" npm run test:acceptance:ci'
        }
        finally {
          archiveArtifacts allowEmptyArchive: true, artifacts: 'screenshots/*.png'
          junit 'reports/acceptance-test-results.xml'
        }

      stage "Promote Build to latest"
        docker.withRegistry(registry) {
          image.push("latest")
        }
        slack.notify("Deployed to Staging", "Commit <${gitUrl}/commits/${shortCommitHash}|${shortCommitHash}> has been deployed to <${appUrl}|${appUrl}>\n\n${commitMessage}", "good", "https://3e72372a-a-551982af-s-sites.googlegroups.com/a/umn.edu/synapse/home/tumblr_inline_mxzqz2h6s61r41umo.jpg?attachauth=ANoY7crn3NWukDP8A4TAaqItkX3d5pvCuER1hFCxlSg97TpbKswdfUPQTHfL0qEuz8mCTssKwIPFsmZqyBqA9hRRh1J2XVmpGS9sdPXaglbay4zOVrqeMMwJlQQpuzxon_Y7ZseON7bIZuN_uEH4MQA4z9G-LQqc0Ijrhsk1gMz41RkvMuyrTdvwgZGczL1cDBTKTWCgt-cY3js1QWmObRxcyHxiYGXo3tTmoausJva7fIad7drCuWw%3D&attredirects=0", slackChannel)
    }
    catch (err) {
      currentBuild.result = "FAILURE"
      slack.notify("Error while deploying to Staging", "Commit <${gitUrl}/commits/${shortCommitHash}|${shortCommitHash}> failed to deploy to <${appUrl}|${appUrl}>", "danger", "http://jonlieffmd.com/wp-content/uploads/2014/12/bigstock-Synapse-6391577.jpg", slackChannel)
      throw err
    }
  }
}
