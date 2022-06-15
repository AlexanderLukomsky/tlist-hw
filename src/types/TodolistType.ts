type TodolistFilterType = 'all' | 'active' | 'completed'
export type TodolistResponseType = {
    id: string
    title: string,
    addedDate: string,
    order: number
}
export type TodolistType = TodolistResponseType & {
    id: string
    title: string,
    addedDate: string,
    order: number
    filter: TodolistFilterType
}