import React, { useEffect, useState } from "react";
import Nav from "./nav";
import Task from "./task";
import NewTask from "./new-task";
import CheckDeleted from "./check-deleted";
import EditTask from "./edit-task";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </>
  );
};
const MainPage = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [detailsForm, setDetailsForm] = useState(null);
  const [optionMenu, setOptionMenu] = useState(false);
  const [receivedData, setReceivedData] = useState(null);
  const [checkClicked, setCheckClicked] = useState(false);
  const [sortFormat, setSortFormat] = useState();
  const [checkClear, setCheckClear] = useState(false);
  const [taskDetails, setTaskDetails] = useState();

  const handleFormOpen = () => setFormOpen(true);
  const optionMenuClose = () => setOptionMenu(false);
  const optionMenuOpen = () => setOptionMenu(true);
  const handleFormClose = () => setFormOpen(false);
  const handleDetailsFormOpen = () => setDetailsForm(true);
  const handleDetailsFormClose = () => setDetailsForm(false);
  const handleClearTasks = () => {
    localStorage.clear();
    setCheckClear(true);
    setTimeout(() => {
      setCheckClear(false);
    }, 6000);
  };

  return (
    <>
      {optionMenu && (
        <CheckDeleted
          optionMenuClose={optionMenuClose}
          receivedData={receivedData}
          setClicked={setCheckClicked}
        />
      )}
      {formOpen && <NewTask formClose={handleFormClose} />}
      {detailsForm && (
        <EditTask formClose={handleDetailsFormClose} taskDetails={taskDetails} />
      )}
      <nav>
        <Nav
          formOpen={handleFormOpen}
          clearTasks={handleClearTasks}
          setSortFormat={setSortFormat}
        />
      </nav>
      <Task
        optionMenuOpen={optionMenuOpen}
        receivedData={setReceivedData}
        checkClicked={checkClicked}
        sortFormat={sortFormat}
        checkClear={checkClear}
        openForm={handleDetailsFormOpen}
        setTaskDetails={setTaskDetails}
      />
    </>
  );
};
export default App;
