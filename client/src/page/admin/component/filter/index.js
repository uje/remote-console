import React from "react";
import classnames from "classnames";
import './index.scss';

export function Filter(props) {
  const {
    data,
    selectedType,
    onFilter,
    selectedClassName = "filterBtnSelected",
  } = props;
  return (
    <div className="filters">
      <span className="filterLabel">过滤类型：</span>
      {data.map((f) => (
        <button
          className={classnames(
            props.className || "filterBtn",
            selectedType === f.type ? selectedClassName : ""
          )}
          type="button"
          onClick={() => onFilter?.(f.type)}
          style={f.style}
          key={f.type}
        >
          {f.type}({f.count})
        </button>
      ))}
    </div>
  );
}
