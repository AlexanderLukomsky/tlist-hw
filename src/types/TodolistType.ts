type TodolistFilterType = 'all' | 'active' | 'completed'

export type TodolistType = TodolistResponseType & {
    id: string
    title: string,
    addedDate: string,
    order: number
    filter: TodolistFilterType,
    requestStatus: TodolistRequestStatus
}
export type TodolistResponseType = {
    id: string
    title: string,
    addedDate: string,
    order: number
}
export type TodolistRequestStatus = 'idle' | 'loading' | 'error' | 'successful'
export type TodolistAPIType = {
    data: { item: TodolistResponseType }
    fieldsErrors: any[]
    messages: any[]
    resultCode: number
}