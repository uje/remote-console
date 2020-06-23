import io from 'socket.io-client/dist/socket.io.dev';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Main } from './main';


const remoteConsole = document.getElementById('remoteConsole');
const channel = remoteConsole.getAttribute('data-channel');


axios.get(`/socket/channel/${channel}`).then(r => {
  const socket = io.connect('/' + channel);
  socket.on('message', () => {
    
  })
})

ReactDOM.render(<Main />, '#main');