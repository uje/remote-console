import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './main';
import io from 'socket.io-client/dist/socket.io.dev';
import axios from 'axios';

axios.get(`/socket/channel/${channel}`).then(r => {
  const socket = io.connect('/' + channel);
  ReactDOM.render(<Main socket={socket} />, document.querySelector('#app'));
});
