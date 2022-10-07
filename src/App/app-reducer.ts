import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleServerNetworkError } from '../store/utils/utils';
import { authAPI } from "../api/auth-api"
import { ResultCodeType } from "../api/instance"
import { setIsLoggedInAC } from "../features/auth/auth-reducer"
import { AppThunk } from '../store/store';

//initial state
const initialState: InitialStateType = {
    status: 'idle',
    errorMessage: null,
    isInitializedApp: false
}

//reducer
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppErrorAC: (state, action: PayloadAction<{ errorMessage: string | null }>) => {
            state.errorMessage = action.payload.errorMessage
        },
        setInitializedAppAC: (state, action: PayloadAction<{ isInitializedApp: boolean }>) => {
            state.isInitializedApp = action.payload.isInitializedApp
        }
    }
})
export const appReducer = slice.reducer
//actions
export const { setAppStatusAC, setAppErrorAC, setInitializedAppAC } = slice.actions
//thunks
export const setInitializedAppTC = (): AppThunk => (dispatch) => {
    authAPI.authMe()
        .then(res => {
            if (res.data.resultCode === ResultCodeType.Ok) {
                dispatch(setIsLoggedInAC({ value: true }))
            }
            dispatch(setInitializedAppAC({ isInitializedApp: true }))
        }).catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
}
//types
export type InitialStateType = {
    status: RequestStatusType
    errorMessage: string | null
    isInitializedApp: boolean
}
type RequestStatusType = 'idle' | 'loading' | 'successed' | 'failed'
