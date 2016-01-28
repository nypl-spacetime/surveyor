var path = require('path');
var webpack = require('webpack');
var config = require('config');

module.exports = {
  devtool: 'source-map',
  entry: [
    'normalize-css',
    './app/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __CONFIG__: JSON.stringify(config),
      '__DEV__': false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'app'),
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    }, {
      test: /\.ttf$/,
      loader: 'file-loader',
    }, {
      test: /\.(svg|png|jpg)$/,
      loader: 'file-loader',
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }],
  },
};
