import axios from "axios"
export const _instance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "API-KEY": process.env.REACT_APP_API_KEY as string
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