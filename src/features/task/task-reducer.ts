import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TasksStateType, TaskType, UpdateTaskOptionalPropertiesType } from '../../types/TaskType';
import { TodolistResponseType } from '../../types/TodolistType';
import { deleteTodolistAC, setTodolists } from '../todolists/todolist-reducer';
import { createTodolistAC } from './../todolists/todolist-reducer';

//reducer
const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
        setTasksAC: (state, action: PayloadAction<{ todolistID: string, tasks: TaskType[] }>) => {
            state[action.payload.todolistID] = action.payload.tasks
        },
        createTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        deleteTaskAC: (state, action: PayloadAction<{ todolistID: string, taskID: string }>) => {
            const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
            state[action.payload.todolistID].splice(index, 1)
        },
        updateTaskAC: (state, action: PayloadAction<{ todolistID: string, taskID: string, taskModel: UpdateTaskOptionalPropertiesType }>) => {
            const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
            state[action.payload.todolistID][index] = { ...state[action.payload.todolistID][index], ...action.payload.taskModel }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setTodolists, (state, action) => {
            action.payload.todolists.forEach((t: TodolistResponseType) => state[t.id] = [])
        })
        builder.addCase(createTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.todolistID]
        })
    }
})
export const taskReducer = slice.reducer

//actions
export const { setTasksAC, createTaskAC, deleteTaskAC, updateTaskAC } = slice.actions



