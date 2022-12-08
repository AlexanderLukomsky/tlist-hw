import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//reducer
const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        }
    }
});
export const authReducer = slice.reducer;
//actions
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC;

export const actions = slice.actions;
