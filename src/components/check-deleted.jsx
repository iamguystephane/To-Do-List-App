import React, { useEffect, useState } from "react";
import "../styles/check-deleted.css";

const CheckDeleted = ({ optionMenuClose, receivedData, setClicked }) => {
  const { index, setTaskData, taskData } = receivedData;
  const handleDeletedTask = (index) => {
    const newFormData = taskData.filter((_, i) => i !== index);
    setTaskData(newFormData);
    localStorage.setItem("formArray", JSON.stringify(newFormData));
    setClicked(true);

    optionMenuClose();
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setClicked(false);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="check-deleted">
      <div className="wrapper">
        <h3> Are you sure you want to delete this task ?</h3>
        <div className="options">
          <button
            className="btn btn-success"
            onClick={() => handleDeletedTask(index)}
          >
            Yes
          </button>
          <button className="btn btn-danger" onClick={optionMenuClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckDeleted;
