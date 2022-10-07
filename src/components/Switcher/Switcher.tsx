import { Button } from "@mui/material"
import { useState } from "react"
import { FilterType } from "../../common/reducers/filter-reducer"
import './switcher.scss'
type SwitcherPropsType = {
    titles: FilterType[]
    callback: (selectedValue: FilterType) => void
    selectedValue?: string
}
export const Switcher: React.FC<SwitcherPropsType> = (
    props
) => {
    const [selectedValue, setSelectedValue] = useState<string>(props.selectedValue ? props.selectedValue : props.titles[0])
    const changeSelectedValue = (title: FilterType) => {
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