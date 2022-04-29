import { v1 } from 'uuid';
export type TodolistType = {
    todolistID: string
    title: string
    filter: FilterType
}
type TodolistActionType = DeleteTodolistACType | AddTodolistACType | ChangeFilterType
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type DeleteTodolistACType = ReturnType<typeof deleteTodlistAC>
type ChangeFilterType = ReturnType<typeof changeFilterAC>

export type FilterType = 'all' | 'active' | 'completed'
export const todolistReducer = (state: TodolistType[] = [], action: TodolistActionType): TodolistType[] => {
    switch (action.type) {
        case 'DELETE-TODOLIST': {
            return state.filter(t => t.todolistID !== action.payload.todolistID)
        }
        case 'CHANGE-FILTER': return state.map(t => t.todolistID === action.payload.todolistID ? { ...t, filter: action.payload.filter } : t)
        case 'ADD-TODOLIST': return [{ todolistID: action.todolistID, title: action.payload.title, filter: 'all' }, ...state]
        default: return state
    }
}
export const deleteTodlistAC = (todolistID: string) => {
    return {
        type: 'DELETE-TODOLIST',
        payload: { todolistID }
    } as const
}
export const changeFilterAC = (todolistID: string, filter: FilterType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: { todolistID, filter }
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        todolistID: v1(),
        payload: { title }
    } as const
}