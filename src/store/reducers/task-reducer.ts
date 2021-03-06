import { setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType } from './app-reducer';
import { AppRootStoreType } from './../store';
import { DeleteTodolistACType, SetTodolistsACType, CreateTodolistACType, ChangeTodolistRequestStatusACType, changeTodolistRequestStatusAC } from './todolist-reducer';
import { TasksStateType, TaskType, UpdateTaskOptionalPropertiesType, UpdateTaskType } from './../../types/TaskType';
import { Dispatch } from 'redux';
import { task_api } from '../../api/task-api';
import { handleServerAppError, handleServerNetworkError } from '../utils/utils';
import { ResultCodeType } from '../../api/instance';


export const taskReducer = (state: TasksStateType = {}, action: TaskReducerActionType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            const stateCopy = { ...state }
            action.todolists.forEach(t => stateCopy[t.id] = [])
            return stateCopy
        }
        case 'DELETE-TODOLIST': {
            const stateCopy = { ...state }
            delete stateCopy[action.todolistID]
            return stateCopy
        }
        case 'CREATE-TODOLIST': return { ...state, [action.todolist.id]: [] }
        case 'SET-TASKS': return { ...state, [action.payload.todolistID]: action.payload.tasks }
        case 'CREATE-TASK': return {
            ...state,
            [action.task.todoListId]: [
                action.task,
                ...state[action.task.todoListId]
            ]
        }
        case 'UPDATE-TASK': return {
            ...state,
            [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.taskID ? { ...t, ...action.payload.taskModel } : t)
        }
        case 'DELETE-TASK': return { ...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(t => t.id !== action.payload.taskID) }
        default: return state
    }
}
//actions
export const setTasksAC = (payload: { todolistID: string, tasks: TaskType[] }) => (
    {
        type: 'SET-TASKS',
        payload
    } as const
)
export const createTaskAC = (task: TaskType) => (
    {
        type: 'CREATE-TASK',
        task
    } as const
)
export const deleteTaskAC = (payload: { todolistID: string, taskID: string }) => (
    {
        type: 'DELETE-TASK',
        payload
    } as const
)
export const updateTaskAC = (payload: { todolistID: string, taskID: string, taskModel: UpdateTaskOptionalPropertiesType }) => (
    {
        type: 'UPDATE-TASK',
        payload
    } as const
)
//thunks
export const fetchTasksTC = (todolistID: string) => (dispatch: Dispatch<SetTasksACType | SetAppStatusACType>) => {
    dispatch(setAppStatusAC('loading'))
    task_api.getTask(todolistID)
        .then(res => {
            dispatch(setTasksAC({ todolistID, tasks: res.data.items }))
            dispatch(setAppStatusAC('successed'))
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const createTaskTC = (payload: { todolistID: string, title: string }) => (dispatch: Dispatch<ThunkDispatchActionType>) => {
    //dispatch(changeTodolistRequestStatusAC({ todolistID: payload.todolistID, status: 'loading' }))
    dispatch(setAppStatusAC('loading'))
    task_api.createTask(payload)
        .then(res => {
            if (res.data.resultCode === ResultCodeType.Ok) {
                dispatch(createTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('successed'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const deleteTaskTC = (payload: { todolistID: string, taskID: string }) => (dispatch: Dispatch<ThunkDispatchActionType>) => {
    dispatch(setAppStatusAC('loading'))
    task_api.deleteTask(payload)
        .then(() => {
            dispatch(deleteTaskAC(payload))
            dispatch(setAppStatusAC('successed'))
        }).catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const updateTaskTC = (payload: { todolistID: string, taskID: string, taskModel: UpdateTaskOptionalPropertiesType }) =>
    (dispatch: Dispatch<ThunkDispatchActionType>, getState: () => AppRootStoreType) => {
        dispatch(setAppStatusAC('loading'))
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
                    dispatch(setAppStatusAC('successed'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch(error => {
                handleServerNetworkError(error.message, dispatch)
            })
    }
//types
type TaskReducerActionType =
    | SetTodolistsACType
    | SetTasksACType
    | CreateTaskACType
    | DeleteTaskACType
    | UpdateTaskACType
    | DeleteTodolistACType
    | CreateTodolistACType
type SetTasksACType = ReturnType<typeof setTasksAC>
type CreateTaskACType = ReturnType<typeof createTaskAC>
type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
type UpdateTaskACType = ReturnType<typeof updateTaskAC>
type ThunkDispatchActionType = TaskReducerActionType | SetAppErrorACType | ChangeTodolistRequestStatusACType | SetAppStatusACType

