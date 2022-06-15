import { TodolistResponseType } from "../types/TodolistType"
import { _instance } from "./instance"

export const todolist_api = {
    getTodolist() {
        return _instance.get<TodolistResponseType[]>('todo-lists')
    },
    changeTitle(payload: { todolistID: string, title: string }) {
        return _instance.put(`todo-lists/${payload.todolistID}`, { title: payload.title })
    }
}