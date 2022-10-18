/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import Card from "./Card/Card";

import AddCardView from "./CardActions/addCardView";

const ListView = ({
  getTask,
  add,
  del,
  upd,
  lid,
  setDel,
  setUpd,
  addTask,
  setAdd,
  setTitle,
}) => {
  let taskArray = [];
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    getTask(lid, taskArray, setTaskList);
  }, [add, upd, del]);

  return (
    <>
      <div>
        {taskList.map((card) => {
          return (
            <Card
              lid={lid}
              key={card.taskId}
              tid={card.taskId}
              title={card.taskName}
              des={card.taskDes}
              status_color={card.taskColor}
              status={card.status}
              update={setUpd}
              stateUpdate={upd}
              del={del}
              setDel={setDel}
            />
          );
        })}
      </div>
      <AddCardView
        setTitle={setTitle}
        add={add}
        lid={lid}
        addTask={addTask}
        setAdd={setAdd}
      />
    </>
  );
};

export default ListView;
