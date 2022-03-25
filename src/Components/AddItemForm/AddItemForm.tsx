import { KeyboardEvent } from "react"
import { useState } from "react"
import { Button } from "../Button/Button"
import { Input } from "../Input/Input"
import style from '../Todolist/Todolist.module.css'
type AddItemFormType = {
    callback: (title: string) => void
}
export const AddItemForm = (props: AddItemFormType) => {
    const [error, setError] = useState<null | string>('')
    const [titleValue, setTitleValue] = useState('')
    const onClickHandler = () => {
        if (titleValue.trim() !== "") {
            props.callback(titleValue)
            setTitleValue('')
            return
        }
        setError('Title is required')
        setTitleValue('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        e.key === 'Enter' && onClickHandler()
    }
    return (
        <div>
            <div>
                <span className={error ? style.error : ''}>
                    <Input value={titleValue} onKeyPress={onKeyPressHandler} onChange={(e) => { setTitleValue(e.currentTarget.value) }} />
                </span>
                <Button callback={onClickHandler} title='+' />
            </div>
            {error && <span className={style.error_message}>{error}</span>}
        </div>
    )
}
