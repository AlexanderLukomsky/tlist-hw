import { TasksStateType, TaskType, UpdateTaskOptionalPropertiesType, UpdateTaskType } from '../../types/TaskType';
import { ResultCodeType } from '../../api/instance';
import { task_api } from '../../api/task-api';
import { setAppStatusAC } from '../../app/app-reducer';
import { AppRootStoreType, AppThunk } from '../../store/store';
import { handleServerAppError, handleServerNetworkError } from '../../store/utils/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodolistResponseType } from '../../types/TodolistType';
import { actions as todolistActions } from './../todolists/todolist-reducer';
//reducer
const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
        setTasksAC: (state, action: PayloadAction<{ todolistID: string, tasks: TaskType[] }>) => {
            state[action.payload.todolistID] = action.payload.tasks
        },
        createTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        deleteTaskAC: (state, action: PayloadAction<{ todolistID: string, taskID: string }>) => {
            const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
            state[action.payload.todolistID].splice(index, 1)
        },
        updateTaskAC: (state, action: PayloadAction<{ todolistID: string, taskID: string, taskModel: UpdateTaskOptionalPropertiesType }>) => {
            const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
            state[action.payload.todolistID][index] = { ...state[action.payload.todolistID][index], ...action.payload.taskModel }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(todolistActions.setTodolists, (state, action) => {
            action.payload.todolists.forEach((t: TodolistResponseType) => state[t.id] = [])
        })
        builder.addCase(todolistActions.createTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(todolistActions.deleteTodolistAC, (state, action) => {
            delete state[action.payload.todolistID]
        })
    }
})
export const taskReducer = slice.reducer

//actions
const { setTasksAC, createTaskAC, deleteTaskAC, updateTaskAC } = slice.actions
export const actions = slice.actions
//thunks
const fetchTasks = (todolistID: string): AppThunk => (dispatch) => {
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
const createTask = (payload: { todolistID: string, title: string }): AppThunk => (dispatch) => {
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
const deleteTask = (payload: { todolistID: string, taskID: string }): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    task_api.deleteTask(payload)
        .then(() => {
            dispatch(deleteTaskAC(payload))
            dispatch(setAppStatusAC({ status: 'successed' }))
        }).catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
}
const updateTask = (payload: { todolistID: string, taskID: string, taskModel: UpdateTaskOptionalPropertiesType }): AppThunk =>
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
export const asyncActions = { updateTask, deleteTask, createTask, fetchTasks }


