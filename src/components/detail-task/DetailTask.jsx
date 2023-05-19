import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import css from "./DetailTask.module.scss";
import Close from "./../../assets/close.svg";
import { getColor, getIcon } from "./../../utils";
import Button from "./../button/Button";
import NotFound from "../404/NotFound";
import clsx from "clsx";
import { AppContext } from "./../App/App";

const TaskDetail = (props) => {
  const { setAvailableSave } = useContext(AppContext);
  const textareaRef = useRef(null);
  const { tasks, setTasks } = props;
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [taskDetail, setTaskDetail] = useState({ title: "", description: "" });
  const taskFind = tasks.find((task) => task.id === params.id);

  useEffect(() => {
    // Перемещение курсора в конец строки при focus()
    if (textareaRef.current) {
      textareaRef.current.selectionStart = textareaRef.current.value.length;
      textareaRef.current.selectionEnd = textareaRef.current.value.length;
      textareaRef.current.focus();
    }
  }, [isEdit]);

  useEffect(() => {
    if (taskFind !== undefined) {
      setTaskDetail(taskFind);
    }
  }, [taskFind]);

  function saveTask() {
    if (taskDetail.title) {
      const newTasks = tasks.map((task) => {
        return task.id !== params.id
          ? { ...task }
          : {
              ...task,
              title: taskDetail.title,
              description: taskDetail.description,
            };
      });
      setTasks(newTasks);
    }
  }

  const handleEdit = () => {
    if (isEdit) {
      setIsEdit(!isEdit);
      setAvailableSave(true);
      saveTask();
    } else {
      setIsEdit(!isEdit);
      setAvailableSave(false);
    }
  };

  const changeInput = (e) => {
    setTaskDetail({ ...taskDetail, title: e.target.value });
  };

  const changeDescription = (e) => {
    setTaskDetail({ ...taskDetail, description: e.target.value });
  };

  const renderTaskDetail = () => {
    return (
      <>
        <div className={css.task__block}>
          <span
            className={css.task__status}
            title={"Type task: " + taskDetail.status}
            style={{ backgroundColor: getColor(taskDetail.status) }}
          >
            {getIcon(taskDetail.status)}
          </span>
          {!isEdit ? (
            <h2 className={css.task__title}>
              {taskDetail.title || "No title task"}
            </h2>
          ) : (
            <div className={css.task__title_wrap}>
              <input
                type="text"
                name="task-title"
                placeholder="New task title..."
                value={taskDetail.title}
                onChange={changeInput}
                className={clsx(css.task__input, {
                  [css.task__input_error]: !taskDetail.title,
                })}
              />{" "}
              {getIcon("edit")}
              {taskDetail.title ? null : (
                <div className={css.task__alert_error}>
                  *required: This task has no title
                </div>
              )}
            </div>
          )}
        </div>
        {!isEdit ? (
          <p
            className={clsx(css.task__info, {
              [css.task__info_warning]: !taskDetail.description,
            })}
          >
            {taskDetail.description || "This task has no description"}
          </p>
        ) : (
          <div className={css.task__textarea_wrap}>
            <textarea
              ref={textareaRef}
              // autoFocus
              className={clsx(css.task__info, {
                [css.task__info_warning]: !taskDetail.description,
              })}
              value={taskDetail.description}
              onChange={changeDescription}
            />
            {taskDetail.description ? null : (
              <div className={css.task__alert_warning}>
                *warning: This task has no description
              </div>
            )}
          </div>
        )}
        <Button
          textBtn={["Edit", "Save"]}
          styleBtn={"dark"}
          handleBtn={handleEdit}
          enabled={isEdit && !taskDetail.title ? false : true}
          isItemVisible={isEdit}
        />
        <Link to="/">
          <div className={css.task__close}>
            <img
              src={Close}
              alt="icon: close"
              width="100%"
              title="Close/Return"
            />
          </div>
        </Link>
      </>
    );
  };

  return (
    <>
      <div className={css.task__window}>
        {taskFind ? (
          renderTaskDetail()
        ) : (
          <NotFound text={"Task with ID = '" + params.id + "' not found! "} />
        )}
      </div>
    </>
  );
};

export default TaskDetail;
