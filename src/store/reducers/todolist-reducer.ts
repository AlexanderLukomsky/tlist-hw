import { setErrorAC, setStatusAC, SetStatusACType } from './app-reducer';

import { Dispatch } from "redux";
import { todolist_api } from "../../api/todolist-api";
import { TodolistRequestStatus, TodolistResponseType, TodolistType } from "../../types/TodolistType";

export const todolistReducer = (state: TodolistType[] = [], action: todolistReducerActionType): TodolistType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': return action.todolists.map(t => ({ ...t, filter: 'all', requestStatus: 'idle' }))
        case 'CHANGE-TODO-TITLE': return state.map(t => t.id === action.payload.todolistID ? { ...t, title: action.payload.title } : t)
        case 'DELETE-TODOLIST': return state.filter(t => t.id !== action.todolistID)
        case 'CREATE-TODOLIST': return [{ ...action.todolist, filter: 'all', requestStatus: 'idle' }, ...state,]
        case 'CHANGE-TODOLIST-REQUEST-STATUS': return state.map(t => t.id === action.payload.todolistID ? { ...t, requestStatus: action.payload.status } : t)
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
export const deleteTodolistAC = (todolistID: string) => (
    {
        type: 'DELETE-TODOLIST',
        todolistID
    } as const
)
export const createTodolistAC = (todolist: TodolistResponseType) => (
    {
        type: 'CREATE-TODOLIST',
        todolist
    } as const
)
export const changeTodolistRequestStatusAC = (payload: { todolistID: string, status: TodolistRequestStatus }) => (
    {
        type: 'CHANGE-TODOLIST-REQUEST-STATUS',
        payload
    } as const
)
//thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<SetTodolistsACType | SetStatusACType>) => {
    dispatch(setStatusAC('loading'))
    todolist_api.getTodolist()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setStatusAC('idle'))
        })
}
export const changeTodolistTitleTC = (payload: { todolistID: string, title: string }) => (dispatch: Dispatch<ChangeTodolistTitleACType | ChangeTodolistRequestStatusACType>) => {
    dispatch(changeTodolistRequestStatusAC({ todolistID: payload.todolistID, status: 'loading' }))
    todolist_api.changeTitle(payload)
        .then(() => {
            dispatch(changeTodolistTitleAC(payload))
            dispatch(changeTodolistRequestStatusAC({ todolistID: payload.todolistID, status: 'successful' }))
        })
}
export const deleteTodolistTC = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(changeTodolistRequestStatusAC({ todolistID, status: 'loading' }))
    todolist_api.deleteTodolist(todolistID)
        .then(() => {
            dispatch(deleteTodolistAC(todolistID))
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolist_api.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(createTodolistAC(res.data.data.item))
            }
            if (res.data.resultCode !== 0) {
                if (res.data.messages.length > 0) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('some error'))
                }
            }
        })
}


type todolistReducerActionType =
    | SetTodolistsACType
    | ChangeTodolistTitleACType
    | DeleteTodolistACType
    | CreateTodolistACType
    | ChangeTodolistRequestStatusACType
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistACType = ReturnType<typeof createTodolistAC>
export type ChangeTodolistRequestStatusACType = ReturnType<typeof changeTodolistRequestStatusAC>