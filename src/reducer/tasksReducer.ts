type TaskType = {
    taskID: string
    title: string
    isDone: boolean
}
export type StateReducerType = {
    [key: string]: TaskType[]
}
type ActionType = RemoveTaskACType | AddTaskACType | ChangeStatusACType | AddTasksListACType | DeleteTasksListACType
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type ChangeStatusACType = ReturnType<typeof changeStatusAC>
type AddTasksListACType = ReturnType<typeof addTasksListAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type DeleteTasksListACType = ReturnType<typeof deleteTasksListAC>
export const taskReducer = (state: StateReducerType, action: ActionType) => {
    switch (action.title) {
        case 'REMOVE-TASK': return { ...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(t => t.taskID !== action.payload.taskID) }
        case 'ADD-TASK': return { ...state, [action.payload.todolistID]: [{ taskID: action.payload.taskID, title: action.payload.title, isDone: false }, ...state[action.payload.todolistID]] }
        case 'CHANGE-STATUS': return { ...state, [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.taskID === action.payload.taskID ? { ...t, isDone: action.payload.isDone } : t) }
        case 'ADD-TASKS-LIST': return { ...state, [action.payload.todolistID]: [] }
        case 'DELETE-TASKS-LIST': {
            delete state[action.payload.todolistID]
            return state
        }
        default: return state
    }
}
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        title: 'REMOVE-TASK',
        payload: { todolistID, taskID }
    } as const
}
export const addTaskAC = (todolistID: string, taskID: string, title: string) => {
    return {
        title: 'ADD-TASK',
        payload: { todolistID, taskID, title }
    } as const
}
export const changeStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        title: 'CHANGE-STATUS',
        payload: { todolistID, taskID, isDone }
    } as const
}
export const deleteTasksListAC = (todolistID: string) => {
    return {
        title: 'DELETE-TASKS-LIST',
        payload: {
            todolistID
        }
    } as const
}
export const addTasksListAC = (todolistID: string) => {
    return {
        title: 'ADD-TASKS-LIST',
        payload: { todolistID }
    } as const
}
