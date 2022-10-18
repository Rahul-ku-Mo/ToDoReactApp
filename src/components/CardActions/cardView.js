import React from "react";
import styles from "./addCardView.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../Modal/Modal";
import User from "../shared/user";
import {
  faBars,
  faBookBookmark,
  faPaperclip,
  faLaptopCode,
  faUser,
  faTag,
  faCheckToSlot,
  faClock,
  faPlus,
  faShare,
  faCopy,
  faMobile,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../shared/Button/Button";
import { faEye } from "@fortawesome/free-regular-svg-icons";

const CardView = ({
  setShow,
  addTask,
  show,
  setDes,
  setTitle,
  taskName,
  color,
  listId,
  taskId,
  updateTaskDes,
  update,
  stateUpdate,
}) => {
  return (
    <Modal
      title={taskName}
      onClose={() => setShow(false)}
      onAddTasks={() => addTask()}
      show={show}
      color={color}
    >
      <div className="text-base mb-10 ">
        <FontAwesomeIcon className="px-2" icon={faBookBookmark} /> {taskName}
        <div className="text-xs text-slate-400 pl-9">in the list</div>
      </div>

      <div className="float-left m-0  relative w-[447px]">
        <div className="text-base mb-10">
          <FontAwesomeIcon className="px-2" icon={faBars} /> Description
          <textarea
            className="ml-[2.1rem] text-xs"
            type="text"
            placeholder="Add a more detailed desciption..."
            onChange={(e) => setDes(e.target.value)}
          />
          <div className="flex items-center">
            {" "}
            <div
              className={`${styles.actionBtn} ml-[2.1rem] w-fit`}
              onClick={() => {
                updateTaskDes(listId, taskId);
                update(!stateUpdate);
              }}
            >
              Save
            </div>
            <FontAwesomeIcon className="px-2 h-2 cursor-pointer" icon={faX} />
          </div>
        </div>
        <div className="text-base mb-10 flex flex-col">
          <div>
            {" "}
            <FontAwesomeIcon className="px-2" icon={faPaperclip} /> Attachments
          </div>
          <div className="ml-[2.1rem] w-fit">
            <Button btnInput={"Add an attachment"} />
          </div>
        </div>

        <div className="flex flex-col mb-10">
          <div className="flex items-center justify-between pb-2">
            {" "}
            <div>
              <FontAwesomeIcon className="px-2" icon={faLaptopCode} />
              Activity
            </div>
            <div className="pr-14">
              {" "}
              <Button btnInput={"Show Details"} />
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-1">
              {" "}
              <User />
            </div>
            <input
              className="ml-2 text-sm"
              type="text"
              placeholder="Write a comment..."
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="modal-sidebar">
        <div className="text-xs text-slate-400 font-semibold">Add to card</div>
        <div className="my-2">
          <Button btnInput={"Members"} icon={faUser} />
        </div>
        <div className="my-2">
          <Button btnInput={"Label"} icon={faTag} />
        </div>
        <div className="my-2">
          <Button btnInput={"CheckList"} icon={faCheckToSlot} />
        </div>
        <div className="my-2">
          <Button btnInput={"Dates"} icon={faClock} />
        </div>

        <div className="my-2 cursor-not-allowed">
          <Button btnInput={"Attachments"} icon={faPaperclip} />
        </div>

        <div className="text-slate-400 text-xs">
          Add dropdowns, text fields, dates, and more to your cards.
        </div>
        <div className="text-xs text-slate-400 font-semibold mt-8">
          Power-Ups
        </div>
        <div className="my-2">
          <Button btnInput={"Dates"} icon={faPlus} />
        </div>
        <div className="text-xs text-slate-400 font-semibold mt-8">
          Automations
        </div>
        <div className="my-2">
          <Button btnInput={"Add Buttons"} icon={faPlus} />
        </div>
        <div className="text-xs text-slate-400 font-semibold mt-8">Actions</div>
        <div className="my-2">
          <Button btnInput={"Move"} icon={faMobile} />
        </div>
        <div className="my-2">
          <Button btnInput={"Copy"} icon={faCopy} />
        </div>
        <div className="my-2">
          <Button btnInput={"Share"} icon={faShare} />
        </div>
        <div className="my-2">
          <Button btnInput={"Watch"} icon={faEye} />
        </div>
      </div>

      {/* <div className="card-interaction">
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
        </div> */}
    </Modal>
  );
};

export default CardView;
