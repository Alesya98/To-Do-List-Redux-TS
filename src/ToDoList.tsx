import Task from "./Task";
import { memo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";

const ToDoList = () => {
  const { value } = useSelector((store:RootState) => store.tasks);
  const { res } = useSelector((store:RootState) => store.filter);

  const filteredTasks = value.filter((item) => {
    if (res === "active") return !item.isCompleted;
    if (res === "done") return item.isCompleted;
    return true;
  });

  return (
    <div className="tasks">
      {filteredTasks.length === 0 && (
        <h3>Добавь задачу, которую нужно выполнить </h3>
      )}
      {filteredTasks.map((item) => (
        <Task key={item.id} task={item} />
      ))}
    </div>
  );
};

export default memo(ToDoList);