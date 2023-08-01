pipeline {
    agent {
        docker {
            image 'jenkins/jenkins:lts'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'infra',
                            credentialsId: 'howdoilook',
                            url: 'https://lab.ssafy.com/s09-webmobile1-sub2/S09P12B304.git'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('front') {
                    sh 'apt-get update && apt-get install -y npm'
                    sh 'npm install --force'
                    sh 'npm run build'
                    sh 'docker build -t parkseyun/howdoilook:front .'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('Back') {
                    sh './gradlew clean build'
                    sh 'docker build -t parkseyun/howdoilook:back .'
                }
            }
        }

        stage('Docker Push') {
            steps {
                sh 'docker push parkseyun/howdoilook:front'
                sh 'docker push parkseyun/howdoilook:back'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying services...'
                sh 'docker-compose up -d front back'
            }
        }
    }
}
