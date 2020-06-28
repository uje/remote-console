const messageList = [];
const oldConsole = window.console;
let innerSocket = null;

function createSendMsg(type, opt) {
  return function (...data) {
    let error = null;
    try {
      throw new Error();
    } catch (e) {
      error = e;
    }

    const messageItem = {
      type,
      timestamp: Date.now(),
      stack: error.stack?.replace(/Error/, '').replace(/^\n+/, ''),
      ua: navigator.userAgent,
      data,
      opt
    };

    if (innerSocket && innerSocket.connected) {
      innerSocket.emit('message', messageItem);
    } else {
      messageList.push(messageItem);
    }

    const typeExec = /console\.(\w+)/.exec(type);
    if (typeExec && typeExec.length > 1) {
      oldConsole[typeExec[1]](...data);
    }
  }
}

export const updateSocket = socket => {
  innerSocket = socket;

  // 连接后发送消息
  socket.on('connect', () => {
    while (messageList.length > 0) {
      socket.emit('message', messageList.shift());
    }
  });
}

// 重写调试方法
window.console = {
  log: createSendMsg('console.log'),
  info: createSendMsg('console.info'),
  debug: createSendMsg('console.debug'),
  warn: createSendMsg('console.warn'),
  error: createSendMsg('console.error')
};

const onErrorReport = createSendMsg('window onerror');
window.addEventListener('error', e => {
  onErrorReport({
    message: e.message,
    lineno: e.lineno,
  });
});

const unhandledrejectionReport = createSendMsg('unhandledrejection');
window.addEventListener('unhandledrejection', e => {
  unhandledrejectionReport({
    message: `${e.message}: ${e.reason}`
  });
});

const cacheReporters = {};
export const reportCustomMessage = window.reportCustomMessage = (type, msg, opt) => {
  let reporter = cacheReporters[type];

  if (!reporter) {
    reporter = cacheReporters[type] = createSendMsg(type, opt);
  }

  reporter(msg);
};