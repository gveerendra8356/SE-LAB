pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        REGISTRY_USER = 'gveerendra8356' // Replace with your Docker Hub username
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/gveerendra8356/SE-LAB.git'
            }
        }
        stage('Build & Push Backend') {
            steps {
                script {
                    sh "docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}"
                    sh "docker build -t ${REGISTRY_USER}/calculator-backend:latest ./backend"
                    sh "docker push ${REGISTRY_USER}/calculator-backend:latest"
                }
            }
        }
        stage('Build & Push Frontend') {
            steps {
                script {
                    sh "docker build -t ${REGISTRY_USER}/calculator-frontend:latest ./frontend"
                    sh "docker push ${REGISTRY_USER}/calculator-frontend:latest"
                }
            }
        }
        stage('Handover / Deploy to Client Server') {
            steps {
                // Securely SSH into the client server and update containers
                sshagent(['client-server-ssh-key']) {
                    sh "ssh -o StrictHostKeyChecking=no ubuntu@CLIENT_SERVER_IP 'cd ~/SE-LAB && docker compose pull && docker compose up -d --force-recreate'"
                }
            }
        }
    }
}
