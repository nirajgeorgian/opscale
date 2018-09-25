pipeline {
  agent any
  stages {
    // stage('Clean') {
    //   steps {
    //     // stop all docker container
    //     sh 'docker stop $(docker ps -q)'
    //     // remove all stopped container
    //     sh 'docker rm $(docker ps -a -q)'
    //     // remove dangling docker container
    //     sh 'docker rmi $(docker images -q -f dangling=true)'
    //   }
    // }
    stage('Build') {
      steps {
        sh 'docker-compose build'
      }
    }
    stage('Run') {
      steps {
        timeout(time: 3, unit: 'MINUTES') {
          retry(3) {
            sh 'docker-compose up -d'
          }
        }
      }
    }
  }
	post {
    always {
      sh 'echo Check for failure or success build'
    }
		success {
			sh 'echo Build and deploy success'
      echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL} job name ${env.JOB_NAME}"
		}
	}
}
