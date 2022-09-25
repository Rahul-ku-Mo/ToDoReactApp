import React, { useState } from "react";
import "./card.css";
import { db } from "../../Firebase";
import { doc, updateDoc } from "firebase/firestore";
import Modal from "../Modal/Modal";
import settings from "./cog.webp";
import trash from "../shared/trash.webp";

const Card = ({ title, status_color, status, des, trashTask, id, update, stateUpdate }) => {
  const [taskDes, setTaskDes] = useState(des);
  const [isActive, setisActive] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskStatus, setTaskStatus] = useState(status);
  const [taskColor, setTaskColor] = useState(status_color);
  const [show, setShow] = useState(false);

  const updateTask = async () => {
    const docRef = doc(db, "Tasks", id);

    await updateDoc(docRef, {
      title: taskTitle,
      des: taskDes,
      color: taskColor,
      status: taskStatus,
    });
  };

  return (
    <div className="card">
      <button onClick={() => setShow(true)} style={{ width: "fit-content" , boxShadow: "1px 1px 4px rgba(0,0,0.1)"}}>Edit the Task</button>
      <Modal
        onAddTasks={() => {
          updateTask();
          update(!stateUpdate);
        }}
        title="Add to My Day"
        onClose={() => setShow(false)}
        show={show}
        taskaction={"Edit Task"}
      >
        <input
          type="text"
          placeholder={title}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <textarea
          type="text"
          placeholder={des}
          onChange={(e) => setTaskDes(e.target.value)}
        />
        <div className="card-interaction">
          <img
            style={{
              width: "35px",
              cursor: "pointer",
            }}
            src={settings}
            alt="settings"
            onClick={() => {
              setisActive(!isActive);
              console.log(isActive);
            }}
          />

          <div
            className="status-bar"
            style={{
              position: "relative",
              display: isActive ? "flex" : "none",
            }}
          >
            <div
              style={{ backgroundColor: "#df7c47" }}
              className="status"
              onClick={(e) => {
                setTaskStatus(e.target.innerHTML);
                setTaskColor(e.target.style.backgroundColor);
              }}
            >
              Progress
            </div>
            <div
              style={{ backgroundColor: "#2196f3" }}
              className="status"
              onClick={(e) => {
                setTaskStatus(e.target.innerHTML);
                setTaskColor(e.target.style.backgroundColor);
              }}
            >
              Review
            </div>
            <div
              style={{ backgroundColor: "#47df47" }}
              className="status"
              onClick={(e) => {
                setTaskStatus(e.target.innerHTML);
                setTaskColor(e.target.style.backgroundColor);
              }}
            >
              Completed
            </div>
          </div>
        </div>
      </Modal>
      <div
        className="status-color"
        style={{
          backgroundColor: status_color,
          width: "40px",
          height: "10px",
          borderRadius: "20px",
          margin: "10px 0px",
        }}
      ></div>
      <div className="card-name">{title}</div>
      <div className="card-description">{des}</div>
      <img
        style={{
          width: "35px",
          cursor: "pointer",
        }}
        src={trash}
        alt="trash"
        onClick={() => {
          trashTask(id);
        }}
      />
    </div>
  );
};

export default Card;
