const express = require('express');
const app = express();
const http = require('http').createServer(app);
const config = require('./config');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config');
const webpack = require('webpack');
const io = require('socket.io')(http);
const fs = require('fs');
const cors = require('cors');
let compiler = webpack(webpackConfig);
const ioPools = {};

app.use(cors());

app.get('/channel/:channel', (req, res) => {
  const template = fs.readFileSync(path.join(config.CLIENT_SRC, 'views', 'index.html')).toString();
  res.send(template.replace(/var\schannel\s*=\s*'default'/, `var channel='${req.params.channel}'`));
});

app.get('/:filename', (req, res) => {
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
if (process.env.NODE_ENV === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }));
} else {
  app.use('/assets', express.static(path.join(config.CLIENT_SRC, 'assets')));
}

http.listen(6688, () => {
  console.log('listening on *:6688');
});