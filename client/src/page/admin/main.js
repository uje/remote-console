import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useImmer } from 'use-immer';
import ReactJson from 'react-json-view';
import classnames from 'classnames';
import moment from 'moment';
import './main.scss';

const CLS_MESSAGE = {
  'console.log': 'messageLog',
  'console.warn': 'messageWarn',
  'console.info': 'messageInfo',
  'console.error': 'messageError'
};

function renderMessage(data) {
  return Array.isArray(data) ?
    data.map(item => renderMessage(item)) :
    typeof data === 'object' ?
      <ReactJson src={data} theme="monokai" collapsed={true} indentWidth={2} style={{ display: 'inline-block' }} /> :
      data;
}

export function Main(props) {
  const [logList, updateLogList] = useImmer([]);
  const onmessage = data => {
    if (/console/.test(data.type)) {
      updateLogList(draft => {
        draft.push(data);
      });
    }
  };

  useEffect(() => {
    props.socket.on('message', onmessage);
    return () => {
      props.socket.off('message', onmessage);
    }
  });


  return (
    <div className="main">
      {logList.map(item =>
        <div className={classnames('messageItem', CLS_MESSAGE[item.type])} key={`${item.timestamp}-${item.type}`}>
          <span className="messageTime">{moment(item.timestamp).format('MM月DD日 hh:mm:ss')}</span>
          <span className="messageType">[{item.type.replace('console.', '').toUpperCase()}]</span>
          <span className="messageData">{
            renderMessage(item.data)
          }</span>
        </div>
      )}
    </div>
  )
}
