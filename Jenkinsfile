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




        stage('Push') {
            steps {
                echo 'Building frontend and backend...'
                sh 'docker-compose build front back'

                echo 'Tagging images for Docker registry...'
                sh "docker tag parkseyun/howdoilook:front docker.io/parkseyun/howdoilook:front"
                sh "docker tag parkseyun/howdoilook:back docker.io/parkseyun/howdoilook:back"

                echo 'Pushing images to Docker registry...'
                sh "docker push docker.io/parkseyun/howdoilook:front"
                sh "docker push docker.io/parkseyun/howdoilook:back"
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying services...'
                sh 'docker-compose up -d front back'
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
