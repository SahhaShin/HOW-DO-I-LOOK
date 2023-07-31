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
                echo 'Running tests for front...'
                sh 'docker-compose up -d front' // front 컨테이너 데몬 모드로 실행
                sh 'docker-compose exec front npm test' // 테스트 실행
                sh 'docker-compose down' // 이전에 실행된 컨테이너 중지 및 삭제

                echo 'Running tests for back...'
                sh 'docker-compose up -d back' // back 컨테이너 데몬 모드로 실행
                sh 'docker-compose exec back pytest' // 테스트 실행
                sh 'docker-compose down' // 이전에 실행된 컨테이너 중지 및 삭제
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
