import css from "./Footer.module.scss";
import { LIST_AUTHOR_INFO, LIST_TYPES } from "./../../config";
import { getColor, getIcon } from "./../../utils";

const Footer = (props) => {
  function getCountTasks(tasks, type) {
    return tasks.filter((task) => {
      return task.status === type;
    }).length;
  }
  const { firstname, secondname, link_github, nick_name, year } =
    LIST_AUTHOR_INFO;

  return (
    <footer className={css.wrapper}>
      <div>
        <div className={css.wrapper__block}>
          <div className={css.wrapper__item}>
            <span
              className={css.item__status}
              title={"Type task: " + LIST_TYPES.BACKLOG}
              style={{ backgroundColor: getColor(LIST_TYPES.BACKLOG) }}
            >
              {getIcon(LIST_TYPES.BACKLOG)}
            </span>
            <span className={css.wrapper__item_title}>Active: </span>
            {getCountTasks(props.tasks, LIST_TYPES.BACKLOG)}
          </div>
          <div className={css.wrapper__item}>
            <span
              className={css.item__status}
              title={"Type task: " + LIST_TYPES.READY}
              style={{ backgroundColor: getColor(LIST_TYPES.READY) }}
            >
              {getIcon(LIST_TYPES.READY)}
            </span>
            <span className={css.wrapper__item_title}>Ready: </span>
            {getCountTasks(props.tasks, LIST_TYPES.READY)}
          </div>
        </div>
        <div className={css.wrapper__block}>
          <div className={css.wrapper__item}>
            <span
              className={css.item__status}
              title={"Type task: " + LIST_TYPES.IN_PROGRESS}
              style={{ backgroundColor: getColor(LIST_TYPES.READY) }}
            >
              {getIcon(LIST_TYPES.IN_PROGRESS)}
            </span>
            <span className={css.wrapper__item_title}>Doing: </span>
            {getCountTasks(props.tasks, LIST_TYPES.IN_PROGRESS)}
          </div>
          <div className={css.wrapper__item}>
            <span
              className={css.item__status}
              title={"Type task: " + LIST_TYPES.FINISHED}
              style={{ backgroundColor: getColor(LIST_TYPES.FINISHED) }}
            >
              {getIcon(LIST_TYPES.FINISHED)}
            </span>
            <span className={css.wrapper__item_title}>Finished: </span>
            {getCountTasks(props.tasks, LIST_TYPES.FINISHED)}
          </div>
        </div>
      </div>
      <div className={css.wrapper__author}>
        <span className={css.wrapper__author_title}>
          Kanban board by {firstname} {secondname}{" "}
        </span>
        <a href={link_github} target="_blank" rel="noreferrer">
          {nick_name}
        </a>
        <span className={css.wrapper__author_year}>,&nbsp;{year}</span>
      </div>
    </footer>
  );
};

export default Footer;
