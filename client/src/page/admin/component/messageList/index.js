import React, { useEffect } from "react";
import ReactJson from "react-json-view";
import moment from "moment";
import ReactTooltip from "react-tooltip";
import parser from "ua-parser-js";
import "./index.scss";

const toString = Object.prototype.toString;

function renderMessage(data, isChild) {
  const dataType = toString.call(data).slice(8, -1).toLowerCase();

  return Array.isArray(data) && !isChild ? (
    data.map((item) => renderMessage(item, true))
  ) : dataType === "object" ? (
    <ReactJson
      src={data}
      theme="monokai"
      collapsed={true}
      indentWidth={2}
      style={{ display: "inline-block" }}
      key={data}
    />
  ) : (
    JSON.stringify(data)
  );
}

export function MessageList(props) {
  const { data, timeFormat } = props;

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [data]);

  return (
    <section className="messageList">
      {data.map((item) => {
        const ua = parser(item.ua);
        const { browser, os, device, engine } = ua;

        return (
          <div
            className="messageItem"
            key={`${item.timestamp}-${item.type}`}
            style={item.style}
          >
            <span
              className="messageTime"
              data-tip={moment(item.timestamp).format("MM月DD日 hh:mm:ss")}
            >
              {moment(item.timestamp).format("hh:mm:ss")}
            </span>
            <span className="messageType" data-tip={item.type}>
              [{item.shortType}]
            </span>
            {device.type === "mobile" ? (
              <span
                className="messageOS"
                data-tip={`
                <div className="tipsLine">
                  设备信息：${device.vendor} ${device.model}
                </div>
                <div className="tipsLine">
                  浏览器信息：${browser.name} ${browser.major}
                </div>
                <div className="tipsLine">
                  内核信息：${engine.name} ${engine.version}
                </div>
              `}
                data-html={true}
              >
                {os.name} {os.version}
              </span>
            ) : null}
            {device.type !== "mobile" ? (
              <span
                className="messageBrowser"
                data-tip={`
                <div className="tipsLine">
                  系统信息：${os.name} ${os.version}
                </div>
                <div className="tipsLine">
                  内核信息：${engine.name} ${engine.version}
                </div>
              `}
                data-html={true}
              >
                {browser.name} {browser.major}
              </span>
            ) : null}
            <span className="messageData">{renderMessage(item.data)}</span>
          </div>
        );
      })}
      <ReactTooltip place="right" type="info" effect="float" html={true} />
    </section>
  );
}
