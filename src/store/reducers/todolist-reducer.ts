
import { Dispatch } from "redux";
import { todolist_api } from "../../api/todolist-api";
import { TodolistResponseType, TodolistType } from "../../types/TodolistType";

export const todolistReducer = (state: TodolistType[] = [], action: todolistReducerActionType): TodolistType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': return action.todolists.map(t => ({ ...t, filter: 'all' }))
        case 'CHANGE-TODO-TITLE': return state.map(t => t.id === action.payload.todolistID ? { ...t, title: action.payload.title } : t)
        default: return state
    }
}
//actions
export const setTodolistsAC = (todolists: TodolistResponseType[]) => (
    {
        type: 'SET-TODOLISTS',
        todolists
    } as const
)
export const changeTodolistTitleAC = (payload: { todolistID: string, title: string }) => (
    {
        type: 'CHANGE-TODO-TITLE',
        payload
    } as const
)
//thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<SetTodolistsACType>) => {
    todolist_api.getTodolist()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const changeTodolistTitleTC = (payload: { todolistID: string, title: string }) => (dispatch: Dispatch<ChangeTodolistTitleACType>) => {
    todolist_api.changeTitle(payload)
        .then(() => {
            dispatch(changeTodolistTitleAC(payload))
        })
}
//todolist_api.changeTitle()

type todolistReducerActionType =
    | SetTodolistsACType
    | ChangeTodolistTitleACType
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>