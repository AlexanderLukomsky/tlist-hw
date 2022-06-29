import axios from "axios"
import { TodolistAPIType, TodolistResponseType } from "../types/TodolistType"
import { ResponseType, _instance } from "./instance"
export const todolist_api = {
    _instance: axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        headers: {
            "API-KEY": "1b228bfc-8734-47cb-b840-f8cc669c3e6c"
        }
    }),
    getTodolist: () => {
        return _instance.get<TodolistResponseType[]>('todo-lists')
    },
    changeTitle: (payload: { todolistID: string, title: string }) => {
        return _instance.put<ResponseType<{ data: TodolistResponseType[] }>>(`todo-lists/${payload.todolistID}`, { title: payload.title })
    },
    deleteTodolist: (todolistID: string) => {
        return _instance.delete(`todo-lists/${todolistID}`)
    },
    createTodolist: (title: string) => {
        return _instance.post<TodolistAPIType>('todo-lists', { title })
    }
}