import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store/store";
import { setAppStatusAC } from "../../app/app-reducer";
import { authAPI } from "../../api/auth-api";
import { authDataType } from "../../api/auth-api";
import { ResultCodeType } from "../../api/instance";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../store/utils/utils";

//reducer
const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    },
  },
});
export const authReducer = slice.reducer;
//actions
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC;

//thinks
export const login = createAsyncThunk<
  any,
  authDataType,
  { rejectValue: { error: string } }
>("auth/login", async (data, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: "loading" }));
  try {
    const res = await authAPI.auth(data);
    if (res.data.resultCode === ResultCodeType.Ok) {
      dispatch(setIsLoggedInAC({ value: true }));
      dispatch(setAppStatusAC({ status: "succeeded" }));
    } else {
      handleServerAppError(res.data, dispatch);
      dispatch(setAppStatusAC({ status: "idle" }));
    }
  } catch (error: any) {
    handleServerNetworkError(error.message, dispatch);
    dispatch(setAppStatusAC({ status: "failed" }));
    return rejectWithValue({ error: "failed" });
  }
});
export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCodeType.Ok) {
        dispatch(setIsLoggedInAC({ value: false }));
        dispatch(setAppStatusAC({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
        dispatch(setAppStatusAC({ status: "failed" }));
      }
    })
    .catch((error) => {
      handleServerNetworkError(error.message, dispatch);
      dispatch(setAppStatusAC({ status: "failed" }));
    });
};
export const asyncActions = { logoutTC, login };
export const actions = slice.actions;
