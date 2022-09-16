import { configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { appReducer, AppReducerActionType } from "./reducers/app-reducer";
import { taskReducer, TaskReducerActionType } from "./reducers/task-reducer";
import { todolistReducer, TodolistReducerActionType } from "./reducers/todolist-reducer";
import { authReducer, AuthReducerActionType } from './reducers/auth-reducer';


export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        todolists: todolistReducer,
        app: appReducer,
        auth: authReducer
    }
})
export type AppRootStoreType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStoreType, unknown, AppActionType>
//hooks
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStoreType> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStoreType, unknown, AppActionType>
type AppActionType =
    | TodolistReducerActionType
    | AppReducerActionType
    | TaskReducerActionType
    | AuthReducerActionType