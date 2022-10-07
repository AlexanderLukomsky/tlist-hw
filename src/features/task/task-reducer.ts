import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setAppStatusAC } from '../../app/app-reducer';
import { AppRootStoreType, AppThunk } from '../../store/store';
import { TasksStateType, TaskType, UpdateTaskOptionalPropertiesType, UpdateTaskType } from '../../types/TaskType';
import { task_api } from '../../api/task-api';
import { handleServerAppError, handleServerNetworkError } from '../../store/utils/utils';
import { ResultCodeType } from '../../api/instance';
import { TodolistResponseType } from '../../types/TodolistType';
import { deleteTodolistAC, setTodolistsAC } from '../todolists/todolist-reducer';
import { createTodolistAC } from './../todolists/todolist-reducer';
const initialState: TasksStateType = {}
//reducer
const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
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
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((t: TodolistResponseType) => state[t.id] = [])
        })
        builder.addCase(createTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.todolistID]
        })
    }
})
export const taskReducer = slice.reducer
//actions
export const setTasksAC = slice.actions.setTasksAC
export const createTaskAC = slice.actions.createTaskAC
export const deleteTaskAC = slice.actions.deleteTaskAC
export const updateTaskAC = slice.actions.updateTaskAC
//thunks
export const fetchTasksTC = (todolistID: string): AppThunk => (dispatch) => {
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
export const createTaskTC = (payload: { todolistID: string, title: string }): AppThunk => (dispatch) => {
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
export const deleteTaskTC = (payload: { todolistID: string, taskID: string }): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    task_api.deleteTask(payload)
        .then(() => {
            dispatch(deleteTaskAC(payload))
            dispatch(setAppStatusAC({ status: 'successed' }))
        }).catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const updateTaskTC = (payload: { todolistID: string, taskID: string, taskModel: UpdateTaskOptionalPropertiesType }): AppThunk =>
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
//types
export type TaskReducerActionType =
    | SetTasksACType
    | CreateTaskACType
    | DeleteTaskACType
    | UpdateTaskACType
type SetTasksACType = ReturnType<typeof setTasksAC>
type CreateTaskACType = ReturnType<typeof createTaskAC>
type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
type UpdateTaskACType = ReturnType<typeof updateTaskAC>


