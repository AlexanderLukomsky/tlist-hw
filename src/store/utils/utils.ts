import { Dispatch } from "redux"
import { ResponseType } from "../../api/instance"
import { setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType } from "../reducers/app-reducer"



export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorACType | SetAppStatusACType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({ errorMessage: data.messages[0] }))
    } else {
        dispatch(setAppErrorAC({ errorMessage: 'some error' }))
    }
    dispatch(setAppStatusAC({ status: 'failed' }))
}
export const handleServerNetworkError = (message: string, dispatch: Dispatch<SetAppErrorACType | SetAppStatusACType>) => {
    if (message) {
        dispatch(setAppErrorAC({ errorMessage: message }))
    } else {
        dispatch(setAppErrorAC({ errorMessage: 'some error' }))
    }
    dispatch(setAppStatusAC({ status: 'failed' }))
}