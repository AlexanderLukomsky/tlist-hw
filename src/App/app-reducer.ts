import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../api/auth-api';
import { ResultCodeType } from '../api/instance';
import { setIsLoggedInAC } from '../features/auth/auth-reducer';
import { AppThunk } from '../store/store';
import { handleServerNetworkError } from '../store/utils/utils';
//initial state
const initialState = {
    status: 'idle' as RequestStatusType,
    errorMessage: null as string | null,
    isInitializedApp: false
}
//reducer
const slice = createSlice({
    name: 'app',
    initialState,
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
export const asyncAction = { setInitializedAppTC }
type RequestStatusType = 'idle' | 'loading' | 'successed' | 'failed'
