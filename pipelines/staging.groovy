node {
  withEnv(["PATH+NODE=${tool name: 'latest', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
    currentBuild.result = "SUCCESS"

    try {
      stage("Set Up") {
        sh "curl -L https://dl.bintray.com/buildit/maven/jenkins-pipeline-libraries-${env.PIPELINE_LIBS_VERSION}.zip -o lib.zip && echo 'A' | unzip lib.zip"

        ecr = load "lib/ecr.groovy"
        git = load "lib/git.groovy"
        npm = load "lib/npm.groovy"
        shell = load "lib/shell.groovy"
        slack = load "lib/slack.groovy"
        convox = load "lib/convox.groovy"
        template = load "lib/template.groovy"

        domainName = "${env.MONGO_HOSTNAME}".substring(8)
        registryBase = "006393696278.dkr.ecr.${env.AWS_REGION}.amazonaws.com"
        registry = "https://${registryBase}"
        appName = "synapse"

        // global for exception handling
        slackChannel = "synapse"
        gitUrl = "https://bitbucket.org/digitalrigbitbucketteam/synapse"
        appUrl = "http://synapse.staging.${domainName}"
      }

      stage("Checkout") {
        checkout scm

        // global for exception handling
        shortCommitHash = git.getShortCommit()
        commitMessage = git.getCommitMessage()
        version = npm.getVersion()
      }

      stage("Install") {
        sh "node --version"
        sh "npm install"
        sh "npm update"
      }

      stage("Test") {
        try {
          sh "npm run test:ci"
        }
        finally {
          junit 'reports/test-results.xml'
          publishHTML(target: [reportDir: 'reports', reportFiles: 'test-results.html', reportName: 'Test Results'])
        }
      }

      stage("Analysis") {
        sh "npm run lint"
      }

      stage("Build") {
        sh "NODE_ENV='staging' EOLAS_DOMAIN='${domainName}' npm run build"
      }

      stage("Docker Image Build") {
        tag = "${version}-${shortCommitHash}-${env.BUILD_NUMBER}"
        image = docker.build("${appName}:${tag}", '.')
        ecr.authenticate(env.AWS_REGION)
      }

      stage("Docker Push") {
        docker.withRegistry(registry) {
          image.push("${tag}")
        }
      }

      stage("Deploy To Staging") {
        tmpFile = UUID.randomUUID().toString() + ".tmp"
        ymlData = template.transform(readFile("docker-compose.yml.template"), [tag: tag, registry_base: registryBase])
        writeFile(file: tmpFile, text: ymlData)

        sh "convox login ${env.CONVOX_RACKNAME} --password ${env.CONVOX_PASSWORD}"
        sh "convox env set NODE_ENV=staging EOLAS_DOMAIN=${domainName} --app ${appName}-staging"
        sh "convox deploy --app ${appName}-staging --description '${tag}' --file ${tmpFile} --wait"
      }

      stage("Run Functional Tests") {
        // wait until the app is deployed
        convox.waitUntilDeployed("${appName}-staging")
        convox.ensureSecurityGroupSet("${appName}-staging", env.CONVOX_SECURITYGROUP)

        // run Selenium tests
        try {
          sh "NODE_ENV=staging URL=http://synapse.staging.${domainName} xvfb-run -d -s '-screen 0 1280x1024x16' npm run test:acceptance:ci"
        }
        finally {
          archiveArtifacts allowEmptyArchive: true, artifacts: 'screenshots/*.png'
          junit 'reports/acceptance-test-results.xml'
        }
      }

      stage("Promote Build to latest") {
        docker.withRegistry(registry) {
          image.push("latest")
        }
        slack.notify("Deployed to Staging", "Commit <${gitUrl}/commits/${shortCommitHash}|${shortCommitHash}> has been deployed to <${appUrl}|${appUrl}>\n\n${commitMessage}", "good", "http://images.8tracks.com/cover/i/001/225/360/18893.original-9419.jpg?rect=50,0,300,300&q=98&fm=jpg&fit=max&w=100&h=100", slackChannel)
      }
    }
    catch (err) {
      currentBuild.result = "FAILURE"
      slack.notify("Error while deploying to Staging", "Commit <${gitUrl}/commits/${shortCommitHash}|${shortCommitHash}> failed to deploy to <${appUrl}|${appUrl}>", "danger", "https://yt3.ggpht.com/-X2hgGcBURV8/AAAAAAAAAAI/AAAAAAAAAAA/QnCcurrZr50/s100-c-k-no-mo-rj-c0xffffff/photo.jpg", slackChannel)
      throw err
    }
  }
}
