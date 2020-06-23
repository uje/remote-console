const express = require('express');
const app = express();
const http = require('http').createServer(app);
const config = require('./config');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config');
const webpack = require('webpack');
const io = require('socket.io')(http);
let compiler = webpack(webpackConfig);
const ioPools = {};


app.get('/:filename?', (req, res) => {
  res.sendFile(path.join(config.CLIENT_SRC, 'views', req.params.filename ?? 'index.html'));
});

app.get('/socket/channel/:channel', (req, res) => {
  if (ioPools[req.params.channel]) {
    res.send('ok');
    return;
  }

  ioPools[req.params.channel] = true;
  io.of(req.params.channel).on('connection', (socket) => {
    socket.on('message', data => {
      socket.broadcast.emit('message', data);
    });
  });

  res.send('ok');
});

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
}));

http.listen(3000, () => {
  console.log('listening on *:3000');
});