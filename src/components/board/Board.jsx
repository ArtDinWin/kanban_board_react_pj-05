import { LIST_TYPES, LIST_TITLE } from "../../config";
import List from "../list/List";

const Board = (props) => {
  const { tasks, setTasks } = props;

  return (
    <>
      {Object.values(LIST_TYPES).map((type) => {
        const listTasks = tasks.filter((task) => task.status === type);
        return (
          <List
            key={type}
            type={type}
            title={LIST_TITLE[type]}
            listTasks={listTasks || []}
            tasks={tasks}
            setTasks={setTasks}
          />
        );
      })}
    </>
  );
};

export default Board;
