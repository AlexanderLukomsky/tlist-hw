import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "../Buttons"

type AddItemPropsType = {
    callback: (title: string) => void
}

export const AddItem = (props: AddItemPropsType) => {
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string>('')
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
        <>
            <div className="addItem">
                <input className="addItem__value" type="text" value={value} onChange={onChangeHandler} onKeyPress={onEnterPress} />
                <span className="addItem__add">
                    <Button title="" callback={addItem} />
                </span>
            </div>
            {error && <span className="addItem__error">{error}</span>}
        </>
    )
}