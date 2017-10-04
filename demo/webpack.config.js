const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname + './../'),
  entry: "./demo/app/main.js",
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'build/js/chamel-demo.js',
    publicPath: '/'
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
      { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      {
        test: /\.(scss)$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[path][name]-[local]-[hash:base64:5]&sourceMap&importLoaders=1&!sass?sourceMap')
        //loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[local]&sourceMap&importLoaders=1&!sass?sourceMap')
      },
      {
        test: /\.(css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?localIdentName=[local]&sourceMap&importLoaders=1?sourceMap')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('docs.css', { allChunks: true }),
    new TransferWebpackPlugin([
      {
        from: 'fonts',
        to: 'fonts'
      }
    ])
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    watchOptions: { poll: true },
    publicPath: "/",
    stats: { colors: true }
  }
};
