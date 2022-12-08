import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResultCodeType } from '../../api/instance';
import { todolist_api } from '../../api/todolist-api';
import { setAppStatusAC } from '../../app/app-reducer';
import { AppThunk } from '../../store/store';
import {
    handleServerAppError,
    handleServerNetworkError
} from '../../store/utils/utils';
import {
    TodolistRequestStatus,
    TodolistResponseType,
    TodolistType
} from '../../types/TodolistType';
//reducer
const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistType[],
    reducers: {
        setTodolists: (
            state,
            action: PayloadAction<{ todolists: TodolistResponseType[] }>
        ) => {
            return action.payload.todolists.map((t) => ({
                ...t,
                filter: 'all',
                requestStatus: 'idle'
            }));
        },
        setNewTodolistTitle: (
            state,
            action: PayloadAction<{ todolistID: string; title: string }>
        ) => {
            const index = state.findIndex(
                (t) => t.id === action.payload.todolistID
            );
            state[index].title = action.payload.title;
        },
        deleteTodolistAC: (
            state,
            action: PayloadAction<{ todolistID: string }>
        ) => {
            const index = state.findIndex(
                (t) => t.id === action.payload.todolistID
            );
            state.splice(index, 1);
        },
        createTodolistAC: (
            state,
            action: PayloadAction<{ todolist: TodolistResponseType }>
        ) => {
            state.unshift({
                ...action.payload.todolist,
                filter: 'all',
                requestStatus: 'idle'
            });
        },
        changeTodolistRequestStatusAC: (
            state,
            action: PayloadAction<{
                todolistID: string;
                status: TodolistRequestStatus;
            }>
        ) => {
            const index = state.findIndex(
                (t) => t.id === action.payload.todolistID
            );
            state[index].requestStatus = action.payload.status;
        }
    }
});
export const todolistReducer = slice.reducer;
//actions
export const {
    setTodolists,
    setNewTodolistTitle,
    deleteTodolistAC,
    createTodolistAC,
    changeTodolistRequestStatusAC
} = slice.actions;
export const actions = slice.actions;
//thunks

const changeTodolistTitle =
    (payload: { todolistID: string; title: string }): AppThunk =>
    async (dispatch) => {
        dispatch(setAppStatusAC({ status: 'loading' }));
        dispatch(
            changeTodolistRequestStatusAC({
                todolistID: payload.todolistID,
                status: 'loading'
            })
        );
        try {
            const res = await todolist_api.changeTitle(payload);
            if (res.data.resultCode === ResultCodeType.Ok) {
                dispatch(setNewTodolistTitle(payload));
                dispatch(
                    changeTodolistRequestStatusAC({
                        todolistID: payload.todolistID,
                        status: 'successful'
                    })
                );
                dispatch(setAppStatusAC({ status: 'succeeded' }));
            } else {
                handleServerAppError(res.data, dispatch);
                dispatch(
                    changeTodolistRequestStatusAC({
                        todolistID: payload.todolistID,
                        status: 'idle'
                    })
                );
            }
        } catch (error) {
            handleServerNetworkError((error as Error).message, dispatch);
        }
    };

export const todolistAsyncActions = {
    changeTodolistTitle
};
