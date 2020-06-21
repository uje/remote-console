const express = require('express');
const app = express();
const http = require('http').createServer(app);
const config = require('./config');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config');
const webpack = require('webpack');
const { getChannel } = require('./socket')(http);
let compiler = webpack(webpackConfig);


app.get('/', (req, res) => {
  res.sendFile(path.join(config.CLIENT_SRC, 'views', 'index.html'));
});

app.get('/socket/channel/:channel', (req, res) => {
  getChannel(req.params.channel).on('connection', (socket) => {
    console.log('a user connected');
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