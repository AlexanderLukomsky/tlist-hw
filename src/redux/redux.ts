
import { taskReducer } from './../reducer/tasksReducer';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { todolistReducer } from '../reducer/todolistReducer';
export default {}
export const rootReducer = combineReducers({
    tasks: taskReducer,
    todolist: todolistReducer
})
export const store = configureStore({
    reducer: rootReducer
})
export type AppStateType = ReturnType<typeof rootReducer>