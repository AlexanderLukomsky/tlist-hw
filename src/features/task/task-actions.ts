import { ResultCodeType } from '../../api/instance';
import { task_api } from '../../api/task-api';
import { setAppStatusAC } from '../../app/app-reducer';
import { AppRootStoreType, AppThunk } from '../../store/store';
import { handleServerAppError, handleServerNetworkError } from '../../store/utils/utils';
import { UpdateTaskOptionalPropertiesType, UpdateTaskType } from '../../types/TaskType';
import { createTaskAC, deleteTaskAC, setTasksAC, updateTaskAC } from './task-reducer';

//thunks
export const fetchTasks = (todolistID: string): AppThunk => (dispatch) => {
   dispatch(setAppStatusAC({ status: 'loading' }))
   task_api.getTask(todolistID)
      .then(res => {
         dispatch(setTasksAC({ todolistID, tasks: res.data.items }))
         dispatch(setAppStatusAC({ status: 'successed' }))
      })
      .catch(error => {
         handleServerNetworkError(error.message, dispatch)
      })
}
export const createTask = (payload: { todolistID: string, title: string }): AppThunk => (dispatch) => {
   //dispatch(changeTodolistRequestStatusAC({ todolistID: payload.todolistID, status: 'loading' }))
   dispatch(setAppStatusAC({ status: 'loading' }))
   task_api.createTask(payload)
      .then(res => {
         if (res.data.resultCode === ResultCodeType.Ok) {
            dispatch(createTaskAC({ task: res.data.data.item }))
            dispatch(setAppStatusAC({ status: 'successed' }))
         } else {
            handleServerAppError(res.data, dispatch)
         }
      })
      .catch((error) => {
         handleServerNetworkError(error.message, dispatch)
      })
}
export const deleteTask = (payload: { todolistID: string, taskID: string }): AppThunk => (dispatch) => {
   dispatch(setAppStatusAC({ status: 'loading' }))
   task_api.deleteTask(payload)
      .then(() => {
         dispatch(deleteTaskAC(payload))
         dispatch(setAppStatusAC({ status: 'successed' }))
      }).catch(error => {
         handleServerNetworkError(error.message, dispatch)
      })
}
export const updateTask = (payload: { todolistID: string, taskID: string, taskModel: UpdateTaskOptionalPropertiesType }): AppThunk =>
   (dispatch, getState: () => AppRootStoreType) => {
      dispatch(setAppStatusAC({ status: 'loading' }))
      const task = getState().tasks[payload.todolistID]
         .find(t => t.id === payload.taskID)
      if (!task) throw new Error('task not found')
      const model: UpdateTaskType = {
         title: task.title,
         description: task.description,
         status: task.status,
         priority: task.priority,
         startDate: task.startDate,
         deadline: task.deadline,
         ...payload.taskModel
      }
      task_api.updateTask({ todolistID: payload.todolistID, taskID: payload.taskID, task: model })
         .then((res) => {
            if (res.data.resultCode === ResultCodeType.Ok) {
               dispatch(updateTaskAC({ todolistID: payload.todolistID, taskID: payload.taskID, taskModel: payload.taskModel }))
               dispatch(setAppStatusAC({ status: 'successed' }))
            } else {
               handleServerAppError(res.data, dispatch)
            }
         }).catch(error => {
            handleServerNetworkError(error.message, dispatch)
         })
   }

