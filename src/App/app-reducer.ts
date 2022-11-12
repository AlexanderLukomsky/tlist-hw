import { Dispatch } from "redux"
import { authAPI } from "../api/auth-api"
import { ResultCodeType } from "../api/instance"
import { setIsLoggedInAC } from "../store/reducers/auth-reducer"
import { call, put } from 'redux-saga/effects'
//initial state
const initialState: InitialStateType = {
    status: 'idle',
    errorMessage: null,
    isInitializedApp: false
}
//reducer
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'app/SET-STATUS': return { ...state, status: action.status }
        case 'app/SET-ERROR': return { ...state, errorMessage: action.errorMessage }
        case 'app/SET-INITIALIZED-APP': return { ...state, isInitializedApp: action.isInitializedApp }
        default: return { ...state }
    }
}
//actions
export const setAppStatusAC = (status: RequestStatusType) => (
    {
        type: 'app/SET-STATUS',
        status
    } as const
)
export const setAppErrorAC = (errorMessage: string | null) => (
    {
        type: 'app/SET-ERROR',
        errorMessage
    } as const
)
export const setInitializedAppAC = (isInitializedApp: boolean) => (
    {
        type: 'app/SET-INITIALIZED-APP',
        isInitializedApp
    } as const
)

//types
export type InitialStateType = {
    status: RequestStatusType
    errorMessage: string | null
    isInitializedApp: boolean
}
type RequestStatusType = 'idle' | 'loading' | 'successed' | 'failed'
type ActionsType =
    | SetAppStatusACType
    | SetAppErrorACType
    | SetInitializedAppACType
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetInitializedAppACType = ReturnType<typeof setInitializedAppAC>


//create saga Action

