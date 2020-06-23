const messageList = [];
const oldConsole = window.console;
let innerSocket = null;

function createSendMsg(type) {
  return function (...data) {
    const messageItem = {
      type,
      timestamp: Date.now(),
      data
    };

    if (innerSocket && innerSocket.connected) {
      innerSocket.emit('message', messageItem);
    } else {
      messageList.push(messageItem);
    }

    oldConsole[type](...data);
  }
}

// 重写调试方法
window.console = {
  log: createSendMsg('log'),
  info: createSendMsg('info'),
  debug: createSendMsg('debug'),
  warn: createSendMsg('warn')
};

export const updateSocket = socket => {
  innerSocket = socket;

  // 连接后发送消息
  socket.on('connect', () => {
    while (messageList.length > 0) {
      socket.emit('message', messageItem.shift());
    }
  });
}