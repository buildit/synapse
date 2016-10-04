// Production release pipeline

node {

  currentBuild.result = "SUCCESS"

  try {

    stage("Set Up") {
      checkout scm

      sh "curl -L https://dl.bintray.com/buildit/maven/jenkins-pipeline-libraries-${env.PIPELINE_LIBS_VERSION}.zip -o lib.zip && echo 'A' | unzip lib.zip"

      ui = load "lib/ui.groovy"
      ecr = load "lib/ecr.groovy"
      slack = load "lib/slack.groovy"
      convox = load "lib/convox.groovy"
      template = load "lib/template.groovy"

      domainName = "${env.MONGO_HOSTNAME}".substring(8)
      appName = "synapse"
      registryBase = "006393696278.dkr.ecr.${env.AWS_REGION}.amazonaws.com"

      // global for exception handling
      slackChannel = "synapse"
      gitUrl = "https://bitbucket.org/digitalrigbitbucketteam/synapse"
      appUrl = "http://synapse.${domainName}"
    }

    stage("Write docker-compose") {
      // global for exception handling
      tag = ui.selectTag(ecr.imageTags(appName, env.AWS_REGION))
      tmpFile = UUID.randomUUID().toString() + ".tmp"
      ymlData = template.transform(readFile("docker-compose.yml.template"), [tag: tag, registry_base: registryBase])

      writeFile(file: tmpFile, text: ymlData)
    }

    stage("Deploy to production") {
      sh "convox login ${env.CONVOX_RACKNAME} --password ${env.CONVOX_PASSWORD}"
      sh "convox env set NODE_ENV=production EOLAS_DOMAIN=${domainName} --app ${appName}"
      sh "convox deploy --app ${appName} --description '${tag}' --file ${tmpFile} --wait"
      sh "rm ${tmpFile}"

      // wait until the app is deployed
      convox.waitUntilDeployed("${appName}")
      convox.ensureSecurityGroupSet("${appName}", env.CONVOX_SECURITYGROUP)
      slack.notify("Deployed to Production", "Tag <${gitUrl}/commits/tag/${tag}|${tag}> has been deployed to <${appUrl}|${appUrl}>", "good", "http://images.8tracks.com/cover/i/001/225/360/18893.original-9419.jpg?rect=50,0,300,300&q=98&fm=jpg&fit=max&w=100&h=100", slackChannel)
    }
  }
  catch (err) {
    currentBuild.result = "FAILURE"
    slack.notify("Error while deploying to Production", "Tag <${gitUrl}/commits/tag/${tag}|${tag}> failed to deploy to <${appUrl}|${appUrl}>", "danger", "https://yt3.ggpht.com/-X2hgGcBURV8/AAAAAAAAAAI/AAAAAAAAAAA/QnCcurrZr50/s100-c-k-no-mo-rj-c0xffffff/photo.jpg", slackChannel)
    throw err
  }
}
