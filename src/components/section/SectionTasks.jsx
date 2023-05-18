import css from "./section.module.scss";

const SectionTasks = (props) => {
  const { handleSelection, typeTasks, prevTasks } = props;
  return (
    <select
      name="available-tasks"
      className={css.select}
      onChange={handleSelection}
    >
      <option value="">--Available {typeTasks}--</option>
      {prevTasks.map((task) => {
        return (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        );
      })}
    </select>
  );
};

export default SectionTasks;
