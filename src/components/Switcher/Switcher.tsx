import { Button } from "@mui/material"
import { useState } from "react"
import './switcher.scss'
type SwitcherPropsType = {
    titles: string[]
    callback: (selectedValue: string) => void
    selectedValue?: string
}
export const Switcher: React.FC<SwitcherPropsType> = (
    props
) => {
    const [selectedValue, setSelectedValue] = useState<string>(props.selectedValue ? props.selectedValue : props.titles[0])
    const changeSelectedValue = (title: string) => {
        props.callback(title)
        setSelectedValue(title);
    }
    return (
        <ul className="switcher">
            {
                props.titles.map(title =>
                    <li key={title}
                        className={`switcher__item ${title === selectedValue ? 'active' : ''}`}>
                        <Button
                            className={title}
                            onClick={() => { changeSelectedValue(title) }}
                            size='small'
                            color="warning"
                            variant="outlined"
                        >
                            {title}
                        </Button>
                    </li>
                )
            }
        </ul>
    )
}