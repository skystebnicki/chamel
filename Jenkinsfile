node {
    def dockerImage;
    currentBuild.result = "SUCCESS"

    try {
        stage('Build') {
            checkout scm
            dockerImage = docker.build('chamel')
        }

        stage('Test') {
            /* Run tests inside the docker container */
            dockerImage.inside {
                withEnv([
                    /* Override the npm cache directory to avoid: EACCES: permission denied, mkdir '/.npm' */
                    'npm_config_cache=/tmp/npm/',
                    'NPM_TOKEN=ef16319c-fcec-42d2-abac-96e6abb71d6b'
                ]) {
                    sh 'npm install'
                    
                }   
            }
        }

        stage('Push to github') {
            git credentialsId: 'sky-github', url: 'https://github.com/skystebnicki/chamel'
            sh 'git push github'
        }

        stage('Publish') {
            /* Run tests inside the docker container */
            dockerImage.inside {
                withEnv([
                    /* Override the npm cache directory to avoid: EACCES: permission denied, mkdir '/.npm' */
                    'npm_config_cache=/tmp/npm/',
                    'NPM_TOKEN=ef16319c-fcec-42d2-abac-96e6abb71d6b'
                ]) {
                    sh 'npm run build'
                    if (env.BRANCH_NAME == 'master') {
                        sh 'npm publish'
                    } else {
                        sh 'npm publish --tag beta'
                    }
                }   
            }
        }

        stage('Cleanup') {
            echo 'prune and cleanup'
            sh 'docker system prune -f'

            mail body: 'project build successful: ${env.BUILD_URL}',
                from: 'builds@aereus.com',
                subject: 'project build successful',
                to: 'sky.stebnicki@aereus.com'
        }

    } catch (err) {
        currentBuild.result = "FAILURE"
        mail body: "project build error is here: ${env.BUILD_URL}" ,
        subject: 'project build failed',
        to: 'sky.stebnicki@aereus.com'
        throw err
    }
}