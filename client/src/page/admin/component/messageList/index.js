import React from "react";
import ReactJson from "react-json-view";
import moment from "moment";
import ReactTooltip from 'react-tooltip';
import "./index.scss";

function renderMessage(data) {
  return Array.isArray(data) ? (
    data.map((item) => renderMessage(item))
  ) : typeof data === "object" ? (
    <ReactJson
      src={data}
      theme="monokai"
      collapsed={true}
      indentWidth={2}
      style={{ display: "inline-block" }}
      key={data}
    />
  ) : (
    data
  );
}

export function MessageList(props) {
  const { data, timeFormat } = props;
  return (
    <section className="messageList">
      <ReactTooltip />
      {data.map((item) => (
        <div
          className="messageItem"
          key={`${item.timestamp}-${item.type}`}
          style={item.style}
          data-tip={item.stack}
        >
          <span className="messageTime">
            {moment(item.timestamp).format(timeFormat)}
          </span>
          <span className="messageType">[{item.type}]</span>
          <span className="messageData">{renderMessage(item.data)}</span>
        </div>
      ))}
    </section>
  );
}
