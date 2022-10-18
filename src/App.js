import React from "react";
import ToDoBoard from "./components/ToDoBoard";
import Navbar from "./components/Navbar/navbar.js"
const App = () => {
  return (
    <div>
      <Navbar/>
      <ToDoBoard />
    </div>
  );
};

export default App;
