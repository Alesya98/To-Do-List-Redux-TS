import { useState, memo } from "react";
import { useDispatch } from "react-redux";
import { checkedTasksActions, deleteTasksActions, editTasksActions } from "./redux/action/tasksActions";
import type { AppDispatch } from "./redux/store";

type TaskPropsType = {
    id: string,
    title: string,
  isCompleted: boolean,
  user_id? : number
}

type TaskProps = {
    task: TaskPropsType
}

const Task:React.FC<TaskProps> = ({ task }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editText, setEditText] = useState<string>(task.title);

  const hendelSend = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (editText.trim() === "") {
        setEditText(task.title);
        setIsEdit((isEdit) => !isEdit);
        return;
      }
      editTitle(task.id, editText);
      setIsEdit((isEdit) => !isEdit);
    }
  };

    const deleteTask = async(id:string) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            accept: "application/json",
          },
        },
      );
        
      if (response.ok) {
        dispatch(deleteTasksActions(id));
      } else {
        console.log("Ошибка");
      }
    } catch (error) {
      console.log("Ошибка", error);
    }
  }; 

  const checkedTask = async (id:string) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "accept": "application/json"
          },
        },
      );
      if (response.ok) {
        dispatch(checkedTasksActions(id));
      }
      else {
        console.log("Ошибка", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editTitle = async (id:string, newTitle:string) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({ title: newTitle }),
        },
      );

      if (response.ok) {
        dispatch(editTasksActions( id, editText));
      } else {
        console.log("Ошибка при обновлении на сервере");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="task">
      <input
        className="task-check"
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => checkedTask(task.id)}
      />
      {!isEdit ? (
        <p className={task.isCompleted ? "check" : ""}>{task.title}</p>
      ) : (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={hendelSend}
        />
      )}

      <div className="btn">
        <button
          className="btn-task"
          onClick={() => setIsEdit((isEdit) => !isEdit)}
        >
          ✏️
        </button>
        <button className="btn-task" onClick={() => deleteTask(task.id)}>
          ❌
        </button>
      </div>
    </div>
  );
};

export default memo(Task);