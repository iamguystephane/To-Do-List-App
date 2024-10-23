import React, { useEffect, useState } from "react";
import "../styles/new-task.css";
import { useNavigate } from "react-router-dom";
const EditTask = ({ formClose, taskDetails }) => {
  const [formData, setFormData] = useState({
    task: "",
    description: "",
    date: "",
    time: "",
  });
  const currentDate = new Date();
  const hoursMinutes = currentDate.toTimeString().slice(0, 5);
  let message;
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    if (name === "date") {
      const selectedDate = new Date(value);
      if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
        message = "You cannot set a date less than the current date.";
        setErrors((prevErrors) => ({
          ...prevErrors,
          date2: message,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          date2: "",
        }));
      }
    } else if (name === "time") {
      const { date } = formData;
      if (date === currentDate.toISOString().split("T")[0]) {
        const selectedTime = value;
        if (hoursMinutes >= selectedTime) {
          message =
            "You cannot set a time that is past that of the selected date";
          setErrors((prevErrors) => ({
            ...prevErrors,
            time1: message,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            time1: "",
          }));
        }
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(true);
  const navigation = useNavigate();
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const currentDate = new Date();
    const errorMsg = {};
    const { date, time } = formData;
    const selectedDate = new Date(date);
    const selectedTime = time;
    if (!formData.task.trim()) {
      errorMsg.name = "Task must be filled!";
    }
    if (!formData.description.trim()) {
      errorMsg.description = "Task details must be assigned.";
    }
    if (!formData.date.trim()) {
      errorMsg.date = "Fill in the date";
    }
    if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
      errorMsg.date1 = "The date selected must be today or a later date";
    }
    if (date === currentDate.toISOString().split("T")[0]) {
      if (selectedTime <= hoursMinutes) {
        errorMsg.time2 = "Please select a time which is past the current time.";
      }
    }
    if (!formData.time.trim()) {
      errorMsg.time = "Please set the time";
    }

    if (Object.keys(errorMsg).length === 0) {
      const currentTasks = JSON.parse(localStorage.getItem("formArray")) || [];
      const updatedTasks = currentTasks.map((task) => {
        if (task.id === taskDetails.id) {
          return { ...task, ...formData };
        }
        return task;
      });
      localStorage.setItem("formArray", JSON.stringify(updatedTasks));
      errorMsg.success = "Task has been updated.";
      setVisible(true);
      navigation("/", { state: updatedTasks });
    }

    setErrors(errorMsg);
  };
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 15000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [visible]);

  useEffect(() => {
    if (taskDetails) {
      setFormData({
        task: taskDetails.task || "",
        description: taskDetails.description || "",
        date: taskDetails.date || "",
        time: taskDetails.time || "",
      });
    }
  }, [taskDetails]);
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        {visible && errors.success && (
          <div className="success-msg">{errors.success}</div>
        )}
        <div className="form-wrapper">
          <div onClick={formClose}>
            <i className="close-btn fa fa-close" />
          </div>
          <div className="form-group">
            <label for="exampleFormControlInput1">Task Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="exampleFormControlInput1"
              name="task"
              onChange={handleOnChange}
              value={formData.task}
            />
          </div>
          {errors.name && <p>{errors.name}</p>}
          <div className="form-group">
            <label for="exampleFormControlTextarea1">Task Description</label>
            <textarea
              className="form-control form-control-lg"
              id="exampleFormControlTextarea1"
              rows="3"
              name="description"
              onChange={handleOnChange}
              value={formData.description}
            ></textarea>
          </div>
          {errors.description && <p>{errors.description}</p>}
          <div className="date form-group">
            <label for="exampleFormControlInput1">Date </label>
            <input
              type="date"
              className="form-control form-control-lg"
              id="exampleformControlInput1"
              name="date"
              onChange={handleOnChange}
              value={formData.date}
            />
          </div>
          {errors.date && <p>{errors.date}</p>}
          {errors.date1 && <p>{errors.date1}</p>}
          {errors.date2 && <p>{errors.date2}</p>}
          <div className="date form-group">
            <label for="exampleFormControlInput1">Time </label>
            <input
              type="time"
              className="form-control form-control-lg"
              id="exampleformControlInput1"
              name="time"
              onChange={handleOnChange}
              value={formData.time}
            />
          </div>
          {errors.time1 && <p>{errors.time1}</p>}
          {errors.time2 && <p>{errors.time2}</p>}
          {errors.time && <p>{errors.time}</p>}
          <small> All fields are required </small>
          <div className="btn-styles" style={{ display: "flex", gap: "10px" }}>
            <button type="submit" className="btn btn-success">
              Update
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={formClose}
            >
              {" "}
              Cancel{" "}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditTask;
