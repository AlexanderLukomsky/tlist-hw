import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "../Button/Buttons"

type AddItemPropsType = {
    callback: (title: string) => void
    disabled: boolean
    convertInput?: boolean
}

export const AddItem = ({ disabled, ...props }: AddItemPropsType) => {
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [convertToTextarea, setConvertToTextarea] = useState<boolean>(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
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
    const onEnterPress = (e: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLTextAreaElement>) => {
        if (!!error) setError('')
        e.key === 'Enter' && addItem()
    }
    const style = {
        opacity: disabled ? '0.3' : '1',
    }
    const consvertStyleAddItem = {
        position: 'relative' as 'relative'
    }
    const consvertStyleButton = {
        position: 'absolute' as 'relative',
        bottom: '-20px',
        left: '0',
    }
    return props.convertInput ?
        (
            <>
                <div className="addItem" style={consvertStyleAddItem}>
                    <div>
                        <button style={consvertStyleButton} onClick={() => { setConvertToTextarea(!convertToTextarea) }}>
                            {!convertToTextarea ? `big text` : `small text`}

                        </button>
                    </div>
                    {
                        !convertToTextarea ?
                            <input placeholder={error}
                                style={{ ...style }} className="addItem__value" type="text" value={value} onChange={onChangeHandler} onKeyPress={onEnterPress} /> :
                            <textarea
                                placeholder={error}
                                style={style} className="addItem__value" value={value} onChange={onChangeHandler} onKeyPress={onEnterPress} />
                    }
                    <span className="addItem__add">
                        <Button disabled={disabled} title="" callback={addItem} />
                    </span>
                </div>
            </>
        )
        :
        (
            <>
                <div className="addItem">
                    <input style={style} className="addItem__value" type="text" value={value} onChange={onChangeHandler} onKeyPress={onEnterPress} />
                    <span className="addItem__add">
                        <Button disabled={disabled} title="" callback={addItem} />
                    </span>
                </div>
                {error && <span className="addItem__error">{error}</span>}
            </>
        )

}