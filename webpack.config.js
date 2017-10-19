const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    demo: './demo/app/main.js',
  },
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/build',
    filename: 'js/chamel-demo.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.scss', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /(\.css|\.scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: function() {
                  return [require('autoprefixer')];
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /(\.js|\.jsx)$/,
        use: [{ loader: 'babel-loader' }],
        exclude: /(node_modules)/,
      },
      {
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        use: [{ loader: 'url' }],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('docs.css', { allChunks: true }),
    new TransferWebpackPlugin([
      {
        from: 'fonts',
        to: 'fonts',
      },
    ]),
  ],
  devServer: {
    inline: true,
    historyApiFallback: true,
    hot: true,
    publicPath: '/build/',
    disableHostCheck: true, // Without this local.aereusdev.com gets 'Invalid Host header'
    stats: { colors: true },
    watchOptions: { poll: true },
  },
};
