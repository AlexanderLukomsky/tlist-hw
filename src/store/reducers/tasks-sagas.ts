import { ResponseType, ResultCodeType } from './../../api/instance';
import { deleteTaskAC, setTasksAC, createTaskAC } from './task-reducer';
import { task_api } from './../../api/task-api';
import { TaskType } from './../../types/TaskType';
import { AxiosResponse } from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';
import { setAppStatusAC } from '../../app/app-reducer';
//fetch tasks
export const fetchTasks = (todolistID: string) => ({ type: 'TASK/FETCH-TASKS', todolistID } as const)
export function* fetchTasksWorkerSaga(action: ReturnType<typeof fetchTasks>) {
   try {
      yield put(setAppStatusAC('loading'))
      const res: AxiosResponse<{ items: TaskType[] }> = yield call(task_api.getTask, action.todolistID)
      yield put(setTasksAC({ todolistID: action.todolistID, tasks: res.data.items }))
      yield put(setAppStatusAC('successed'))
   } catch (error: any) {
      yield alert(error.message)
   }
}
//delete task
export const deleteTask = (payload: { todolistID: string, taskID: string }) => ({ type: 'TASK/DELETE-TASK', payload } as const)
export function* deleteTaskWorkerSaga(action: ReturnType<typeof deleteTask>) {
   try {
      yield put(setAppStatusAC('loading'))
      yield call(task_api.deleteTask, action.payload)
      yield put(deleteTaskAC(action.payload))
      yield put(setAppStatusAC('successed'))
   } catch (error: any) {
      yield alert(error.message)
   }
}
//create task
export const createTask = (payload: { todolistID: string, title: string }) => ({ type: 'TAKS/CREATE-TASK', payload } as const)
export function* createTaskWorkerSaga(action: ReturnType<typeof createTask>) {
   try {
      yield put(setAppStatusAC('loading'))
      const res: AxiosResponse<ResponseType<{ item: TaskType }>> = yield call(task_api.createTask, action.payload)
      if (res.data.resultCode === ResultCodeType.Ok) {
         yield put(createTaskAC(res.data.data.item))
         yield put(setAppStatusAC('successed'))
      } else {
         yield alert('some error')
      }
   } catch (error: any) {
      yield alert(error.message)
   }
}

export function* tasksWatcherSagas() {
   yield takeEvery('TASK/FETCH-TASKS', fetchTasksWorkerSaga)
   yield takeEvery('TASK/DELETE-TASK', deleteTaskWorkerSaga)
   yield takeEvery('TAKS/CREATE-TASK', createTaskWorkerSaga)
}