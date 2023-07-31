pipeline {
    agent any

    environment {
        DOCKER_IMAGE_FRONT = 'parkseyun/howdoilook:front'
        DOCKER_IMAGE_BACK = 'parkseyun/howdoilook:back'
        DOCKER_IMAGE_NGINX = 'nginx'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building frontend and backend...'
                sh 'docker-compose build front back'
            }
        }

        stage('Test') {
            steps {
                 echo 'Running tests...'

                // Replace this with your actual test commands
                sh 'docker-compose up -d front' // 데몬 모드로 실행
                sh 'docker-compose run --rm front npm test'
                sh 'docker-compose down' // 테스트 후에 컨테이너 종료
                sh 'docker-compose up -d back' // 데몬 모드로 실행
                sh 'docker-compose run --rm back pytest'
                sh 'docker-compose down' // 테스트 후에 컨테이너 종료
            }
        }

        stage('Push') {
            steps {
                echo 'Pushing images to Docker registry...'
                sh 'docker login -u your_dockerhub_username -p your_dockerhub_password'
                sh "docker push $DOCKER_IMAGE_FRONT"
                sh "docker push $DOCKER_IMAGE_BACK"
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying services...'
                sh 'docker-compose up -d front back redis'
                sh 'docker-compose up -d nginx'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'docker-compose down'
        }
    }
}
