const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: "./app/main.js",
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'chamel-demo.js',
        publicPath: '/build/'
    },
    resolve: {
        extensions: ['', '.scss', '.js', '.jsx'],
        packageMains: ['browser', 'web', 'main', 'style'],
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
              test: /\.(js|jsx)$/,
              loader: 'babel',
              exclude: /(node_modules)/
            },
            {
                test: /\.(scss|css)$/,
                //loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[path][name]---[local]---[hash:base64:5]!postcss!sass?sourceMap')
                loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[path][name]---[local]---[hash:base64:5]&sourceMap&importLoaders=1&!sass?sourceMap')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('docs.css', { allChunks: true })
    ]
};
