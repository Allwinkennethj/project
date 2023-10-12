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
    }
    node {
        stage('SonarQube Analysis') {
            def scannerHome = tool 'sonarserver'
            withSonarQubeEnv('sonar') {
                sh """
                \${scannerHome}/bin/sonar-scanner \
                    -Dsonar.projectKey=crudproject \
                    -Dsonar.host.url=http://44.212.16.212 \
                    -Dsonar.login=3ce4f49c643fcf9992f491a0d5c73881a1fe488f
                """
            }
        }
    }
}
