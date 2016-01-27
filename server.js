var path = require('path');
var express = require('express');
var webpack = require('webpack');

var __DEV__ = process.env.NODE_ENV === 'development';

var app = express();

if (__DEV__) {
  var webpackConfig = require('./webpack.config.dev');
  var compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static(path.join(__dirname, __DEV__ ? 'app' : 'dist')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, __DEV__ ? 'app' : 'dist', 'index.html'), null, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
  });
});

// TODO: use node-config, and read port from config file!
var port = 3001;
app.listen(port, '0.0.0.0', function (err) {
  if (err) {
    console.error(err);
    return;
  }
  console.info('==> 🌍  Listening on port ' + port + '. Open http://0.0.0.0:' + port + ' in your browser');
});
