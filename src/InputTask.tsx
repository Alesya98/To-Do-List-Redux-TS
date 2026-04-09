import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./redux/store";
import { useState } from "react";
import { createAddTaskActions } from "./redux/action/tasksActions";


const InputTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { value } = useSelector((store:RootState) => store.text);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "change", payload: e.target.value });
  };

  const addNewTasks = async () => {
      const token = localStorage.getItem('token')
  if (!token) {
    console.log('Нет токена авторизации. Пожалуйста, войдите в систему');
    return
  }
      try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/todos",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: value }),
        },
      );

        const data = await response.json();
        
      dispatch(createAddTaskActions(data));
    } catch (error) {
      console.log("Ошибка", error);
    }
  };

  const handleClick = () => {
    if (value.trim() === "") {
      setError("Нельзя добавить пустую задачу");
      return;
    }
    setError("");
    addNewTasks();
    dispatch({ type: "zero", payload: '' });
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        className="search"
        placeholder="Введите задачу"
        type="text"
        value={value}
        onChange={handleChange}
      />
      <button className="search-btn" onClick={handleClick}>
        Добавить
      </button>
      {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
    </div>
  );
};

export default InputTask;