import { ResponseType, ResultCodeType, _instance } from "./instance";

export const authAPI = {
  auth(data: authDataType) {
    return _instance.post<AuthResponseType<{ userId?: number }>>(
      "auth/login",
      data
    );
  },
  authMe() {
    return _instance.get<ResponseType<AuthMeResponseType>>("auth/me");
  },
  logout() {
    return _instance.delete<ResponseType<{}>>("/auth/login");
  },
};

//types
export type AuthMeResponseType = {
  id: number;
  email: string;
  login: string;
};
export type authDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
export type AuthResponseType<D> = {
  resultCode: ResultCodeType;
  messages: string[];
  data: D;
};
