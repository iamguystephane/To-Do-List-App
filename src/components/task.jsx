import React, { useEffect, useState } from "react";
import "../styles/task.css";
import CompletedTask from "./completed";
import { useLocation } from "react-router-dom";
import DeletedTask from "./deleted";
import Clear from "./clear";

const Task = ({
  optionMenuOpen,
  receivedData,
  checkClicked,
  sortFormat,
  checkClear,
  openForm,
  setTaskDetails,
}) => {
  const location = useLocation();
  const [taskData, setTaskData] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const storedData =
      JSON.parse(localStorage.getItem("formArray")) || [] || location.state;
    setTaskData(storedData);
  }, [location.state]);

  const completeTask = (index) => {
    const updatedTask = taskData.filter((_, i) => i !== index);
    setTaskData(updatedTask);
    localStorage.setItem("formArray", JSON.stringify(updatedTask));
    setClicked(true);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setClicked(false);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const handleSendData = (index) => {
    receivedData({
      taskData: taskData,
      index: index,
      setTaskData: setTaskData,
    });

    optionMenuOpen();
  };
  const sortTaskData = (sortFormat, dataToSort) => {
    const data = [...dataToSort];
    if (sortFormat === "Asc") {
      return data.sort((a, b) => a.task.localeCompare(b.task));
    }
    if (sortFormat === "Desc") {
      return data.sort((a, b) => b.task.localeCompare(a.task));
    }
    if (sortFormat === "Date") {
      return data.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    if (sortFormat === "Time") {
      return data.sort((a, b) => a.time.localeCompare(b.time));
    }
    return data;
  };

  const newTaskData = sortTaskData(sortFormat, taskData);
  const handleGetDetails = (index) => {
    setTaskDetails(newTaskData[index]);
    openForm();
  };
  return (
    <>
      {newTaskData.length > 0 ? (
        <section className="tasks">
          {clicked && <CompletedTask />}
          {checkClicked && <DeletedTask />}
          {checkClear && <Clear />}
          <table>
            <thead>
              <tr>
                <th> Task </th>
                <th> Description </th>
                <th> Date </th>
                <th> Time </th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>
              {newTaskData.map((item, index) => (
                <tr
                  className="task-list"
                  key={index}
                  onClick={() => handleGetDetails(index)}
                >
                  <td>{item.task} </td>
                  <td>{item.description} </td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => completeTask(index)}
                      >
                        Complete
                      </button>{" "}
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleSendData(index)}
                      >
                        Delete
                      </button>
                      <div
                        className="edit-btn"
                        onClick={() => handleGetDetails(index)}
                      >
                        <button type="button" className="edit">
                          Edit
                        </button>
                        <i className="pencil-icon fa fa-pencil" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <div className="no-task">
          {" "}
          No task created yet! Create a new task to begin{" "}
        </div>
      )}
    </>
  );
};

export default Task;
