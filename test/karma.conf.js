const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = function (config) {
  config.set({

    basePath: '../',

    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'test/unit/**/*.js',
    ],

    // add preprocessor to the files that should be preprocessed
    preprocessors: {
      'test/unit/*Spec.js': ['webpack', 'sourcemap'],
      'test/unit/**/*Spec.js': ['webpack', 'sourcemap']
    },

    // junit was causing the hot reload to fail over and over
    //reporters: ['progress', 'junit'],
    reporters: ['progress'],

    // see what is going on
    //logLevel: 'LOG_DEBUG',

    autoWatch: true,
    frameworks: ['jasmine'],

    // 'Chrome_Incog',
    browsers: ['PhantomJS'],

    // Set chrome to launch in incognito for clearning local storage
    customLaunchers: {
      // Use the debug below if we have any problems
      PhantomJS_Debug: {
        base: 'PhantomJS',
        debug: true
      }
    },

    plugins: [
      'karma-phantomjs-launcher',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-junit-reporter',
      'karma-jasmine'
    ],

    // karma watches the test entry points
    // (you don't need to specify the entry option)
    // webpack watches dependencies
    webpack: {
      context: path.resolve(__dirname, './../'),
      resolve: {
        extensions: ['', '.scss', '.js', '.jsx'],
        packageMains: ['browser', 'web', 'main', 'style', 'netric'],
        alias: {
          'chamel': path.resolve(__dirname, './../src')
        },
        modulesDirectories: [
          'node_modules',
          path.resolve(__dirname, './../node_modules')
        ]
      },
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: /(node_modules)/
          },
          {
            test: /\.(scss)$/,
            //loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap')
            //loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[local]&sourceMap&importLoaders=1&!sass?sourceMap')
            loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[path][name]-[local]-[hash:base64:5]&sourceMap&importLoaders=1&!sass?sourceMap')
          },
          {
            test: /\.(css)$/,
            loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[local]&sourceMap&importLoaders=1&!sass?sourceMap')
          },
          {
            test: /\.jsx$/,
            loader: 'babel',
            exclude: /(node_modules)/
          },
          {
            test: /\.ttf$|\.eot$/,
            loader: 'file',
            query: {
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      plugins: [
        new ExtractTextPlugin('css/chamel.css', {allChunks: true}),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('test')
          }
        })
      ],
      devtool: 'inline-source-map'
    },

    webpackMiddleware: {
      stats: {
        colors: true
      }
    },

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // Used in jenkins to report on tests
    junitReporter: {
      outputDir: 'test/reports',
      outputFile: 'unit.xml',
      suite: 'unit'
    },

  });
};
