import React, { useState } from "react";
import styles from "./addCardView.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
const addCardView = ({ setTitle, setAdd, add, addTask,lid }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showCardInput, setShowCardInput] = useState("none");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [hideCardInput, setHideCardInput] = useState("inline-block");
  
  return (
    <>
      <div
        style={{ display: `${hideCardInput}` }}
        className="p-[6px] hover:bg-zinc-300 w-full transition-all 250ms ease-in-out text-slate-800 cursor-pointer"
        onClick={() => {
          setShowCardInput("inline-block");
          setHideCardInput("none");
        }}
      >
        <FontAwesomeIcon className="pr-1 cursor-pointer " icon={faPlus} />
        Add a card
      </div>
      <div
        className=" text-sm rounded-sm bg-slate-100 px-1 pt-1"
        style={{ display: `${showCardInput}` }}
      >
        <textarea
          placeholder="Enter a title for this card..."
          className={styles.cardInput}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className=" flex items-center gap-x-4">
          <div
            onClick={() => {
              addTask(lid);
              setAdd(!add);
              setHideCardInput("inline-block");
              setShowCardInput("none");
            }}
            className={styles.actionBtn}
          >
            Add card
          </div>
          <FontAwesomeIcon
            className="cursor-pointer h-5"
            onClick={() => {
              setHideCardInput("inline-block");
              setShowCardInput("none");
            }}
            icon={faXmark}
          />
        </div>
      </div>
    </>
  );
};

export default addCardView;
