import { useState } from "react";
import { Theme } from "./components/Theme/Theme";
import { TodolistsList } from "./features/TodolistsList/TodolistsList";

export const App: React.FC = () => {
    const [theme, setTheme] = useState<'white' | 'dark'>('white')
    return (
        <div className={`App ${theme}`}>
            <div className={`container`}>
                <Theme callback={setTheme} theme={theme} />
                <div>
                    <TodolistsList />
                </div>
            </div>
        </div>
    );
}
