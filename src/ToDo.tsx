import { useEffect} from 'react';
import './App.css'
import { useDispatch} from 'react-redux';
import { displayTasksActions } from './redux/action/tasksActions';
import Header from './Header';
import InputTask from './InputTask';
import ToDoList from './ToDoList';
import ButtonComp from './ButtonComp';
import DeleteActiveTask from './DeleteActiveTask';

export type TaskProps = {
  id: string;
  title: string;
  isDone: boolean;
}

export const ToDo = () => {
  const dispatch = useDispatch();
  
  const getAllTasks = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.log('Нет токена авторизации. Пожалуйста, войдите в систему');
      return
    }
    try {
      const response = await fetch("https://todo-redev.herokuapp.com/api/todos",
        {
          method:'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      )
      const data = await response.json();
      dispatch(displayTasksActions(data))
    } catch (error) {
      console.log('Ошибка', error)
    }
  }

  useEffect(() => {
    getAllTasks()
  },[])


  return (
    <>
      <Header />
      <InputTask/>
      <ToDoList />
      <ButtonComp/>
      <DeleteActiveTask/>
    </>
  )
}
