import './changeableTitle.scss'
import { IconButton, TextField } from "@mui/material"
import { useState, KeyboardEvent } from "react"
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
type PropsType = {
    title: string
    callback: (value: string) => void
    disabled?: boolean
}
export const ChangeableTitle = ({ disabled = false, ...props }: PropsType) => {
    const [changeMode, setChangeMod] = useState<boolean>(false)
    const [value, setValue] = useState<string>(props.title || '')
    const [error, setError] = useState<string>('')
    const activateChangeMode = (changeMode: boolean) => {
        !changeMode && setChangeMod(!changeMode)

    }
    const setChangedValue = () => {
        if (value.trim() !== "") {
            props.callback(value.trim())
            setChangeMod(!changeMode)
            return
        }
        setError('Title is required')

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!!error) setError('')
        e.key === 'Enter' && setChangedValue()
    }
    return (
        <span className="changeableTitle" onDoubleClick={() => activateChangeMode(changeMode)}>
            {
                changeMode ?
                    <div className="changeMode">
                        <div className="input-wrapper">
                            <TextField
                                value={value}
                                disabled={disabled}
                                onKeyPress={onKeyPressHandler}
                                onChange={(e) => { setValue(e.currentTarget.value) }}
                                label={error}
                                autoFocus
                                focused
                                variant="standard"
                                className={`input ${error ? 'error' : ''}`}
                            />
                        </div>
                        <div>
                            <IconButton disabled={disabled} onClick={setChangedValue} className="button" >
                                <AddBoxOutlinedIcon />
                            </IconButton>
                        </div>
                    </div> :
                    <span className="title">
                        <span>
                            {props.title}
                        </span>
                    </span>
            }
        </span>
    )
}