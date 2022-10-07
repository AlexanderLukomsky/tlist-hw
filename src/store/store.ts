import { ActionCreatorsMapObject, bindActionCreators, configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { appReducer, AppReducerActionType } from "../app/app-reducer";
import { taskReducer } from "../features/task/task-reducer";
import { authReducer, AuthReducerActionType } from '../features/auth/auth-reducer';
import { filterReducer, FilterReducerType } from '../common/reducers/filter-reducer';
import { todolistReducer } from './../features/todolists/todolist-reducer';
import { useMemo } from 'react';


export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        todolists: todolistReducer,
        app: appReducer,
        auth: authReducer,
        filter: filterReducer
    }
})
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStoreType> = useSelector

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
    const dispatch = useAppDispatch()
    const boundActionCreators = useMemo(
        () => bindActionCreators(actions, dispatch), [actions, dispatch]
    )
    return boundActionCreators
}

export type AppRootStoreType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStoreType, unknown, AppActionType>
//hooks


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStoreType, unknown, AppActionType>
type AppActionType =
    | AppReducerActionType
    | AuthReducerActionType
    | FilterReducerType
    | any

