import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { appReducer } from "./reducers/app-reducer";
import { taskReducer } from "./reducers/task-reducer";
import { todolistReducer } from "./reducers/todolist-reducer";
import { authReducer } from './reducers/auth-reducer';
const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer
})
export const store = configureStore({
    reducer: rootReducer,
})
export type AppRootStoreType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStoreType> = useSelector
