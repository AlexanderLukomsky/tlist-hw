import { useState, KeyboardEvent, FocusEvent, MouseEvent, useRef, RefObject } from "react"
import { Button } from "../Button/Buttons"
type ConvertTitlePropsType = {
    title: string
    callback: (value: string) => void
    disabled?: boolean
}
export const ConvertTitle = ({ disabled = false, ...props }: ConvertTitlePropsType) => {
    const [changeMode, setChangeMod] = useState<boolean>(false)
    const [value, setValue] = useState<string>(props.title || '')
    const [error, setError] = useState<string>('')
    const activateChangeMode = () => {
        setChangeMod(!changeMode)
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
        <span className="convertTitle" onDoubleClick={activateChangeMode}>
            {
                changeMode ?
                    <span className="convertTitle__changeMode">
                        <input disabled={disabled} className="convertTitle__input" type="text" value={value}
                            placeholder={error}
                            autoFocus
                            onKeyPress={onKeyPressHandler}
                            onChange={(e) => { setValue(e.currentTarget.value) }}
                        />
                        <Button disabled={disabled} title="+" callback={setChangedValue} className="convertTitle__button" />
                    </span> :
                    <span className="convertTitle__title">
                        <span>
                            {props.title}
                        </span>
                    </span>
            }
        </span>
    )
}