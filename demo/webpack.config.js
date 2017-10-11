const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {chamel: __dirname + "/app/main.js"},
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'build/js/chamel-demo.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.scss', '.js', '.jsx'],
    aliasFields: ['browser', 'web', 'main', 'style'],
    alias: {
      'chamel': path.resolve(__dirname, 'src'),
      'chamel/lib': path.resolve(__dirname, '/src')
    },
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../src')
    ]
  },
  module: {
    rules: [
      {
        test: /(\.css|\.scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: true,
                localIdentName: "[name]__[local]___[hash:base64:5]"
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                plugins: function () {
                  return [
                    require("autoprefixer")
                  ];
                }
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /(\.js|\.jsx)$/,
        use: [{loader: 'babel-loader'}],
        exclude: /(node_modules)/
      },
      {
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        use: [{loader: 'url'}],
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
