import io from 'socket.io-client/dist/socket.io.dev';
import axios from 'axios';


const remoteConsole = document.getElementById('remoteConsole');
const channel = remoteConsole.getAttribute('data-channel');


axios.get(`/socket/channel/${channel}`).then(r => {

  const socket = io.connect('/' + channel);
  socket.on('message', (msg) => {
    console.log('message: ' + msg);
  });


  setTimeout(() => {
    console.log('emit message test')
    socket.emit('message', 'test');
  }, 1000);
})
