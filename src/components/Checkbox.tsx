import { ChangeEvent } from "react"

type CheckboxPropsType = {
    checked: boolean
    onChange: (status: boolean) => void
}
export const Checkbox = ({ checked, onChange, ...props }: CheckboxPropsType) => {
    return (
        <span className="checkbox">
            <input checked={checked} type="checkbox" onChange={(e) => { onChange(e.currentTarget.checked) }} />
        </span>
    )
}