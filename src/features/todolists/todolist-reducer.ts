import { TodolistResponseType } from '../../types/TodolistType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleServerAppError, handleServerNetworkError } from '../../store/utils/utils';
import { setAppStatusAC } from '../../app/app-reducer';
import { todolist_api } from "../../api/todolist-api";
import { TodolistRequestStatus, TodolistType } from "../../types/TodolistType";
import { ResultCodeType } from '../../api/instance';
import { AppThunk } from '../../store/store';
const initialState: TodolistType[] = []
//reducer
const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        setTodolistsAC: (state, action: PayloadAction<{ todolists: TodolistResponseType[] }>) => {
            return action.payload.todolists.map(t => ({ ...t, filter: 'all', requestStatus: 'idle' }))
        },
        changeTodolistTitleAC: (state, action: PayloadAction<{ todolistID: string, title: string }>) => {
            const index = state.findIndex(t => t.id === action.payload.todolistID)
            state[index].title = action.payload.title
        },
        deleteTodolistAC: (state, action: PayloadAction<{ todolistID: string }>) => {
            const index = state.findIndex(t => t.id === action.payload.todolistID)
            state.splice(index, 1)
        },
        createTodolistAC: (state, action: PayloadAction<{ todolist: TodolistResponseType }>) => {
            state.unshift({ ...action.payload.todolist, filter: 'all', requestStatus: 'idle' })
        },
        changeTodolistRequestStatusAC: (state, action: PayloadAction<{ todolistID: string, status: TodolistRequestStatus }>) => {
            const index = state.findIndex(t => t.id === action.payload.todolistID)
            state[index].requestStatus = action.payload.status
        }
    }
})
export const todolistReducer = slice.reducer
//actions
export const setTodolistsAC = slice.actions.setTodolistsAC
export const changeTodolistTitleAC = slice.actions.changeTodolistTitleAC
export const deleteTodolistAC = slice.actions.deleteTodolistAC
export const createTodolistAC = slice.actions.createTodolistAC
export const changeTodolistRequestStatusAC = slice.actions.changeTodolistRequestStatusAC
//thunks
export const fetchTodolistsTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
        const res = await todolist_api.getTodolist()
        dispatch(setTodolistsAC({ todolists: res.data }))
        dispatch(setAppStatusAC({ status: 'successed' }))
    } catch (err) {
        handleServerNetworkError((err as Error).message, dispatch)
    }
}

export const changeTodolistTitleTC = (payload: { todolistID: string, title: string }): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    dispatch(changeTodolistRequestStatusAC({ todolistID: payload.todolistID, status: 'loading' }))
    try {
        const res = await todolist_api.changeTitle(payload)
        if (res.data.resultCode === ResultCodeType.Ok) {
            dispatch(changeTodolistTitleAC(payload))
            dispatch(changeTodolistRequestStatusAC({ todolistID: payload.todolistID, status: 'successful' }))
            dispatch(setAppStatusAC({ status: 'successed' }))
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(changeTodolistRequestStatusAC({ todolistID: payload.todolistID, status: 'idle' }))
        }
    }
    catch (error) {
        handleServerNetworkError((error as Error).message, dispatch)
    }
}

export const deleteTodolistTC = (todolistID: string): AppThunk =>
    async (dispatch) => {
        dispatch(changeTodolistRequestStatusAC({ todolistID, status: 'loading' }))
        try {
            await todolist_api.deleteTodolist(todolistID)
            dispatch(deleteTodolistAC({ todolistID }))
        } catch (err) {
            handleServerNetworkError((err as Error).message, dispatch)
        }
    }

export const createTodolistTC = (title: string): AppThunk =>
    async (dispatch) => {
        try {
            const res = await todolist_api.createTodolist(title)
            if (res.data.resultCode === ResultCodeType.Ok) {
                dispatch(createTodolistAC({ todolist: res.data.data.item }))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        } catch (err) {
            handleServerNetworkError((err as Error).message, dispatch)
        }
    }


export type TodolistReducerActionType =
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