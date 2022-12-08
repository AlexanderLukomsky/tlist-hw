import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { todolist_api } from '../../api/todolist-api';
import { setAppStatusAC } from '../../app/app-reducer';
import {
    TodolistAPIType,
    TodolistResponseType
} from '../../types/TodolistType';
import {
    changeTodolistRequestStatusAC,
    createTodolistAC,
    deleteTodolistAC,
    setNewTodolistTitle,
    setTodolists
} from './todolist-reducer';
import { ResponseType, ResultCodeType } from '../../api/instance';
import {
    handleServerAppError,
    handleServerNetworkError
} from '../../store/utils/utils';

export const fetchTodolists = () => ({ type: 'Todolist/fetch-todolists' });

function* fetchTodolistsWorker() {
    try {
        yield put(setAppStatusAC({ status: 'loading' }));
        const res: AxiosResponse<TodolistResponseType[]> = yield call(
            todolist_api.getTodolist
        );
        yield put(setTodolists({ todolists: res.data }));
        yield put(setAppStatusAC({ status: 'succeeded' }));
    } catch (err: any) {
        yield handleServerNetworkError(err.message);
    }
}

export const deleteTodolist = (todolistID: string) => ({
    type: 'Todolist/delete-todolist',
    todolistID
});

function* deleteTodolistWorker(action: ReturnType<typeof deleteTodolist>) {
    try {
        yield put(
            changeTodolistRequestStatusAC({
                todolistID: action.todolistID,
                status: 'loading'
            })
        );
        yield call(todolist_api.deleteTodolist, action.todolistID);
        yield put(deleteTodolistAC({ todolistID: action.todolistID }));
    } catch (err: any) {
        yield handleServerNetworkError(err.message);
    }
}

export const createTodolist = (title: string) => ({
    type: 'Todolist/create-todolist',
    title
});

function* createTodolistWorker(action: ReturnType<typeof createTodolist>) {
    try {
        const res: AxiosResponse<TodolistAPIType> = yield call(
            todolist_api.createTodolist,
            action.title
        );

        if (res.data.resultCode === ResultCodeType.Ok) {
            yield put(createTodolistAC({ todolist: res.data.data.item }));
        } else {
            yield handleServerAppError(res.data);
        }
    } catch (error: any) {
        yield handleServerNetworkError(error.message);
    }
}

export const changeTodolistTitle = (payload: {
    todolistID: string;
    title: string;
}) => ({ type: 'Todolist/change-title', payload });

function* changeTodolistTitleWorker(
    action: ReturnType<typeof changeTodolistTitle>
) {
    yield put(setAppStatusAC({ status: 'loading' }));
    yield put(
        changeTodolistRequestStatusAC({
            todolistID: action.payload.todolistID,
            status: 'loading'
        })
    );

    try {
        const res: AxiosResponse<
            ResponseType<{
                data: TodolistResponseType[];
            }>
        > = yield call(todolist_api.changeTitle, action.payload);
        if (res.data.resultCode === ResultCodeType.Ok) {
            yield put(setNewTodolistTitle(action.payload));
            yield put(
                changeTodolistRequestStatusAC({
                    todolistID: action.payload.todolistID,
                    status: 'successful'
                })
            );
            yield put(setAppStatusAC({ status: 'succeeded' }));
        } else {
            yield handleServerAppError(res.data);
            yield put(
                changeTodolistRequestStatusAC({
                    todolistID: action.payload.todolistID,
                    status: 'idle'
                })
            );
        }
    } catch (error: any) {
        handleServerNetworkError(error.message);
    }
}

export function* todolistWatcherSaga() {
    yield takeEvery('Todolist/fetch-todolists', fetchTodolistsWorker);
    yield takeEvery('Todolist/delete-todolist', deleteTodolistWorker);
    yield takeEvery('Todolist/create-todolist', createTodolistWorker);
    yield takeEvery('Todolist/change-title', changeTodolistTitleWorker);
}
