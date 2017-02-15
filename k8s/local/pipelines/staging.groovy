@Library('buildit')
def LOADED = true
podTemplate(label: 'nodeapp',
  containers: [
    containerTemplate(name: 'nodejs-builder', image: 'builditdigital/node-builder', ttyEnabled: true, command: 'cat', privileged: true),
    containerTemplate(name: 'docker', image: 'docker:1.11', ttyEnabled: true, command: 'cat'),
    containerTemplate(name: 'kubectl', image: 'builditdigital/kube-utils', ttyEnabled: true, command: 'cat')],
  volumes: [
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
    hostPathVolume(mountPath: '/var/cache', hostPath: '/tmp'),
    hostPathVolume(mountPath: '/var/projects', hostPath: '/Users/romansafronov/dev/projects')
  ]) {
  node('nodeapp') {

    currentBuild.result = "SUCCESS"
    sendNotifications = false //FIXME !DEV_MODE

    try {
      stage('Set Up') {
        gitInst = new git()
        npmInst = new npm()
        slackInst = new slack()

        buildNumber = env.BUILD_NUMBER
        appName = "synapse"
        cloud = "local"
        env = "staging"
        slackChannel = "synapse"
        gitUrl = "https://github.com/buildit/synapse.git"
        dockerRegistry = "builditdigital"
        image = "$dockerRegistry/$appName"
        deployment = "${appName}-${env}"
      }
      container('nodejs-builder') {
        stage('Checkout') {
          checkout scm
          //git(url: '/var/projects/synapse', branch: 'spike/security_perimeter')

          shortCommitHash = gitInst.getShortCommit()
          commitMessage = gitInst.getCommitMessage()
          version = npmInst.getVersion()
        }

        stage("Install") {
          // poor man's caching for node modules
          sh 'mkdir -p /var/cache/synapse-build/_cache'
          sh 'cp -r /var/cache/synapse-build/* .'
          sh "npm install"
          sh "rm -rf /var/cache/synapse-build/* && cp -r node_modules /var/cache/synapse-build/"
        }

        stage("Test") {
          try {
            sh "npm run test:ci"
          }
          finally {
            junit 'reports/test-results.xml'
          }
        }

        stage("Analysis") {
          sh "npm run lint"
        }

        stage("Build") {
          sh "NODE_ENV='removeme' npm run build"
        }
      }
      container('docker') {
        stage('Docker Image Build') {
          tag = "${version}-${shortCommitHash}-${buildNumber}"
          // Docker pipeline plugin does not work with kubernetes (see https://issues.jenkins-ci.org/browse/JENKINS-39664)
          sh "docker build -t $image:$tag ."
          //ecrInst.authenticate(env.AWS_REGION) FIXME
        }
      }

      container('kubectl') {
        stage('Deploy To K8S') {
          def deployment = "$appName-$env"
          deploymentObj = "$deployment-$appName".take(24)
          def varsFile = "./k8s/${cloud}/vars/${env}.yaml"
          sh "helm ls -q | grep $deployment || helm install ./k8s/synapse -f $varsFile -n $deployment"
          sh "helm upgrade $deployment ./k8s/synapse -f $varsFile --set image.repository=$image --set image.tag=$tag"
          sh "kubectl rollout status deployment/$deploymentObj"
        }
      }

      container('nodejs-builder') {
        stage('Run Functional Acceptance Tests') {
          //nasty workaround for temporary chrome socket issue (can't use remote mount for it)
          sh "mkdir /tmp/wscopy && cd . && ls -1 | xargs -I '{}'  ln -s `pwd`/{} /tmp/wscopy/{}"

          try {
            // nasty workaround for local env (in case you haven't installed dnsmasq)
            sh "echo '192.168.99.100 synapse.kube.local synapse.kube.local heimdall.kube.local' > /etc/hosts"
            sh "cd /tmp/wscopy && URL=http://synapse.kube.local xvfb-run -s '-screen 0 1280x1024x16' npm run test:acceptance:ci"
          }
          finally {
            archiveArtifacts allowEmptyArchive: true, artifacts: 'screenshots/*.png'
            junit 'reports/acceptance-test-results.xml'
          }
        }
      }

      container('docker') {
        stage('Promote Build to latest') {
          sh "docker tag $image:$tag $image:latest"
          if (sendNotifications) slackInst.notify("Deployed to Staging", "Commit <${gitUrl}/commits/${shortCommitHash}|${shortCommitHash}> has been deployed to ${env}\n\n${commitMessage}", "good", "http://i3.kym-cdn.com/entries/icons/square/000/002/230/42.png", slackChannel)
        }
      }
    }
    catch (err) {
      currentBuild.result = "FAILURE"
      if (sendNotifications) slackInst.notify("Error while deploying to Staging", "Commit <${gitUrl}/commits/${shortCommitHash}|${shortCommitHash}> failed to deploy to ${env}", "danger", "http://i2.kym-cdn.com/entries/icons/original/000/002/325/Evil.jpg", slackChannel)
      throw err
    }
  }
}
