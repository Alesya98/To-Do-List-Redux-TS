import { combineReducers, legacy_createStore } from "redux"
import inputTextReducer from "./reducers/inputTextReducer"
import taskReducer from "./reducers/taskReducer"
import { filterReducer } from "./reducers/filterReducer"



const rootReducer = combineReducers({
    text: inputTextReducer,
    tasks: taskReducer,
    filter: filterReducer
})

const store = legacy_createStore(rootReducer)

export default store

export type RootReducerType = ReturnType<typeof rootReducer> 
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;