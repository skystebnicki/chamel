module.exports = function(grunt) {
    grunt.initConfig({
        // Used to build
        distFolder: 'dist',
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Browserfly packs all scripts following require statements into
         * a single file to be served through the browser.
         * */
        browserify: {
            options: {
                debug: true,
                transform: [
                    ['babelify', {loose: "all", nonStandard: true}]
                ],
                extensions: ['.jsx'],
                browserifyOptions : {
                    standalone: 'chamel'
                }
            },
            dev: {
                options: {
                  //alias: ['react:']  // Make React available externally for dev tools
                },
                //cwd: 'js',
                src: ['demo/app/main.js'],
                dest: 'build/js/chamel-demo.js'
            },
            dist: {
                options: {
                  debug: false
                },
                //cwd: 'js',
                //src: ['**/*.jsx'],
                src: ['src/main.js'],
                dest: 'dist/js/chamel.js'
            }
        },
        
        /**
         * Settings for watch which basically monitors files for
         * changes and then runs tasks if changes were detected.
         */
        watch: {
            // sass files obviously have to be compiled before rendering the page
            sass: {
                files: [
                    'sass/**/*.{scss,sass}',
                    'sass/_partials/**/*.{scss,sass}'
                ],
                tasks: ['sass:dev']
            },
            
            // Build browserfly bundle
            browserify: {
                files: ['src/**/*.js', 'src/**/*.jsx', 'demo/**/*.js', 'demo/**/*.jsx'],
                tasks: ['browserify:dev']
            },

            // Render jsx filse into js files
            // react: {
            //     files: ['js/ui/**/*.jsx'],
            //     tasks: ['react', 'browserify']
            // },
            
            // Reload the browser if any of these files change
            livereload: {
                files: [
                    '*.html',
                    'css/*.css',
                    'src/**/*.js',
                    'src/**/*.jsx',
                    'demo/**/*.js',
                    'demo/**/*.jsx',
                    'img/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                options: {
                    livereload: true
                }
            }
        },
        
        /**
         * Compile sass into CSS
         */
        sass: {
            options: {
                includePaths: [
                    'sass'
                ]
            },
            dev: {
                options: {
                    outputStyle: 'expanded',
                    sourceComments: 'map'
                },
                files: {
                    'build/css/chamel-base.css': 'sass/theme/base/base.scss',
                    'build/css/chamel-human.css': 'sass/theme/human/human.scss',
                    'build/css/chamel-material.css': 'sass/theme/material/material.scss',
                    'build/css/chamel-modern.css': 'sass/theme/modern/modern.scss',
                    'build/css/font-awesome.css': 'sass/font-awesome/font-awesome.scss'
                }
            },
            dist: {
                options: {
                    outputStyle: 'compact'
                },
                files: {
                    'dist/css/chamel-base.css': 'sass/theme/base/base.scss',
                    'dist/css/chamel-human.css': 'sass/theme/human/human.scss',
                    'dist/css/chamel-material.css': 'sass/theme/material/material.scss',
                    'dist/css/chamel-modern.css': 'sass/theme/modern/modern.scss',
                    'dist/css/font-awesome.css': 'sass/font-awesome/font-awesome.scss'
                }
            },
            distcmp: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'dist/css/chamel-base.cmp.css': 'sass/theme/base/base.scss',
                    'dist/css/chamel-human.cmp.css': 'sass/theme/human/human.scss',
                    'dist/css/chamel-material.cmp.css': 'sass/theme/material/material.scss',
                    'dist/css/chamel-modern.cmp.css': 'sass/theme/modern/modern.scss',
                    'dist/css/font-awesome.css': 'sass/font-awesome/font-awesome.scss'
                }
            }
        },

        /*
         * Compile react jsx files into normal js files
         */
        react: {
            files: {
                expand: true,
                cwd: 'src/ui',
                src: ['**/*.jsx'],
                dest: 'build/js/ui',
                ext: '.js'
            }
        },
        
        /*
         * Task settings to copy published files to the dist directory
         */
        copy: {
            dist: {
                files: [
                    // Copy images
                    {expand: true, cwd: '.', src: ['images/**'], dest: 'dist/'},

                    // Copy css
                    //{expand: true, cwd: '.', src: ['build/css/**'], dest: 'dist/'},

                    // Copy fonts
                    {expand: true, cwd: '.', src: ['fonts/**'], dest: 'dist/'},
                ]
            },
            build: {
                files: [
                    // Copy all js to build dir so we can merge with jsx
                    {expand: true, cwd: '.', src: ['src/**'], dest: 'build/'},
                    // Copy fonts
                    {expand: true, cwd: '.', src: ['fonts/**'], dest: 'dist/'},
                ]
            }
        },

        clean: {
            dist: {
                src: ["dist"]
            }
        }

    });

    /*
     * Load up tasks
     */
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-react');

    /*
     * Now register callable tasks
     */
    
    // Build all artifacts for distribution and ptu in ./dist
    grunt.registerTask('build', ['clean:dist', 'sass:dist', 'sass:distcmp', 'browserify:dist', 'copy:dist']);
    
    // Default will build sass, update js and then sit and watch for changes
    grunt.registerTask('default', ['sass:dev', 'browserify:dev', 'watch']);

    // We are utilizing browserify for react components
    grunt.loadNpmTasks('grunt-browserify');

    // Clean out dist directory before building
    grunt.loadNpmTasks('grunt-contrib-clean');
};
