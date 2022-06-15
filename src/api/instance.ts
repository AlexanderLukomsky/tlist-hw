import axios from "axios"
export const _instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": "1b228bfc-8734-47cb-b840-f8cc669c3e6c"
    }
})