import { setAppStatusAC, SetAppErrorACType, SetAppStatusACType } from '../../app/app-reducer';
import { authAPI } from '../../api/auth-api';
import { Dispatch } from "redux"
import { authDataType } from "../../api/auth-api"
import { ResultCodeType } from '../../api/instance';
import { handleServerAppError, handleServerNetworkError } from '../utils/utils';


const initialState: InitialStateType = {
    isLoggedIn: false
}
export const authReducer = (state: InitialStateType = initialState, action: loginActionType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET-IS-LOGGED-IN': return { ...state, isLoggedIn: action.value }
        default: return state
    }
}
//actions
export const setIsLoggedInAC = (value: boolean) => (
    {
        type: 'auth/SET-IS-LOGGED-IN',
        value
    } as const
)
//thinks
export const authTC = (data: authDataType) => (dispatch: Dispatch<ThunkDispatchActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.auth(data)
        .then(res => {
            if (res.data.resultCode === ResultCodeType.Ok) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('successed'))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setAppStatusAC('idle'))
            }
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
            dispatch(setAppStatusAC('failed'))
        })
}
export const logoutTC = () => (dispatch: Dispatch<ThunkDispatchActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === ResultCodeType.Ok) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('successed'))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
            dispatch(setAppStatusAC('failed'))
        })
}

function* auth() {

}

type InitialStateType = {
    isLoggedIn: boolean
}
type loginActionType = SetIsLoggedInACType
type ThunkDispatchActionType = SetAppErrorACType | SetAppStatusACType | SetIsLoggedInACType
type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>