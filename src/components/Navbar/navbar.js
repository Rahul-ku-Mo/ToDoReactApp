import React from "react";
import "./navbar.css";
import NavbarButton from "../shared/Button/Button";
import { faLock, faBolt, faRocket, faBarsProgress, faClipboardList } from "@fortawesome/free-solid-svg-icons";

import Users from "../shared/user";
const navbar = () => {
  return (
    <div className="flex items-center text-lg font-bold justify-between mt-2 bg-transparent">
      <div className="flex">
        <div className="ml-2 px-2">TBoard</div>
        <div className="px-2 border-x-2">
          <NavbarButton icon={faLock} btnInput={"Private"} />
        </div>
        <div className="px-2">
          <NavbarButton icon={faClipboardList} btnInput={"Board"} />
        </div>
      </div>
      <div className="flex mr-2 items-center">
        <div>
          <NavbarButton icon={faBolt} btnInput={"Automation"} />
        </div>
        <div className="px-2 ">
          <NavbarButton icon={faRocket} btnInput={"Power-Ups"} />
        </div>
        <div className="px-2 border-x-2">
          <NavbarButton icon={faBarsProgress} btnInput={"Filters"} />
        </div>
        <div className="mx-2"> 
          <Users />
        </div>
      </div>
    </div>
  );
};

export default navbar;
