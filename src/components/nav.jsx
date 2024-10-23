import React, { useState } from "react";
import "../styles/nav.css";

const Nav = ({ formOpen, clearTasks, setSortFormat }) => {
  const getSorted = (event) => {
    const { value } = event.target;
    value != "Sort by" ? setSortFormat(value) : "";
  };
  return (
    <>
      <div className="logo">To Do</div>
      <div className="items">
        <select onChange={getSorted}>
          <option>Sort by</option>
          <option>Date</option>
          <option>Time</option>
          <option>Asc</option>
          <option>Desc</option>
        </select>
        <div className="add-task" onClick={formOpen}>
          <button> New Task</button>
          <i className="fa fa-add" />
        </div>
        <div className="add-task" onClick={clearTasks}>
          <button> Clear tasks </button>
        </div>
      </div>
    </>
  );
};

export default Nav;
