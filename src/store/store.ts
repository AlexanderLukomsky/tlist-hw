import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import { combineReducers } from 'redux';
import {
    ActionCreatorsMapObject,
    AnyAction,
    bindActionCreators,
    configureStore,
    ThunkAction,
    ThunkDispatch
} from '@reduxjs/toolkit';

import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appReducer } from '../app/app-reducer';
import { filterReducer } from '../common/reducers/filter-reducer';
import { authReducer } from '../features/auth/auth-reducer';
import { taskReducer } from '../features/task/task-reducer';
import { todolistReducer } from './../features/todolists/todolist-reducer';
import thunk from 'redux-thunk';
import { tasksWatcherSaga } from '../features/task/tasks-sagas';
import { appWatcherSaga } from '../app/app-sagas';
import { todolistWatcherSaga } from '../features/todolists/todolist-sagas';

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer,
    filter: filterReducer
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk, sagaMiddleware]
});

export const useAppDispatch = () =>
    useDispatch<TypedDispatch<AppRootStoreType>>();
export const useAppSelector: TypedUseSelectorHook<AppRootStoreType> =
    useSelector;

sagaMiddleware.run(rootWatcher);

function* rootWatcher() {
    yield all([appWatcherSaga(), tasksWatcherSaga(), todolistWatcherSaga()]);
}

export type AppRootStoreType = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStoreType,
    unknown,
    AnyAction
>;
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
    const dispatch = useAppDispatch();
    const boundActionCreators = useMemo(
        () => bindActionCreators(actions, dispatch),
        [actions, dispatch]
    );
    return boundActionCreators;
};
