import { useState } from "react"
import { Button } from "../Button/Buttons"
type ThemePropsType = {
    callback: (theme: 'white' | 'dark') => void
    theme: 'white' | 'dark'
}
export const Theme = ({ theme, callback, ...props }: ThemePropsType) => {
    const changeTheme = () => {
        callback(theme === 'white' ? 'dark' : 'white')
    }
    return (
        <>
            <Button title={theme === 'white' ? 'Dark' : 'White'} callback={changeTheme}></Button>
        </>
    )
}