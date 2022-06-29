import axios from "axios"
export const _instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": "1b228bfc-8734-47cb-b840-f8cc669c3e6c"
    }
})

export type ResponseType<D> = {
    data: D
    resultCode: ResultCodeType;
    messages: string[];
}
export enum ResultCodeType {
    Ok = 0,
    Failed = 1
}