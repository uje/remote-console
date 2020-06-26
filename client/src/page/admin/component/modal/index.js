import React from "react";
import "./index.scss";

export function Modal(props) {
  return (
    <>
      <div className="modalMask"></div>
      <div className="modal">
        {props.title ? <h3 className="modalTitle">{props.title}</h3> : null}
        <span className="modalClose" onClick={props.onClose}></span>
        {props.children}
      </div>
    </>
  );
}
