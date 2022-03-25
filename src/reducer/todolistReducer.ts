export type TodolistType = {
    todolistID: string
    title: string
    filter: FilterType
}
type TodolistActionType = DeleteTodolistACType | AddTodolistACType | ChangeFilterType
type AddTodolistACType = ReturnType<typeof addTodolistAC>
type DeleteTodolistACType = ReturnType<typeof deleteTodlistAC>
type ChangeFilterType = ReturnType<typeof changeFilterAC>
export type FilterType = 'all' | 'active' | 'completed'
export const todolistReducer = (state: TodolistType[], action: TodolistActionType): TodolistType[] => {
    switch (action.title) {
        case 'DELETE-TODOLIST': {
            return state.filter(t => t.todolistID !== action.payload.todolistID)
        }
        case 'CHANGE-FILTER': return state.map(t => t.todolistID === action.payload.todolistID ? { ...t, filter: action.payload.filter } : t)
        case 'ADD-TODOLIST': return [{ todolistID: action.payload.todolistID, title: action.payload.title, filter: 'all' }, ...state]
        default: return state
    }
}
export const deleteTodlistAC = (todolistID: string) => {
    return {
        title: 'DELETE-TODOLIST',
        payload: { todolistID }
    } as const
}
export const changeFilterAC = (todolistID: string, filter: FilterType) => {
    return {
        title: 'CHANGE-FILTER',
        payload: { todolistID, filter }
    } as const
}
export const addTodolistAC = (todolistID: string, title: string) => {
    return {
        title: 'ADD-TODOLIST',
        payload: { todolistID, title }
    } as const
}