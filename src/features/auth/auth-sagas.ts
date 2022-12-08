import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { authAPI, authDataType, AuthResponseType } from '../../api/auth-api';
import { ResponseType, ResultCodeType } from '../../api/instance';
import { setAppStatusAC } from '../../app/app-reducer';
import {
    handleServerAppError,
    handleServerNetworkError
} from '../../store/utils/utils';
import { setIsLoggedInAC } from './auth-reducer';

export const login = (data: authDataType) => ({ type: 'auth/login', data });

function* loginWorker(action: ReturnType<typeof login>) {
    try {
        yield put(setAppStatusAC({ status: 'loading' }));
        const res: AxiosResponse<AuthResponseType<{ userId?: number }>> =
            yield call(authAPI.auth, action.data);
        if (res.data.resultCode === ResultCodeType.Ok) {
            yield put(setIsLoggedInAC({ value: true }));
            yield put(setAppStatusAC({ status: 'succeeded' }));
        } else {
            yield handleServerAppError(res.data);
            yield put(setAppStatusAC({ status: 'idle' }));
        }
    } catch (error: any) {
        yield handleServerNetworkError(error.message);
    }
}

export const logout = () => ({ type: 'auth/logout' });

export function* logoutWorker() {
    try {
        yield put(setAppStatusAC({ status: 'loading' }));
        const res: AxiosResponse<ResponseType<{}>> = yield call(authAPI.logout);
        if (res.data.resultCode === ResultCodeType.Ok) {
            yield put(setIsLoggedInAC({ value: false }));
            yield put(setAppStatusAC({ status: 'succeeded' }));
        } else {
            yield handleServerAppError(res.data);
        }
    } catch (error: any) {
        yield handleServerNetworkError(error.message);
    }
}

export function* loginWatcherSaga() {
    yield takeEvery('auth/login', loginWorker);
    yield takeEvery('auth/logout', logoutWorker);
}
