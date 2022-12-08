import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    TodolistRequestStatus,
    TodolistResponseType,
    TodolistType
} from '../../types/TodolistType';

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
