import { handleServerNetworkError } from '../store/utils/utils';
import { authAPI } from "../api/auth-api"
import { ResultCodeType } from "../api/instance"
import { setIsLoggedInAC } from "../features/auth/auth-reducer"
import { AppThunk } from '../store/store';
import { setInitializedAppAC } from './app-reducer';

//thunks
export const setInitializedAppTC = (): AppThunk => (dispatch) => {
   authAPI.authMe()
      .then(res => {
         if (res.data.resultCode === ResultCodeType.Ok) {
            dispatch(setIsLoggedInAC({ value: true }))
         }
         dispatch(setInitializedAppAC({ isInitializedApp: true }))
      }).catch(error => {
         handleServerNetworkError(error.message, dispatch)
      })
}