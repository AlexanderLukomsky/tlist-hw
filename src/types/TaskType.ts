export type TasksStateType = {
    [key: string]: TaskType[]
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export enum TaskStatus {
    NotCompleted = 0,
    Completed = 2,
}
export enum TaskPriority {
    Low = 0,
    Middle = 1,
    Hight = 2
}
export enum ResultCodeType {
    Ok = 0,
    Failed = 1
}
export type CreateTaskResponseType<D> = {
    resultCode: ResultCodeType
    messages: string,
    data: D
}
export type UpdateTaskOptionalPropertiesType = {
    title?: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriority
    startDate?: string
    deadline?: string
}
export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
}