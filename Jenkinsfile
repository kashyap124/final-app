pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-southeast-2'
        ECR_REPO = '203056033321.dkr.ecr.ap-southeast-2.amazonaws.com/namaspace-oms/node-application'
        IMAGE_TAG = 'latest'
        CLUSTER_NAME = 'k8-cluster01'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git credentialsId: 'github-creds',
                    url: 'https://github.com/kashyap124/final-app.git',
                    branch: 'order-application'
            }
        }

        stage('Set Image Tag') {
            steps {
                script {
                    IMAGE_TAG = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    env.IMAGE_TAG = IMAGE_TAG
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${ECR_REPO}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    sh """
                        aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO}
                        docker push ${ECR_REPO}:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                script {
                    sh """
                        aws eks update-kubeconfig --region ${AWS_REGION} --name ${CLUSTER_NAME}
                        kubectl set image deployment/your-deployment-name your-container-name=${ECR_REPO}:${IMAGE_TAG} -n your-namespace
                        kubectl rollout status deployment/your-deployment-name -n your-namespace
                    """
                }
            }
        }
    }
}
