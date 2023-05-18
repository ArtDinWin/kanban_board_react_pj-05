import { useState } from "react";
import { Link } from "react-router-dom";
import { LIST_TYPES } from "../../config";
import css from "./List.module.scss";
import { getColor, getIcon } from "./../../utils";
import FormAddNewTask from "./../forms/FormAddNewTask";
import SectionTasks from "./../section/SectionTasks";
import Button from "./../button/Button";
import uniqid from "uniqid";

const List = (props) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormChange, setIsFormChange] = useState(false);
  const [selectValue, setSelectValue] = useState(true);

  const { type, title, tasks, listTasks, setTasks } = props;

  function getPrevTasks(tasks, type) {
    const prevTasks = tasks.filter((task) => {
      return (
        task.status ===
        Object.values(LIST_TYPES)[Object.values(LIST_TYPES).indexOf(type) - 1]
      );
    });
    return prevTasks;
  }

  const handleSelection = (e) => {
    setIsFormChange(false);
    setSelectValue(e.target.value);
  };
  const handleButtonBacklog = () => {
    setIsFormVisible(!isFormVisible);
  };
  const handleButtonItems = () => {
    isFormVisible ? setIsFormChange(false) : setIsFormChange(true);
    setIsFormVisible(!isFormVisible);
    if (isFormVisible) {
      moveTask();
    }
    setSelectValue(true);
  };

  const handleButtonClose = () => {
    setIsFormVisible(false);
    setIsFormChange(false);
    setSelectValue(true);
  };

  const addNewTask = (title) => {
    const newTask = {
      id: uniqid(),
      title: title,
      description: "",
      status: LIST_TYPES.BACKLOG,
    };
    setTasks([...tasks, newTask]);
  };

  const moveTask = () => {
    let newTasks = [...tasks];
    let taskMove = newTasks.find((task) => task.id === selectValue);
    if (taskMove) {
      taskMove = { ...taskMove, status: type };
      const taskChangeId = newTasks.map((task) => task.id).indexOf(selectValue);
      newTasks.splice(taskChangeId, 1);
      newTasks = [...newTasks, taskMove];
      setTasks(newTasks);
    } else {
      alert("Program ERROR! Task's Id not found!");
      setTasks(tasks);
    }
  };

  const prevTasks = getPrevTasks(tasks, type);
  const prevTypeTasks =
    Object.values(LIST_TYPES)[Object.values(LIST_TYPES).indexOf(type) - 1];

  const renderListTasks = listTasks.map((task) => {
    return (
      <div key={task.id} className={css.tasks__item}>
        <Link to={`task/${task.id}`}>{task.title}</Link>
      </div>
    );
  });

  const buttonBacklog = (
    <Button
      textBtn={["+ New task", "Submit"]}
      styleBtn={"light"}
      handleBtn={handleButtonBacklog}
      enabled={true}
      isItemVisible={isFormVisible}
    />
  );

  const buttonsItems = (
    <div className={css.buttons__wrap}>
      <Button
        textBtn={["+ Add task", "Submit"]}
        styleBtn={"light"}
        handleBtn={handleButtonItems}
        enabled={
          prevTasks.length && !isFormChange && selectValue ? true : false
        }
        isItemVisible={isFormVisible}
      />
      {isFormVisible ? (
        <Button
          textBtn={["X", "X"]}
          styleBtn="light"
          handleBtn={handleButtonClose}
          enabled={true}
        />
      ) : null}
    </div>
  );

  const formBacklog = (
    <FormAddNewTask
      setIsFormVisible={setIsFormVisible}
      addNewTask={addNewTask}
    />
  );

  const sectionItems = (
    <SectionTasks
      handleSelection={handleSelection}
      typeTasks={prevTypeTasks}
      prevTasks={prevTasks}
    />
  );

  return (
    <>
      <div className={css.tasks__block}>
        <h2
          className={css.tasks__title}
          style={{ backgroundColor: getColor(type) }}
        >
          {getIcon(type)}&nbsp;{title}
        </h2>
        <div className={css.tasks__wrap}>{renderListTasks}</div>
        {type === LIST_TYPES.BACKLOG && isFormVisible && formBacklog}
        {type === LIST_TYPES.BACKLOG && !isFormVisible && buttonBacklog}
        {type !== LIST_TYPES.BACKLOG && isFormVisible && sectionItems}
        {type !== LIST_TYPES.BACKLOG && buttonsItems}
      </div>
    </>
  );
};

export default List;
