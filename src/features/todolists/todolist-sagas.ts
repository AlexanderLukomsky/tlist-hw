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
    setTodolists
} from './todolist-reducer';
import { ResultCodeType } from '../../api/instance';

export const fetchTodolists = () => ({ type: 'Todolist/fetch-todolists' });

function* fetchTodolistsWorker() {
    yield put(setAppStatusAC({ status: 'loading' }));
    const res: AxiosResponse<TodolistResponseType[]> = yield call(
        todolist_api.getTodolist
    );
    yield put(setTodolists({ todolists: res.data }));
    yield put(setAppStatusAC({ status: 'succeeded' }));
    //  handleServerNetworkError((err as Error).message, dispatch);
}

export const deleteTodolist = (todolistID: string) => ({
    type: 'Todolist/delete-todolist',
    todolistID
});

function* deleteTodolistWorker(action: ReturnType<typeof deleteTodolist>) {
    yield put(
        changeTodolistRequestStatusAC({
            todolistID: action.todolistID,
            status: 'loading'
        })
    );
    yield call(todolist_api.deleteTodolist, action.todolistID);
    yield put(deleteTodolistAC({ todolistID: action.todolistID }));
    //  catch (err) {
    //     handleServerNetworkError((err as Error).message, dispatch);
    // }
}

export const createTodolist = (title: string) => ({
    type: 'Todolist/create-todolist',
    title
});

function* createTodolistWorker(action: ReturnType<typeof createTodolist>) {
    const res: AxiosResponse<TodolistAPIType> = yield call(
        todolist_api.createTodolist,
        action.title
    );

    if (res.data.resultCode === ResultCodeType.Ok) {
        yield put(createTodolistAC({ todolist: res.data.data.item }));
    } else {
        //  handleServerAppError(res.data, dispatch);
    }
    // handleServerNetworkError((err as Error).message, dispatch);
}

export function* todolistWatcherSaga() {
    yield takeEvery('Todolist/fetch-todolists', fetchTodolistsWorker);
    yield takeEvery('Todolist/delete-todolist', deleteTodolistWorker);
    yield takeEvery('Todolist/create-todolist', createTodolistWorker);
}
