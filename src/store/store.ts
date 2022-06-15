
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { taskReducer } from "./reducers/task-reducer";
import { todolistReducer } from "./reducers/todolist-reducer";
const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
})
export const store = configureStore({
    reducer: rootReducer,
})
export type AppRootStoreType = ReturnType<typeof rootReducer>
