module.exports = function(config){
    config.set({

        basePath : '../',

        files : [
            'test/unit/**/*.js',
        ],

        // add preprocessor to the files that should be
        // processed via babelify for react jsx tranforms
        preprocessors: {
            'test/unit/**/*.js': [ 'browserify' ]
        },

        // see what is going on
        //logLevel: 'LOG_DEBUG',

        autoWatch : true,

        frameworks: ['browserify', 'jasmine'],

        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-browserify',
            'karma-jasmine'
        ],

        // add additional browserify configuration properties here
        // such as transform and/or debug=true to generate source maps
        browserify: {
            debug: true,
            es6: true,
            transform: [ ['babelify', {presets: ["es2015", "react"]}] ],
            configure: function(bundle) {
                bundle.on('prebundle', function() {
                    bundle.external('chamel');
                });
            }
        },

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
