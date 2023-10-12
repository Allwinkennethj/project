pipeline{
    agent any
    tools{
        maven "MAVEN3"
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
    }
}
