node {
    def dockerImage;
    currentBuild.result = "SUCCESS"
    def CURRENT_BRANCH = env.BRANCH_NAME;

    try {
        stage('Build') {
            deleteDir()
            def scmVars = checkout scm

            // If not set by the job then get the local branch name
            if (!CURRENT_BRANCH) {
                CURRENT_BRANCH = scmVars.GIT_BRANCH;
            }

            // Create a version bump for publishing
            sh('git checkout -b build')
            sh('npm version patch')

            dockerImage = docker.build('chamel', '--no-cache .')

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

        stage('Push to github') {
            withCredentials([usernamePassword(credentialsId: 'sky-github', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/skystebnicki/chamel HEAD:${env.BRANCH_NAME}"
            }
        }

        stage('Publish') {
            /* Publish in docker container */
            dockerImage.inside {
                withEnv([ 'HOME=/tmp' ]) {
                    withCredentials([string(credentialsId: 'npmjsauth', variable: 'NPM_TOKEN', usernameVariable: 'NPM_USERNAME')]) {
                        sh "echo //registry.npmjs.org/:_authToken=${NPM_TOKEN} >> ~/.npmrc"

                        if (CURRENT_BRANCH == 'master') {
                          sh 'npm publish'
                        } else {
                          sh 'npm publish --tag next'
                        }
                    }
                }
            }

            /* If in CI branch (develop) then updated version */
           if (CURRENT_BRANCH == 'develop') {
               sshagent (credentials: ['9862b4cf-a692-43c5-9614-9d93114f93a7']) {
                   sh("git push origin HEAD:develop")
               }
           }
        }

        stage('Cleanup') {
            echo 'prune and cleanup'
            sh 'docker system prune -a'
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
