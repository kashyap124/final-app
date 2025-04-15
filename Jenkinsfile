pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-southeast-2'
        ECR_REPO = '203056033321.dkr.ecr.ap-southeast-2.amazonaws.com/namaspace-oms/node-application'
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
                    IMAGE_TAG = "${env.BUILD_NUMBER}"
                    env.IMAGE_TAG = IMAGE_TAG
                }
            }
        }


        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                        cd frontend
                        docker build -t ${ECR_REPO}:${IMAGE_TAG} .
                    """
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
                    // Update kubeconfig to point to the correct EKS cluster
                    sh '''
                        echo "[+] Updating kubeconfig for EKS"
                        aws sts get-caller-identity
                        aws eks update-kubeconfig --region $AWS_REGION --name $CLUSTER_NAME
                        kubectl config current-context
                    '''

                    // Authenticate Docker to ECR
                    sh '''
                        echo "[+] Logging in to Amazon ECR"
                        aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO
                    '''

                    // Deploy application using Kubernetes manifests already in repository
                    sh '''
                        echo "[+] Applying Kubernetes deployment and service"
                        kubectl apply -f k8s-manifest/frontend-deployment.yaml
                        kubectl apply -f k8s-manifest/frontend-service.yaml
                    '''

                    echo "[✓] Deployment completed"
                }
            }
        }
    }
}
