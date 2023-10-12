pipeline{
    agent any
    // environment{

    // }
    tools{
        maven "MAVEN35"
        jdk "OracleJDK17"
    }
    stages{
       stage('Fetch Code'){
        steps{
            git branch: 'main',url:'https://github.com/Allwinkennethj/project.git'
        }
       } 
       stage('Build'){
        steps{
            sh 'mvn clean install'
        }
        post{
            success{
                echo 'Archiving artifacts now'
                archiveArtifacts artifacts: '**/*.jar';
            }
        }
       }
       stage('Unit Tests'){
        steps{
            sh 'mvn test'
        }
       }
       stage('Checkstyle Analysis'){
        steps{
            sh 'mvn checkstyle:checkstyle'
        }
       }
       stage('Sonar Analysis'){
        environment{
            scannerHome=tool 'sonar4.7'
        }
        steps{
            withSonarQubeEnv('sonar'){
                sh '''${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=vprofile \
                    -Dsonar.sourses=src/ \
                    -Dsonar.junit.reportsPath=target/surefire-reports/ \
                    -Dsonar.java.checkstyle.reportPaths=target/checkstyle-result.xml'''
            }
        }
       }
    }
}
