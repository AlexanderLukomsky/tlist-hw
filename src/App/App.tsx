import { AppBar, Button, CircularProgress, LinearProgress, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { Login } from "../features/Login/Login";
import { TodolistsList } from "../features/TodolistsList/TodolistsList";
import { setInitializedAppTC } from "../store/reducers/app-reducer";
import { logoutTC } from "../store/reducers/auth-reducer";
import { useAppSelector } from "../store/store";

export const App: React.FC = () => {
    const status = useAppSelector(state => state.app.status)
    const isInitializedApp = useAppSelector(state => state.app.isInitializedApp)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOut = () => {
        dispatch(logoutTC())
    }

    useEffect(() => {
        dispatch(setInitializedAppTC())
        if (!isLoggedIn) {
            console.log('object');
            navigate('/login')
        }
    }, [isLoggedIn])
    if (!isInitializedApp) {
        return <div style={{ position: 'absolute', top: '50%', left: '50%', right: '50%' }}>
            <CircularProgress color="secondary" style={{ width: '70px', height: '70px' }} />
        </div>
    }


    return (
        <div className='App'>
            <AppBar position="static" className="header" color="transparent">
                <Toolbar >
                    <div className="header__container container">
                        {isLoggedIn && <Button
                            onClick={logOut}
                            variant="outlined"
                            color="success" size="large"
                            style={{ fontWeight: '700', color: 'yellowgreen' }}
                        >
                            LogOut
                        </Button>}
                    </div>
                </Toolbar>
                {
                    status === 'loading' && <div className="progressbar">
                        <LinearProgress color="success" sx={{ height: '6px' }} />
                    </div>
                }
            </AppBar>
            <div className={`container`}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/todolists" element={<TodolistsList />} />
                    <Route path="/" element={<Navigate to="/todolists" />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
            <ErrorSnackbar />
        </div>
    );
}
