const messageList = [];
const oldConsole = window.console;
let innerSocket = null;

function createSendMsg(type) {
  return function (...data) {
    let error = null;
    try {
      throw new Error();
    } catch (e) {
      error = e;
    }

    const messageItem = {
      type: `console.${type}`,
      timestamp: Date.now(),
      stack: error.stack,
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
  warn: createSendMsg('warn'),
  error: createSendMsg('error')
};

export const updateSocket = socket => {
  innerSocket = socket;

  // 连接后发送消息
  socket.on('connect', () => {
    while (messageList.length > 0) {
      socket.emit('message', messageList.shift());
    }
  });
}