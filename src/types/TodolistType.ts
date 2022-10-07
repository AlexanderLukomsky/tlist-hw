import { FilterType } from '../common/reducers/filter-reducer';
export type TodolistType = TodolistResponseType & {
    id: string
    title: string,
    addedDate: string,
    order: number
    filter: FilterType,
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