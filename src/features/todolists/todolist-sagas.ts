import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { todolist_api } from '../../api/todolist-api';
import { setAppStatusAC } from '../../app/app-reducer';
import { TodolistResponseType } from '../../types/TodolistType';
import { setTodolists } from './todolist-reducer';

export const fetchTodolists = () => ({ type: 'Todolist/fetch-todolists' });

export function* fetchTodolistsSaga() {
    yield put(setAppStatusAC({ status: 'loading' }));
    const res: AxiosResponse<TodolistResponseType[]> = yield call(
        todolist_api.getTodolist
    );
    yield put(setTodolists({ todolists: res.data }));
    yield put(setAppStatusAC({ status: 'succeeded' }));
    //  handleServerNetworkError((err as Error).message, dispatch);
}

export function* todolistWatcherSaga() {
    yield takeEvery('Todolist/fetch-todolists', fetchTodolistsSaga);
}
