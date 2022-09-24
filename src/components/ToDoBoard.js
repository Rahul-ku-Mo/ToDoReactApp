/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Card from "./Card/Card";
import Modal from "./Modal/Modal";

import { db } from "../Firebase";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import styles from "./ToDoBoard.module.css";
import AddCard from "./shared/add.webp";
import { useEffect } from "react";

const ToDoBoard = () => {
  let dataCard = [];
  
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const [del, setDel] = useState(false);
  const [upd, setUpd] = useState(false);

  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [color, setColor] = useState("#000000");
  const [status, setStatus] = useState("");
  const [TaskList, setTaskList] = useState([]);

  const [progressList, setProgressList] = useState([]);
  const [completeList, setCompleteList] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  //1.add to the database and
  const addTask = async () => {
    try {
      const docRef = await addDoc(collection(db, "Tasks"), {
        title: title,
        des: des,
        color: color,
        status: status,
      });
      console.log(docRef);
      setAdd(!add);
    } catch (err) {
      console.log(err);
    }
  };

  //2.get Database
  const getTask = async () => {
    const querySnapshot = await getDocs(collection(db, "Tasks"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      dataCard.push({ ...doc.data(), taskId: doc.id });
    });

    setTaskList(dataCard.filter((task) => task.status === ""));

    setProgressList(dataCard.filter((list) => list.status === "Progress"));
    setReviewList(dataCard.filter((list) => list.status === "Review"));
    setCompleteList(dataCard.filter((list) => list.status === "Completed"));
  };

  const deleteTask = async (id) => {
    try {
      const trash = await deleteDoc(doc(db, "Tasks", id));
      setDel(!del);
      console.log(trash);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTask();
  }, [add, del, upd]);
  return (
    <div className={styles.board}>
      <Modal
        title="Add to My Day"
        onClose={() => setShow(false)}
        onAddTasks={() => addTask()}
        show={show}
        taskaction={"Add Task"}
      >
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Desciption"
          onChange={(e) => setDes(e.target.value)}
        />
        <div className="card-interaction">
          <div
            className="status-bar"
            style={{
              position: "relative",
              display: "flex",
              gap: "20px",
            }}
          >
            <div
              style={{ backgroundColor: "#df7c47" }}
              className="status"
              onClick={(e) => {
                setStatus(e.target.innerHTML);
                setColor(e.target.style.backgroundColor);
              }}
            >
              Progress
            </div>
            <div
              style={{ backgroundColor: "#2196f3" }}
              className="status"
              onClick={(e) => {
                setStatus(e.target.innerHTML);
                setColor(e.target.style.backgroundColor);
              }}
            >
              Review
            </div>
            <div
              style={{ backgroundColor: "#47df47" }}
              className="status"
              onClick={(e) => {
                setStatus(e.target.innerHTML);
                setColor(e.target.style.backgroundColor);
              }}
            >
              Completed
            </div>
          </div>
        </div>
      </Modal>
      <div className={styles.boardGap}>
        <div className={`${styles.board_sec} ${styles.t}`}>
          To Do{" "}
          <img
            onClick={() => setShow(true)}
            style={{
              width: "35px",
              cursor: "pointer",
            }}
            src={AddCard}
            alt=""
          />
        </div>
        <div>
          {TaskList.map((card) => {
            return (
              <Card
                key={card.taskId}
                id={card.taskId}
                title={card.title}
                des={card.des}
                status_color={card.color}
                trashTask={deleteTask}
                status={card.status}
                update={setUpd}
                stateUpdate={upd}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.boardGap}>
        <div className={`${styles.board_sec} ${styles.p}`}>In Progress </div>
        <div>
          {progressList.map((card) => {
            return (
              <Card
                key={card.taskId}
                id={card.taskId}
                title={card.title}
                des={card.des}
                status_color={card.color}
                trashTask={deleteTask}
                status={card.status}
                update={setUpd}
                stateUpdate={upd}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.boardGap}>
        <div className={`${styles.board_sec} ${styles.r}`}>Review </div>
        <div>
          {reviewList.map((card) => {
            return (
              <Card
                key={card.taskId}
                id={card.taskId}
                title={card.title}
                des={card.des}
                status_color={card.color}
                trashTask={deleteTask}
                status={card.status}
                update={setUpd}
                stateUpdate={upd}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.boardGap}>
        <div className={`${styles.board_sec} ${styles.c}`}>Completed </div>
        <div>
          {completeList.map((card) => {
            return (
              <Card
                key={card.taskId}
                id={card.taskId}
                title={card.title}
                des={card.des}
                status_color={card.color}
                trashTask={deleteTask}
                status={card.status}
                update={setUpd}
                stateUpdate={upd}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToDoBoard;
