const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        packageMains: ['browser', 'web', 'browserify', 'main', 'style'],
        alias: {
          'chamel': path.resolve(__dirname + './../src')
        },
        modulesDirectories: [
          'node_modules',
          path.resolve(__dirname, './node_modules'),
          path.resolve(__dirname, './../node_modules'),
          path.resolve(__dirname, './../src')
        ]
    },
    module: {
        loaders: [
            {
              test: /\.js$/,
              loader: 'babel',
              exclude: /(node_modules)/
            },
            {
                test: /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap')
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
    sassLoader: {
        data: '@import "' + path.resolve(__dirname, './../sass/theme/material/material.scss') + '";'
    },
    plugins: [
        new ExtractTextPlugin('docs.css', { allChunks: true })
    ]
};