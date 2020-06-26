import io from 'socket.io-client/dist/socket.io.dev';
import axios from 'axios';
import parse from 'url-parse';
import { updateSocket } from './remote-console';


const remoteConsole = document.getElementById('remoteConsole');
const url = parse(remoteConsole.src);
const channel = remoteConsole.getAttribute('data-channel');

axios.get(`${url.origin}/socket/channel/${channel}`).then(r => {

  const socket = io.connect(`${url.origin}/${channel}`);
  updateSocket(socket);
})
