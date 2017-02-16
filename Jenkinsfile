#!groovy

pipeline {
    agent any
    environment {
        CC = 'clang'
        AB = 'CD'
    }
    stages {
        stage('Build'){
            steps {
                echo "start building"
                echo "Running ${env.AB} ${env.BUILD_ID} on ${env.JENKINS_URL}"
                // archivcommenteArtifacts artifacts:'**/*.js', fingerprint: true
            }
        }
        stage('Build Docker Image'){
            steps {
                echo "start building docker image"
                sh "sudo docker build -t nguyenkims/satellizer-demo:${env.BUILD_ID} ."
                sh "sudo docker push nguyenkims/satellizer-demo"
                echo "docker build finished"
            }
        }
        
    }
}
