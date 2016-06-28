#!groovy

node {
    sh '. ~/.nvm/nvm.sh && echo $PATH > JENKINS_NVM_PATH'
    env.PATH = readFile('JENKINS_NVM_PATH')
    sh 'rm JENKINS_NVM_PATH'

    stage name: "Checkout"
    checkout scm

    stage name: "Build"
    sh "npm install"
    sh "npm run build"


    stage name: "Deploy To AWS"
    sh "convox login convox.buildit.tools --password PqSKzNqXXbKuuJspbXZBUIRGSAtlER"
    sh "convox deploy --app synapse"

}
