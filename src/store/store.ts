import { configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { appReducer, AppReducerActionType } from "../app/app-reducer";
import { taskReducer, TaskReducerActionType } from "../features/task/task-reducer";
import { authReducer, AuthReducerActionType } from '../features/auth/auth-reducer';
import { filterReducer, FilterReducerType } from '../common/reducers/filter-reducer';
import { todolistReducer, TodolistReducerActionType } from './../features/todolists/todolist-reducer';


export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        todolists: todolistReducer,
        app: appReducer,
        auth: authReducer,
        filter: filterReducer
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
    | FilterReducerType