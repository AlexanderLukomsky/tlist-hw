import { useState, KeyboardEvent } from "react"
type ConvertTitlePropsType = {
    title: string
    callback: (value: string) => void
}
export const ConvertTitle = (props: ConvertTitlePropsType) => {
    const [changeMode, setChangeMod] = useState<boolean>(false)
    const [value, setValue] = useState<string>(props.title || '')
    const activateChangeMode = () => {
        setChangeMod(!changeMode)
    }
    const setChangedValue = () => {
        props.callback(value)
        setChangeMod(!changeMode)
    }
    const setChangedValueEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && setChangedValue()
    }
    return (
        <span className="convertTitle" onDoubleClick={activateChangeMode}>
            {
                changeMode ?
                    <span className="convertTitle__changeMode">
                        <input type="text" value={value} autoFocus
                            onBlur={() => { setChangeMod(!changeMode) }}
                            onKeyPress={setChangedValueEnterPress}
                            onChange={(e) => { setValue(e.currentTarget.value) }}
                        />
                        <button onClick={setChangedValue}>+</button>
                    </span> :
                    <span className="convertTitle__title" onDoubleClick={activateChangeMode}>
                        <span>
                            {props.title}
                        </span>
                    </span>
            }
        </span>
    )
}