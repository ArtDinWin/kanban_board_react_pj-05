import css from "./Main.module.scss";
import { Routes, Route } from "react-router-dom";
import Board from "../board/Board";
import DetailTask from "../detail-task/DetailTask";
import NotFound from "../404/NotFound";

const Main = (props) => {
  const display = (Component, propsValue) => {
    return (
      <div className={css.wrapper}>
        <div className={css.board}>
          <Component {...propsValue} />
        </div>
      </div>
    );
  };

  return (
    <Routes>
      <Route path="/" element={display(Board, props)} />
      <Route path="task/:id" element={display(DetailTask, props)} />
      <Route path="*" element={display(NotFound, null)} />
    </Routes>
  );
};

export default Main;
