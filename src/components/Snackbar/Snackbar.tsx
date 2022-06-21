import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setErrorAC } from "../../store/reducers/app-reducer"

export const Snackbar = ({ message, timeOut, errorClass = '' }: SnackbarType) => {
    const dispatch = useDispatch()
    const closeMessage = () => {
        dispatch(setErrorAC(null))
    }
    useEffect(() => {
        const timeOutID = setTimeout(closeMessage, timeOut);
        return () => {
            clearTimeout(timeOutID)
        }
    }, [])
    return (
        <div className={`snackbar ${errorClass}`}>
            <div className="snackbar__text">
                {message}
            </div>
            <div className="snackbar__close">
                <button className="snackbar__button"
                    onClick={closeMessage}
                />
            </div>
        </div>
    )
}
type SnackbarType = {
    message: string | null
    errorClass?: 'error' | '',
    timeOut: number
    children?: any
}