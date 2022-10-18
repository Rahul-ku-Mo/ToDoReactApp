import React, { useState } from "react";
import "./card.css";
import { db } from "../../Firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import CardView from "../CardActions/cardView";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faPaperclip,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Select from "../shared/Button/Select/Select";

const Card = ({
  title = "Card 😅",
  status_color = "brown",
  des,
  del,
  setDel,
  tid,
  lid,
  update,
  stateUpdate,
  addTask,
  setTitle,
}) => {
  const [taskDes, setTaskDes] = useState(des);
  const [color, setColor] = useState(status_color);
  const [show, setShow] = useState(false);

  const updateTaskDes = async () => {
    const docRef = doc(db, "Lists", lid, "Tasks", tid);

    await updateDoc(docRef, {
      taskDes: taskDes,
    });
  };

  const updateTaskColors = async (color, lid, tid) => {
    const docRef = doc(db, "Lists", lid, "Tasks", tid);

    await updateDoc(docRef, {
      taskColor: color,
    });

    console.log(color, lid, tid, "success");
  };

  const deleteTask = async (lid, tid) => {
    try {
      const trash = await deleteDoc(doc(db, "Lists", lid, "Tasks", tid));

      console.log(trash);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <CardView
        setShow={setShow}
        addTask={addTask}
        show={show}
        setDes={setTaskDes}
        setTitle={setTitle}
        taskName={title}
        color={status_color}
        updateTaskDes={updateTaskDes}
        listId={lid}
        taskId={tid}
        update={update}
        stateUpdate={stateUpdate}
      />

      <div
        onClick={() => {
          setShow(true);
        }}
        className="card--custom-bg cursor-pointer"
        style={{ backgroundColor: `${status_color}` }}
      ></div>
      <div className="card-name cursor-pointer">{title}</div>
      <div className="flex items-center justify-between">
        <div className="custom--padding text-sm">{des}</div>
        <FontAwesomeIcon
          icon={faTrash}
          className="m-1 cursor-pointer"
          onClick={() => {
            deleteTask(lid, tid);
            setDel(!del);
          }}
        />
      </div>
      <div className="custom--padding flex gap-4 items-center justify-between">
        <div className="flex gap-2">
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => setShow(true)}
            icon={faBarsStaggered}
          />
          <div className="text-sm">
            <FontAwesomeIcon icon={faPaperclip} /> 2
          </div>
        </div>
        <Select
          selectColor={setColor}
          updateTaskColors={updateTaskColors}
          listId={lid}
          taskId={tid}
          update={update}
          color={color}
          stateUpdate={stateUpdate}
        />
      </div>
    </div>
  );
};

export default Card;
