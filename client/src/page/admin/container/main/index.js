import React, { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import { SYSTEM_ERROR, COLOR_MESSAGE } from "../../config";
import { Filter } from "../../component/filter";
import { MessageList } from "../../component/messageList";
import { Modal } from "../../component/modal";
import "./index.scss";

function getFilterData(data) {
  const clientTypes = SYSTEM_ERROR.concat(data.map((t) => t.type));
  const list = Array.from(new Set(clientTypes));
  return list.map((type) => ({
    type,
    count:
      type === SYSTEM_ERROR[0]
        ? data.length
        : data.filter((d) => d.type === type).length,
    style: {
      color: COLOR_MESSAGE[type],
    },
  }));
}

export function Main(props) {
  const [showGuide, updateShowGuide] = useState(localStorage[channel] !== '1');
  const [logList, updateLogList] = useImmer([]);
  const [selectedType, updateSelectedType] = useState(SYSTEM_ERROR[0]);
  const filters = getFilterData(logList);
  let filteredLogList = logList;

  const onmessage = (data) => {
    updateLogList((draft) => {
      draft.push(data);
    });
  };

  const clearLogList = () => {
    updateLogList((draft) => {
      if (selectedType === SYSTEM_ERROR[0]) {
        return [];
      }

      draft.forEach((item, index) => {
        if (item.type === selectedType) {
          draft.splice(index, 1);
        }
      });
    });
  };

  useEffect(() => {
    localStorage[channel] = 1;
    props.socket.on("message", onmessage);
    return () => {
      props.socket.off("message", onmessage);
    };
  });

  // 过滤标签
  if (selectedType !== SYSTEM_ERROR[0]) {
    filteredLogList = logList.filter((t) => t.type === selectedType);
  }

  filteredLogList = filteredLogList.map((t) => ({
    ...t,
    type: SYSTEM_ERROR.includes(t.type) ? t.type.toUpperCase() : t.type,
    style: t.type in COLOR_MESSAGE ? { color: COLOR_MESSAGE[t.type] } : t.opt,
  }));

  return (
    <div className="main">
      <div className="actions">
        <button className="btn clearBtn" onClick={clearLogList}>
          清屏
        </button>
        <button
          className="btn howtouseBtn"
          onClick={() => updateShowGuide(true)}
        >
          如何使用
        </button>
        <Filter
          data={filters}
          onFilter={(type) => updateSelectedType(type)}
          selectedType={selectedType}
        />
      </div>
      <MessageList data={filteredLogList} timeFormat="MM月DD日 hh:mm:ss" />
      {showGuide ? (
        <Modal
          title="在你的网页中使用远程控制台"
          onClose={() => updateShowGuide(false)}
        >
          <span className="guideTitle">
            复制以下代码放入你的html页面的head标签内：
          </span>
          <textarea
            className="guideCode"
            readOnly
            defaultValue={`<script id="remoteConsole" src="${location.origin}/assets/remote-console.js" data-channel="${channel}"></script>`}
          />
        </Modal>
      ) : null}
    </div>
  );
}
