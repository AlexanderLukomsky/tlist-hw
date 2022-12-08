import {
    AppBar,
    Button,
    CircularProgress,
    LinearProgress,
    Toolbar
} from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { logoutTC } from '../features/auth/auth-reducer';
import { Login } from '../features/auth/Login';
import { selectIsLoggedIn } from '../features/auth/selectors';
import { useAppDispatch } from '../store/store';
import { Todolists } from './../features/todolists/Todolists';
import { initializeApp } from './app-sagas';

import { selectAppStatus, selectIsInitializedApp } from './selectors';

export const App: React.FC = () => {
    const status = useSelector(selectAppStatus);
    const isInitializedApp = useSelector(selectIsInitializedApp);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const dispatch = useAppDispatch();
    const logOut = () => {
        dispatch(logoutTC());
    };
    useEffect(() => {
        if (!isInitializedApp) {
            dispatch(initializeApp());
        }
    }, [dispatch, isInitializedApp]);

    if (!isInitializedApp) {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    right: '50%'
                }}
            >
                <CircularProgress
                    color="secondary"
                    style={{ width: '70px', height: '70px' }}
                />
            </div>
        );
    }
    return (
        <div className="App">
            <AppBar position="static" className="header" color="transparent">
                <Toolbar>
                    <div className="header__container container">
                        {isLoggedIn && (
                            <Button
                                onClick={logOut}
                                variant="outlined"
                                color="success"
                                size="large"
                                style={{
                                    fontWeight: '700',
                                    color: 'yellowgreen'
                                }}
                            >
                                LogOut
                            </Button>
                        )}
                    </div>
                </Toolbar>
                {status === 'loading' && (
                    <div className="progressbar">
                        <LinearProgress
                            color="success"
                            sx={{ height: '6px' }}
                        />
                    </div>
                )}
            </AppBar>
            <div className={`container`}>
                <Routes>
                    <Route path={'/todolists'} element={<Todolists />} />
                    <Route path={'/'} element={<Todolists />} />
                    <Route path="login" element={<Login />} />
                    <Route
                        path="404"
                        element={
                            <h1
                                style={{
                                    fontSize: '36px',
                                    textAlign: 'center'
                                }}
                            >
                                404
                            </h1>
                        }
                    />
                    <Route path="*" element={<Navigate to="404" />} />
                </Routes>
            </div>
            <ErrorSnackbar />
        </div>
    );
};
