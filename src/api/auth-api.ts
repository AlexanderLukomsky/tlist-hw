import { ResponseType, ResultCodeType, _instance } from "./instance"

export const authAPI = {
    auth(data: authDataType) {
        return _instance.post<authResponseType<{ userId?: number }>>('auth/login', data)
    },
    authMe() {
        return _instance.get<ResponseType<authMeResponseType>>('auth/me')
    },
    logout() {
        return _instance.delete<ResponseType<{}>>('/auth/login')
    }

}

//types
type authMeResponseType = {
    id: number
    email: string
    login: string
}
export type authDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
type authResponseType<D> = {
    resultCode: ResultCodeType
    messages: string[],
    data: D
}