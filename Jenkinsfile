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
                sh "./build_and_push_docker.sh"
                echo "docker build and push finished"
            }
        }
        stage('Deploy'){
            steps {
                echo "pull the new docker image and replace the container"
                sh "./deploy.sh"
                echo "deploy completed"
            }
        }
        
    }
}
