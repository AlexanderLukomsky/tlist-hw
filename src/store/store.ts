import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers } from "redux";
import { appReducer } from "../app/app-reducer";
import { authReducer } from './reducers/auth-reducer';
import { taskReducer } from "./reducers/task-reducer";
import { todolistReducer } from "./reducers/todolist-reducer";

//base import for redux-saga
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { appWatcherSagas } from "../app/app-sagas";
import { tasksWatcherSagas } from "./reducers/tasks-sagas";
//redux-saga create middleware

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer
})
export const store = configureStore({
    reducer: rootReducer,
    //middleware for redux-saga
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
})
export type AppRootStoreType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStoreType> = useSelector

//connect Action for saga-middlewaer
sagaMiddleware.run(rootWatcher)
//create generator function for Action 
function* rootWatcher() {
    yield all([appWatcherSagas(), tasksWatcherSagas()])
}