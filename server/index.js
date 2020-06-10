const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const config = require('./config');
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(config.CLIENT_SRC, 'views', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', data => {
    socket.broadcast.emit('chat message', data);
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});