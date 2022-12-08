import { tasksActions } from './task-reducer';
import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ResponseType, ResultCodeType } from '../../api/instance';
import { task_api } from '../../api/task-api';
import { setAppStatusAC } from '../../app/app-reducer';
import { TaskType } from '../../types/TaskType';

const { setTasksAC, deleteTaskAC, createTaskAC } = tasksActions;

export const fetchTasks = (todolistID: string) => {
    return {
        type: 'Tasks/fetch-tasks',
        todolistID
    };
};

function* fetchTasksWorker(actions: ReturnType<typeof fetchTasks>) {
    yield put(setAppStatusAC({ status: 'loading' }));
    const res: AxiosResponse<{ items: TaskType[] }> = yield call(
        task_api.getTask,
        actions.todolistID
    );
    yield put(
        setTasksAC({ todolistID: actions.todolistID, tasks: res.data.items })
    );
    yield put(setAppStatusAC({ status: 'succeeded' }));

    // .catch((error) => {
    //   handleServerNetworkError(error.message, dispatch);
    // });
}

export const deleteTask = (payload: {
    todolistID: string;
    taskID: string;
}) => ({
    type: 'Tasks/delete-tasks',
    payload
});

function* deleteTaskWorker(actions: ReturnType<typeof deleteTask>) {
    yield put(setAppStatusAC({ status: 'loading' }));
    yield call(task_api.deleteTask, actions.payload);
    yield put(deleteTaskAC(actions.payload));
    yield put(setAppStatusAC({ status: 'succeeded' }));
    yield put(setAppStatusAC({ status: 'succeeded' }));

    //   .catch((error) => {
    //     handleServerNetworkError(error.message, dispatch);
    //   });
}

export const createTask = (payload: { todolistID: string; title: string }) => ({
    type: 'Tasks/create-tasks',
    payload
});

function* createTaskWorker(actions: ReturnType<typeof createTask>) {
    yield put(setAppStatusAC({ status: 'loading' }));
    const res: AxiosResponse<ResponseType<{ item: TaskType }>> = yield call(
        task_api.createTask,
        actions.payload
    );
    if (res.data.resultCode === ResultCodeType.Ok) {
        yield put(createTaskAC({ task: res.data.data.item }));
        yield put(setAppStatusAC({ status: 'succeeded' }));
    } else {
        //  handleServerAppError(res.data, dispatch);
    }

    // .catch((error) => {
    //     handleServerNetworkError(error.message, dispatch);
    // });
}

export function* tasksWatcherSaga() {
    yield takeEvery('Tasks/fetch-tasks', fetchTasksWorker);
    yield takeEvery('Tasks/delete-tasks', deleteTaskWorker);
    yield takeEvery('Tasks/create-tasks', createTaskWorker);
}
