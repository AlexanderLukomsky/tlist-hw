import { ActionCreatorsMapObject, AnyAction, bindActionCreators, configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appReducer } from "../app/app-reducer";
import { filterReducer } from '../common/reducers/filter-reducer';
import { authReducer } from '../features/auth/auth-reducer';
import { taskReducer } from "../features/task/task-reducer";
import { todolistReducer } from './../features/todolists/todolist-reducer';

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
export type AppDispatch = ThunkDispatch<AppRootStoreType, unknown, AnyAction>
//hooks


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStoreType, unknown, AnyAction>

