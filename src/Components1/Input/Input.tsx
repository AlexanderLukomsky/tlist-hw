import { ChangeEvent, KeyboardEvent } from "react"

type InputType = {
    onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    value: string
}
export const Input = ({ onKeyPress, onChange, value, ...props }: InputType) => {
    return (
        <>
            <input value={value} onKeyPress={onKeyPress} onChange={onChange} type="text" />
        </>
    )
}