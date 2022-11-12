import { AxiosResponse } from 'axios';
import { authAPI, authMeResponseType } from './../api/auth-api';
import { ResponseType, ResultCodeType } from './../api/instance';
import { setInitializedAppAC } from './app-reducer';
import { setIsLoggedInAC } from './../store/reducers/auth-reducer';
import { call, put, takeEvery } from 'redux-saga/effects';
//create saga worker
export const initializedApp = () => ({ type: 'APP/INITIALIZE-APP' } as const)
export function* setInitializedAppWorkerSaga() {
   const res: AxiosResponse<ResponseType<authMeResponseType>> = yield call(authAPI.authMe)
   if (res.data.resultCode === ResultCodeType.Ok) {
      yield put(setIsLoggedInAC(true))
   }
   yield put(setInitializedAppAC(true))
}
export function* appWatcherSagas() {
   yield takeEvery('APP/INITIALIZE-APP', setInitializedAppWorkerSaga)
}