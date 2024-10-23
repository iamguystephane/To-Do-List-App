import React from "react";
import "../styles/new-task.css";

const DeletedTask = () => {
  return (
    <div className="success-msg deleted">
      Task has been deleted. Please refresh the page.
    </div>
  );
};

export default DeletedTask;
