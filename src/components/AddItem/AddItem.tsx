import AddTaskSharpIcon from '@mui/icons-material/AddTaskSharp';
import { IconButton, TextField } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import './addItem.scss';

type AddItemPropsType = {
    callback: (title: string) => void
    disabled: boolean
}

export const AddItem = ({ disabled, ...props }: AddItemPropsType) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const addItem = () => {
        if (value.trim() !== "") {
            props.callback(value.trim())
            setValue('')
            return
        }
        setError('Title is required')
        setValue('')
    }
    const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!!error) setError('')
        e.key === 'Enter' && addItem()
    }
    return (
        <div className="addItem">
            <TextField
                disabled={disabled}
                value={value}
                onChange={onChangeHandler} onKeyPress={onEnterPress}
                className="addItem-value"
                color={error ? 'error' : 'info'}
                focused
                size='medium'
                label={error}
            />
            <span className="addItem__add">
                <IconButton disabled={disabled} onClick={addItem} >
                    <AddTaskSharpIcon className="addItem__add-icon" />
                </IconButton>
            </span>
        </div>
    )
}