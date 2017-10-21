node {
    def dockerImage;
    currentBuild.result = "SUCCESS"

    try {
        stage('Build') {
            deleteDir()
            checkout scm
            dockerImage = docker.build('chamel')

            dockerImage.inside {
                /* Override the npm cache directory to avoid: EACCES: permission denied, mkdir '/.npm' */
                withEnv([ 'HOME=/tmp' ]) {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            /* Run tests inside the docker container */
            dockerImage.inside {
                withEnv([ 'HOME=/tmp' ]) {
                    sh 'npm run test-single-run'
                    junit 'test/reports/junit.xml'
                }
            }
        }

        stage('Bump Verison and Push') {
            if (env.BRANCH_NAME == 'develop') {
                dockerImage.inside {
                    withEnv([ 'HOME=/tmp' ]) {
                        sh 'npm version patch'
                    }
                }
                sh 'git push'
            }
        }

        stage('Push to github') {
            withCredentials([usernamePassword(credentialsId: 'sky-github', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/skystebnicki/chamel HEAD:${env.BRANCH_NAME}"
            }
        }

        stage('Publish') {
            /* Publish in docker container */
            dockerImage.inside {
                withEnv([ 'HOME=/tmp' ]) {
                    if (env.BRANCH_NAME == 'master') {
                        withCredentials([string(credentialsId: 'npmjsauth', variable: 'NPM_TOKEN', usernameVariable: 'NPM_USERNAME')]) {
                            sh "echo //registry.npmjs.org/:_authToken=${NPM_TOKEN} >> ~/.npmrc"
                            sh 'npm publish'
                        }
                    }
                }
            }
        }

        stage('Cleanup') {
            echo 'prune and cleanup'
            sh 'docker system prune -a'

            mail body: "project build successful: ${env.BUILD_URL}",
                from: 'builds@aereus.com',
                subject: 'project build successful',
                to: 'sky.stebnicki@aereus.com'
        }

    } catch (err) {
        deleteDir()
        currentBuild.result = "FAILURE"
        mail body: "project build error is here: ${env.BUILD_URL}" ,
        subject: 'project build failed',
        to: 'sky.stebnicki@aereus.com'
        throw err
    }
}
