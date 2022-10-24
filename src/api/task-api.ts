import { TaskType, UpdateTaskType } from "../types/TaskType"
import { ResponseType, _instance } from "./instance"
export const task_api = {
    getTask: (todolistID: string) => {
        return _instance.get<{ items: TaskType[] }>(`todo-lists/${todolistID}/tasks`)
    },
    createTask: (payload: { todolistID: string, title: string }) => {
        return _instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${payload.todolistID}/tasks`, { title: payload.title })
    },
    deleteTask: (payload: { todolistID: string, taskID: string }) => {
        return _instance.delete(`todo-lists/${payload.todolistID}/tasks/${payload.taskID}`)
    },
    updateTask: (payload: { todolistID: string, taskID: string, task: UpdateTaskType }) => {
        return _instance.put(`todo-lists/${payload.todolistID}/tasks/${payload.taskID}`, payload.task)
    }

}