pipeline {
    agent any
    tools {
        maven "MAVEN35"
        jdk "OracleJDK17"
    }
    stages {
        stage('Fetch Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Allwinkennethj/project.git'
            }
        }
        stage('Build') {
            steps {
                sh 'mvn clean install'
            }
            post {
                success {
                    echo 'Archiving artifacts now'
                    archiveArtifacts artifacts: '**/*.jar';
                }
            }
        }
        stage('Unit Tests') {
            steps {
                sh 'mvn test'
            }
        }
        stage('Checkstyle Analysis') {
            steps {
                sh 'mvn checkstyle:checkstyle'
            }
        }
        stage('SonarQube Analysis') {
            environment {
                SONAR_PROJECT_KEY = 'crudproject'
                SONAR_HOST_URL = 'http://44.212.16.212'
                SONAR_LOGIN = '3ce4f49c643fcf9992f491a0d5c73881a1fe488f'
            }
            steps {
                scannerHome = tool 'sonarserver'
                withSonarQubeEnv('sonar') {
                    sh """
                    \${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=\${SONAR_PROJECT_KEY} \
                        -Dsonar.host.url=\${SONAR_HOST_URL} \
                        -Dsonar.login=\${SONAR_LOGIN}
                    """
                }
            }
        }
    }
}
