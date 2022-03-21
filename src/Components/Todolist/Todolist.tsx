import { ChangeEvent, useState, KeyboardEvent } from "react"
import { Button } from "../Button/Button"
import { Input } from "../Input/Input"
import style from './Todolist.module.css'
export type TodolistType = {
    todolistID: string
    title: string
    filter: FilterType
}
export type FilterType = 'all' | 'active' | 'completed'
type TasksPropsType = {
    taskID: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    todolistID: string
    tasks: TasksPropsType[]
    title: string
    filterValue: FilterType
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    deleteTask: (todolistID: string, taskID: string) => void
    changeFilter: (todolistID: string, filter: FilterType) => void
    deleteTodlist: (todolistID: string) => void
}
export const Todolist = (props: TodolistPropsType) => {
    const [error, setError] = useState<null | string>('')
    const [titleValue, setTitleValue] = useState('')
    const addNewTask = (todolistID: string, titleValue: string) => {
        if (titleValue.trim() !== "") {
            props.addTask(todolistID, titleValue.trim())
            setTitleValue('')
            return
        }
        setError('Title is required')
        setTitleValue('')
    }
    const addNewTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        e.key === 'Enter' && addNewTask(props.todolistID, titleValue)
    }
    const changeFilter = (todolistID: string, filter: FilterType) => {
        props.changeFilter(todolistID, filter)
    }
    const filteredTask = (tasks: TasksPropsType[], filter: FilterType) => {
        switch (filter) {
            case 'active': return tasks.filter(t => !t.isDone)
            case 'completed': return tasks.filter(t => t.isDone)
            default: return tasks
        }
    }
    return (
        <div>
            <h3>{props.title} <button onClick={() => { props.deleteTodlist(props.todolistID) }}>X</button> </h3>
            <div>
                <span className={error ? style.error : ''}>
                    <Input value={titleValue} onKeyPress={addNewTaskKeyPress} onChange={(event) => { setTitleValue(event.currentTarget.value) }} />
                </span>
                <button onClick={() => { addNewTask(props.todolistID, titleValue) }}>+</button>
            </div>
            {error && <span className={style.error_message}>{error}</span>}
            <ul>
                {
                    filteredTask(props.tasks, props.filterValue).map(el =>
                        <li key={el.taskID} id={el.taskID.toString()}>
                            <button onClick={() => { props.deleteTask(props.todolistID, el.taskID) }}>X</button>
                            <input type="checkbox" checked={el.isDone}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { props.changeTaskStatus(props.todolistID, el.taskID, e.currentTarget.checked) }}
                            />
                            <span>{el.title}</span>
                        </li>)
                }
            </ul>
            <div>
                <span className={props.filterValue === "all" ? style.active_filter : ''}>
                    <Button title='All' callback={() => { changeFilter(props.todolistID, 'all') }} />
                </span>
                <span className={props.filterValue === "active" ? style.active_filter : ''}>
                    <Button title='Active' callback={() => { changeFilter(props.todolistID, 'active') }} />
                </span>
                <span className={props.filterValue === "completed" ? style.active_filter : ''}>
                    <Button title='Completed' callback={() => { changeFilter(props.todolistID, 'completed') }} />
                </span>
            </div>
        </div>
    )
}