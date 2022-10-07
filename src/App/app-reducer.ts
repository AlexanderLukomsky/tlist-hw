import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
type RequestStatusType = 'idle' | 'loading' | 'successed' | 'failed'
