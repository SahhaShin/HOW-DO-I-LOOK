pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'develop', url: 'https://lab.ssafy.com/s09-webmobile1-sub2/S09P12B304.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install --force'
                sh 'npm run build'
            }
        }

        stage('Docker Build & Push') {
            steps {
                sh 'docker build -t parkseyun/howdoilook:front .'
                sh 'docker push parkseyun/howdoilook:front'
            }
        }
    }
}

pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'develop', url: 'https://lab.ssafy.com/s09-webmobile1-sub2/S09P12B304.git'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('front') {
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
    }
}

