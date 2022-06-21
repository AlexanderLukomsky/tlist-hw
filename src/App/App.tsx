import { useState } from "react";
import { ErrorSnackbar } from "../components/Snackbar/ErrorSnackbar";
import { Theme } from "../components/Theme/Theme";
import { TodolistsList } from "../features/TodolistsList/TodolistsList";
import { useAppSelector } from "../store/store";

export const App: React.FC = () => {
    const [theme, setTheme] = useState<'white' | 'dark'>('dark')
    const status = useAppSelector(state => state.app.error)
    return (
        <div className={`App ${theme}`}>
            <div className={`container`}>
                <Theme callback={setTheme} theme={theme} />
                <div>
                    <TodolistsList />
                </div>
            </div>
            <ErrorSnackbar status={status} />
        </div>
    );
}
