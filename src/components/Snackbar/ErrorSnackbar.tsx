import { useSelector } from "react-redux"
import { AppRootStoreType } from "../../store/store"
import { Snackbar } from "./Snackbar"
type ErrorSnackbarPropsType = {
    status: string | null
}
export const ErrorSnackbar = ({ status = null, ...props }: ErrorSnackbarPropsType) => {
    return (
        status ? < Snackbar message={status} errorClass='error' timeOut={3000} /> : <></>
    )
}

