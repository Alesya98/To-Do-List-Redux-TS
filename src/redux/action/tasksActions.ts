import type { InitialValue } from "../reducers/inputTextReducer";
import type { Task } from "../reducers/taskReducer";

export type AddNewTasksType = ReturnType<typeof createAddTaskActions>
    | ReturnType<typeof deleteTasksActions>

export const createAddTaskActions = (value: Task) => {
    return {
        type: "add",
        payload: value,
    } as const
  
};

export const displayTasksActions = (value: InitialValue[]) => {
    return {
        type: "get",
        payload: value
    } as const
}

export const deleteTasksActions = (value: string) => {
    return {
        type: "delete",
        payload: value, 
    } as const
 
};


export const checkedTasksActions = (value: string) => {
    return {
        type: "check",
        payload: value,   
    } as const
 
};
export const editTasksActions = (id:string, newTitle:string) => {
    return {
        type: "edit",
        payload: 
            id,
            newTitle,
    } as const
  
};

export const filterTasksActions = (value: string) => {
    return {
        type: "filter",
        payload: value,
    } as const
};

export const clearActiveActions = (value: string) => {
    return {
        type: "clear",
        payload: value,
    } as const
  
};