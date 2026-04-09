export type Task = {
    id: string;
    title: string;
    isCompleted: boolean
}

type TodoState = {
    value: Task[]
}

const initialValue: TodoState = {
  value: [],
};

type Action = { type: 'add'; payload: Task } 
  | { type: 'delete'; payload: string } 
  | { type: 'get'; payload: Task[] }
  | { type: 'check', payload: string }
  | { type: 'edit', payload: {id:string, editText:string} }
  | {type: 'clear', payload: string}


const taskReducer = (store = initialValue, action: Action):TodoState => {
  switch (action.type) {
    case "add":
      return {
        ...store,
        value: [...store.value, action.payload],
      };

    case "get":
      return { ...store, value: action.payload };

    case "delete":
      return {
        ...store,
        value: store.value.filter((item) => item.id !== action.payload),
      };

    case "check":
      return {
        ...store,
        value: store.value.map((item) =>
          item.id === action.payload
            ? { ...item, isCompleted: !item.isCompleted }
            : item,
        ),
      };

    case "edit":
      return {
        ...store,
        value: store.value.map((item) =>
          item.id === action.payload.id
            ? { ...item, title: action.payload.editText }
            : item,
        ),
      };

    case "clear":
      return {
        ...store,
        value: store.value.filter((item) => item.id !== action.payload),
      };

    default:
      return store;
  }
};

export default taskReducer;