import { useState, useEffect, createContext } from "react";
// import { HashRouter as Router } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./../header/Header";
import Main from "./../main/Main";
import Footer from "./../footer/Footer";
import css from "./App.module.scss";
import data_mock from "./../../mock.json";

export const AppContext = createContext(null);

function App() {
  const data_tasks =
    JSON.parse(window.localStorage.getItem("kanban-tasks")) || data_mock;
  const [tasks, setTasks] = useState(data_tasks);
  const [availableSave, setAvailableSave] = useState(true);

  useEffect(() => {
    if (availableSave) {
      window.localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
    }
  }, [tasks, availableSave]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AppContext.Provider value={{ setAvailableSave }}>
        <div className={css.wrapper}>
          <Header tasks={tasks} setTasks={setTasks} />
          <Main tasks={tasks} setTasks={setTasks} />
          <Footer tasks={tasks} />
        </div>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
