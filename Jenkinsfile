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
                sh '''${scannerHome}/bin/sonar-scanner 
                mvn sonar:sonar \
                -Dsonar.projectKey=crudproject \
                -Dsonar.host.url=http://44.212.16.212 \
                -Dsonar.login=f53a2a0e630c68af3ee0f8bf4cb2372f54aaf2f5'''
            }
        }
       }
    }
}
