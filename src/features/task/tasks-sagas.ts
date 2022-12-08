import { AppRootStoreType } from './../../store/store';
import { tasksActions } from './task-reducer';
import { AxiosResponse } from 'axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { ResponseType, ResultCodeType } from '../../api/instance';
import { task_api } from '../../api/task-api';
import { setAppStatusAC } from '../../app/app-reducer';
import {
    TaskType,
    UpdateTaskOptionalPropertiesType,
    UpdateTaskType
} from '../../types/TaskType';
import {
    handleServerAppError,
    handleServerNetworkError
} from '../../store/utils/utils';

const { setTasksAC, deleteTaskAC, createTaskAC } = tasksActions;

export const fetchTasks = (todolistID: string) => {
    return {
        type: 'Tasks/fetch-tasks',
        todolistID
    };
};

function* fetchTasksWorker(actions: ReturnType<typeof fetchTasks>) {
    try {
        yield put(setAppStatusAC({ status: 'loading' }));
        const res: AxiosResponse<{ items: TaskType[] }> = yield call(
            task_api.getTask,
            actions.todolistID
        );
        yield put(
            setTasksAC({
                todolistID: actions.todolistID,
                tasks: res.data.items
            })
        );
        yield put(setAppStatusAC({ status: 'succeeded' }));
    } catch (err: any) {
        yield handleServerNetworkError(err.message);
    }
}

export const deleteTask = (payload: {
    todolistID: string;
    taskID: string;
}) => ({
    type: 'Tasks/delete-tasks',
    payload
});

function* deleteTaskWorker(actions: ReturnType<typeof deleteTask>) {
    try {
        yield put(setAppStatusAC({ status: 'loading' }));
        yield call(task_api.deleteTask, actions.payload);
        yield put(deleteTaskAC(actions.payload));
        yield put(setAppStatusAC({ status: 'succeeded' }));
    } catch (err: any) {
        yield handleServerNetworkError(err.message);
    }
}

export const createTask = (payload: { todolistID: string; title: string }) => ({
    type: 'Tasks/create-tasks',
    payload
});

function* createTaskWorker(actions: ReturnType<typeof createTask>) {
    try {
        yield put(setAppStatusAC({ status: 'loading' }));
        const res: AxiosResponse<ResponseType<{ item: TaskType }>> = yield call(
            task_api.createTask,
            actions.payload
        );
        if (res.data.resultCode === ResultCodeType.Ok) {
            yield put(createTaskAC({ task: res.data.data.item }));
            yield put(setAppStatusAC({ status: 'succeeded' }));
        } else {
            yield handleServerAppError(res.data);
        }
    } catch (err: any) {
        yield handleServerNetworkError(err.message);
    }
}
export const updateTask = (payload: {
    todolistID: string;
    taskID: string;
    taskModel: UpdateTaskOptionalPropertiesType;
}) => ({ type: 'Tasks/update-task', payload });

function* updateTaskWorker(action: ReturnType<typeof updateTask>) {
    try {
        yield put(setAppStatusAC({ status: 'loading' }));
        const state: AppRootStoreType = yield select();

        const task = state.tasks[action.payload.todolistID].find(
            (t) => t.id === action.payload.taskID
        );

        if (!task) throw new Error('task not found');
        const model: UpdateTaskType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...action.payload.taskModel
        };
        const res: AxiosResponse<ResponseType<{}>> = yield call(
            task_api.updateTask,
            {
                todolistID: action.payload.todolistID,
                taskID: action.payload.taskID,
                task: model
            }
        );
        if (res.data.resultCode === ResultCodeType.Ok) {
            yield put(
                tasksActions.updateTaskAC({
                    todolistID: action.payload.todolistID,
                    taskID: action.payload.taskID,
                    taskModel: action.payload.taskModel
                })
            );
            yield put(setAppStatusAC({ status: 'succeeded' }));
        } else {
            yield handleServerAppError(res.data);
        }
    } catch (error: any) {
        yield handleServerNetworkError(error.message);
    }
}

export function* tasksWatcherSaga() {
    yield takeEvery('Tasks/fetch-tasks', fetchTasksWorker);
    yield takeEvery('Tasks/delete-tasks', deleteTaskWorker);
    yield takeEvery('Tasks/create-tasks', createTaskWorker);
    yield takeEvery('Tasks/update-task', updateTaskWorker);
}
