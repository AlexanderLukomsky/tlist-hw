import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { authAPI, AuthMeResponseType, AuthResponseType } from '../api/auth-api';
import { ResultCodeType } from '../api/instance';
import { setIsLoggedInAC } from '../features/auth/auth-reducer';
import { handleServerNetworkError } from '../store/utils/utils';
import { setInitializedAppAC } from './app-reducer';

function* initializeAppWorker() {
    try {
        const res: AxiosResponse<AuthResponseType<AuthMeResponseType>> =
            yield call(authAPI.authMe);
        if (res.data.resultCode === ResultCodeType.Ok) {
            yield put(setIsLoggedInAC({ value: true }));
        }
        yield put(setInitializedAppAC({ isInitializedApp: true }));
    } catch (err: any) {
        yield handleServerNetworkError(err.message);
    }
}

export const initializeApp = () => ({
    type: 'App/initialize-app'
});

export function* appWatcherSaga() {
    yield takeEvery('App/initialize-app', initializeAppWorker);
}
