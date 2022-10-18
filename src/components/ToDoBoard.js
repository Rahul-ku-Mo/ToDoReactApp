/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Card from "./Card/Card";
import Modal from "./Modal/Modal";
import User from "./shared/user";
import CardView from "./CardActions/cardView";
import AddCardView from "./CardActions/addCardView";
import { db } from "../Firebase";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import styles from "./ToDoBoard.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBars,
  faPlus,
  faX,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import ListView from "./ListView";

const ToDoBoard = () => {
  let listArray = [];
  const randColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()
    );
  };

  const [add, setAdd] = useState(false);
  const [del, setDel] = useState(false);
  const [upd, setUpd] = useState(false);

  const [showListInput, setShowListInput] = useState("none");
  const [hideListInput, setHideListInput] = useState("inline-block");

  const [list, setList] = useState("");
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [color, setColor] = useState(randColor());

  const [lists, setLists] = useState([]);

  //1.add SwimLanes to the database and
  const addLists = async () => {
    try {
      const listDocRef = await addDoc(collection(db, "Lists"), {
        listName: list,
      });
      console.log(listDocRef);
      setAdd(!add);
    } catch (err) {
      console.log(err);
    }
  };

  const addTask = async (lid) => {
    try {
      const taskDocRef = await addDoc(collection(db, "Lists", lid, "Tasks"), {
        taskName: title,
        taskDes: des,
        taskColor: color,
      });
      console.log(taskDocRef);
      setAdd(!add);
    } catch (err) {
      console.log(err);
    }
  };
  //2.get Database
  const getTask = async (lid, taskArray = [], setTaskList) => {
    const querySnapshot = await getDocs(collection(db, "Lists", lid, "Tasks"));

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      taskArray.push({ ...doc.data(), taskId: doc.id });
    });

    setTaskList(taskArray);
  };

  const getLists = async () => {
    const querySnapshot = await getDocs(collection(db, "Lists"));

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      listArray.push({ ...doc.data(), listId: doc.id });
    });

    setLists(listArray);
  };

  const deleteList = async (lid) => {
    try {
      const trash = await deleteDoc(doc(db, "Lists", lid));
      setDel(!del);
      console.log(trash);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getLists();
  }, [add, upd, del]);

  return (
    <div className={styles.board}>
      {lists.map((eachList) => {
        return (
          <div className={styles.boardGap}>
            <div className={`${styles.board_sec} ${styles.p}`}>
              {eachList.listName}{" "}
              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faXmarkCircle}
                onClick={() => {
                  deleteList(eachList.listId);
                }}
              />
            </div>
            <ListView
              getTask={getTask}
              add={add}
              del={del}
              setDel={setDel}
              upd={upd}
              lid={eachList.listId}
              setUpd={setUpd}
              addTask={addTask}
              setAdd={setAdd}
              setTitle={setTitle}
            />
          </div>
        );
      })}

      <div
        onClick={() => {
          setShowListInput("inline");
          setHideListInput("none");
        }}
        style={{ display: `${hideListInput}` }}
        className="ml-4 text-sm rounded-sm w-[272px] leading-8 px-3 bg-zinc-300 h-fit cursor-pointer hover:bg-slate-400 transition all 250ms ease-in-out"
      >
        <FontAwesomeIcon icon={faPlus} className="pr-2" />
        Add another List
      </div>
      <div
        className="ml-4 text-sm rounded-sm bg-slate-100 px-1 pt-1"
        style={{ display: `${showListInput}` }}
      >
        <input
          className={styles.listInput}
          type="text"
          onChange={(e) => setList(e.target.value)}
        />
        <div className="flex items-center gap-x-4">
          <div
            onClick={() => {
              addLists();
              setAdd(!add);
              setHideListInput("inline-block");
              setShowListInput("none");
            }}
            className={styles.actionBtn}
          >
            Add List
          </div>
          <FontAwesomeIcon
            className="cursor-pointer h-5"
            onClick={() => {
              setHideListInput("inline-block");
              setShowListInput("none");
            }}
            icon={faXmark}
          />
        </div>
      </div>
    </div>
  );
};

export default ToDoBoard;
