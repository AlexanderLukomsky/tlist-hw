import { ChangeEvent, useState, KeyboardEvent } from "react"
import { FilterType } from "../../reducer/todolistReducer"
import { AddItemForm } from "../AddItemForm/AddItemForm"
import { Button } from "../Button/Button"
import style from './Todolist.module.css'


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
    const addNewTask = (todolistID: string, title: string) => {
        props.addTask(todolistID, title.trim())
    }

    return (
        <div>
            <h3>{props.title} <button onClick={() => { props.deleteTodlist(props.todolistID) }}>X</button> </h3>
            <AddItemForm callback={(title) => { addNewTask(props.todolistID, title) }} />
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