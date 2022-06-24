import { LinearProgress } from "@mui/material";
import { useState } from "react";
import { ErrorSnackbar } from "../components/Snackbar/ErrorSnackbar";
import { TodolistsList } from "../features/TodolistsList/TodolistsList";
import { useAppSelector } from "../store/store";

export const App: React.FC = () => {
    const error = useAppSelector(state => state.app.error)
    const status = useAppSelector(state => state.app.status)
    return (
        <div className={`App`}>
            {
                status === 'loading' && <div className="App__progressbar">
                    <LinearProgress color="success" sx={{ height: '6px' }} />
                </div>
            }

            <div className={`container`}>
                <TodolistsList />
            </div>
            <ErrorSnackbar status={error} />
        </div>
    );
}
