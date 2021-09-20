pipeline {
  agent {
    node {
      label 'CB-agents'
    }

  }
  stages {
    stage('GitLab code checkout') {
      steps {
        git(branch: 'master', credentialsId: 'svc.jenkins-ssh', url: 'git@172.31.100.151:devsecops/tech-svc.git', changelog: true)
      }
    }

    stage('NodeJS Build') {
      steps {
        sh '''source ~/.bashrc

nvm install 13.10.1

npm install

npm run build'''
      }
    }

    stage('Build Docker image') {
      steps {
        sh '''

docker build --tag 172.31.100.152:10000/applications/tech-svc:tech-svc-1.0.${BUILD_NUMBER} .


'''
      }
    }

    stage('Publish new image to Nexus') {
      steps {
        sh 'docker push 172.31.100.152:10000/applications/tech-svc:tech-svc-1.0.${BUILD_NUMBER}'
      }
    }
    
    stage('Deploy using Ansible') {
        steps {
            triggerRemoteJob mode: [$class: 'AwaitResult', timeout: [timeoutStr: '1d'], whenFailure: [$class: 'StopAsFailure'], whenTimeout: [$class: 'ContinueAsFailure'], whenUnstable: [$class: 'ContinueAsUnstable']], parameterFactories: [[$class: 'EvaluatedString', expression: "tech-svc-1.0.${BUILD_NUMBER}", name: 'VersionTag']], remotePathMissing: [$class: 'StopAsFailure'], remotePathUrl: 'jenkins://38915f173304fcdec5e027846be9f4af/DevSecOps/ansible_tech-svc-backend'
        }
    }

  }
}
