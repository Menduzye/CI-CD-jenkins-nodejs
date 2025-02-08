pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t my-node-app .'
            }
        }
        stage('Push to Repo') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: 'https://index.docker.io/v1/']) {
                    sh 'docker tag my-node-app menduzye/my-node-app:latest'
                    sh 'docker push menduzye/my-node-app:latest'
                }
            }
        }
    }
}

