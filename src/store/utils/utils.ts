import { put } from 'redux-saga/effects';
import { ResponseType } from '../../api/instance';
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer';

export function* handleServerAppError<D>(data: ResponseType<D>) {
    yield put(setAppStatusAC({ status: 'failed' }));

    if (data.messages.length) {
        yield put(setAppErrorAC({ errorMessage: data.messages[0] }));
    } else {
        yield put(setAppErrorAC({ errorMessage: 'some error' }));
    }
}

export function* handleServerNetworkError(message: string) {
    yield put(setAppStatusAC({ status: 'failed' }));

    if (message) {
        yield put(setAppErrorAC({ errorMessage: message }));
    } else {
        yield put(setAppErrorAC({ errorMessage: 'some error' }));
    }
}
