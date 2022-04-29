import { v1 } from "uuid"
import { AddTodolistACType, DeleteTodolistACType } from "./todolistReducer"

type TaskType = {
    taskID: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: TaskType[]
}
type ActionType = RemoveTaskACType | AddTaskACType | ChangeStatusACType | AddTodolistACType | DeleteTodolistACType
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type ChangeStatusACType = ReturnType<typeof changeStatusAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
export const taskReducer = (state: TasksType = {}, action: ActionType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': return { ...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(t => t.taskID !== action.payload.taskID) }
        case 'ADD-TASK': return { ...state, [action.payload.todolistID]: [{ taskID: action.payload.taskID, title: action.payload.title, isDone: false }, ...state[action.payload.todolistID]] }
        case 'CHANGE-STATUS': return { ...state, [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.taskID === action.payload.taskID ? { ...t, isDone: action.payload.isDone } : t) }
        case 'ADD-TODOLIST': return { ...state, [action.todolistID]: [] }
        case 'DELETE-TODOLIST': {
            const stateCopy = { ...state }
            delete stateCopy[action.payload.todolistID]
            return { ...stateCopy }
        }
        default: return state
    }
}
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: { todolistID, taskID }
    } as const
}
export const addTaskAC = (todolistID: string, taskID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: { todolistID, taskID, title }
    } as const
}
export const changeStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        payload: { todolistID, taskID, isDone }
    } as const
}

