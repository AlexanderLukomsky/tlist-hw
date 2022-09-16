import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './../store';
import { setAppStatusAC, SetAppErrorACType, SetAppStatusACType } from './app-reducer';
import { authAPI } from '../../api/auth-api';
import { Dispatch } from "redux"
import { authDataType } from "../../api/auth-api"
import { ResultCodeType } from '../../api/instance';
import { handleServerAppError, handleServerNetworkError } from '../utils/utils';


const initialState: InitialStateType = {
    isLoggedIn: false
}
//reducer
const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})
export const authReducer = slice.reducer
//actions
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC
//thinks
export const authTC = (data: authDataType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    authAPI.auth(data)
        .then(res => {
            if (res.data.resultCode === ResultCodeType.Ok) {
                dispatch(setIsLoggedInAC({ value: true }))
                dispatch(setAppStatusAC({ status: 'successed' }))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setAppStatusAC({ status: 'idle' }))
            }
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
            dispatch(setAppStatusAC({ status: 'failed' }))
        })
}
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === ResultCodeType.Ok) {
                dispatch(setIsLoggedInAC({ value: false }))
                dispatch(setAppStatusAC({ status: 'successed' }))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setAppStatusAC({ status: 'failed' }))
            }
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
            dispatch(setAppStatusAC({ status: 'failed' }))
        })
}
type InitialStateType = {
    isLoggedIn: boolean
}
export type AuthReducerActionType = ReturnType<typeof setIsLoggedInAC>
