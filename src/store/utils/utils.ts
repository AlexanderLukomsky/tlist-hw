import { Dispatch } from "redux"
import { ResponseType } from "../../api/instance"
import { setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType } from "../../app/app-reducer"



export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorACType | SetAppStatusACType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error'))
    }
    dispatch(setAppStatusAC('failed'))
}
export const handleServerNetworkError = (message: string, dispatch: Dispatch<SetAppErrorACType | SetAppStatusACType>) => {
    console.log('object');
    if (message) {
        dispatch(setAppErrorAC(message))
    } else {
        dispatch(setAppErrorAC('some error'))
    }
    dispatch(setAppStatusAC('failed'))
}