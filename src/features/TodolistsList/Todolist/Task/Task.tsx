import { useState } from "react"

type TaskPropsType = {
    task: { title: string, isDone: boolean }
}
export const Task: React.FC<TaskPropsType> = (props) => {
    const [checked, setChecked] = useState<boolean>(props.task.isDone)
    return (
        <div>
            <input type="checkbox" checked={checked} onChange={() => { setChecked(!checked) }} />
            {props.task.title}
            <button>delete </button>
        </div>
    )
}