import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBookBible, faXmark } from "@fortawesome/free-solid-svg-icons";
import NavbarButton from "../shared/Button/Button";
import "./modal.css";


const Modal = (props) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  });

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header" style={{ backgroundColor: `${props.color}`}}>
            <div
              className="modal-close-btn rounded-full"
              onClick={props.onClose}
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
            <div className="absolute top-[118px] right-[12px]">
              <NavbarButton icon={faBookBible} btnInput={"Cover"} />
            </div>
          </div>
          <div className="modal-bg-content">{props.title}</div>
          <div className="modal-body">{props.children}</div>
          {/* <div className="modal-footer">
            <button
              onClick={() => {
                props.onAddTasks();
                props.onClose();
              }}
              className="button"
            >
              {props.taskaction}
            </button>
          </div> */}
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
