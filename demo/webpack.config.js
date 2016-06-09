const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: "./app/main.js",
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'chamel-demo.js',
        publicPath: '/build/'
    },
    resolve: {
        extensions: ['', '.scss', '.js', '.jsx'],
        packageMains: ['browser', 'web', 'browserify', 'main', 'style']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules)/
            },
            {
                test: /\.jsx$/,
                loader: 'babel',
                exclude: /(node_modules)/
            },
            {
                test: /\.scss/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
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

}

