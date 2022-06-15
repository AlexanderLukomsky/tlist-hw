import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AddItem } from "../../../components/AddItem/AddItem"
import { Button } from "../../../components/Buttons"
import { ConvertTitle } from "../../../components/ConvertTitle/ConvertTitle"
import { Switcher } from "../../../components/Switcher"
import { createTaskTC, deleteTaskTC, fetchTasksTC, updateTaskTC } from "../../../store/reducers/task-reducer"
import { changeTodolistTitleTC } from "../../../store/reducers/todolist-reducer"
import { TaskStatus, TaskType } from "../../../types/TaskType"
import { Task } from "./Task/Task"
type FilterValueType = 'all' | 'active' | 'completed'
type TodolistPropsType = {
    todolistID: string
    tasks: TaskType[]
    todoTitle: string
}
export const Todolist: React.FC<TodolistPropsType> = React.memo((props: TodolistPropsType) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(props.todolistID))
    }, [])
    const [filterValue, setFilterValue] = useState<FilterValueType>('all')
    //dispatch todolist TC
    const changeTodolistTitle = (payload: { title: string, todolistID: string }) => {
        dispatch(changeTodolistTitleTC(payload))
    }
    //dispatch task TC
    const createTask = (title: string) => {
        dispatch(createTaskTC({ todolistID: props.todolistID, title }))
    }
    const deleteTask = (payload: { todolistID: string, taskID: string }) => {
        dispatch(deleteTaskTC(payload))
    }
    const changeTaskStatus = (payload: { todolistID: string, taskID: string, status: boolean }) => {
        const convertStatusToTaskStatusType = payload.status ? TaskStatus.Completed : TaskStatus.NotCompleted
        dispatch(updateTaskTC({ todolistID: payload.todolistID, taskID: payload.taskID, taskModel: { status: convertStatusToTaskStatusType } }))
    }
    const changeTaskTitle = (payload: { todolistID: string, taskID: string, taskModel: { title: string } }) => {
        dispatch(updateTaskTC(payload))
    }
    //filter
    const changeFilter = (filterValue: string) => {
        switch (filterValue) {
            case 'all': setFilterValue(filterValue); break
            case 'active': setFilterValue(filterValue); break
            case 'completed': setFilterValue(filterValue); break
            default: return
        }
    }
    const sortedTask = (tasks: TaskType[], filterValue: FilterValueType) => {
        switch (filterValue) {
            case 'active': return tasks.filter(t => t.status === TaskStatus.NotCompleted)
            case 'completed': return tasks.filter(t => t.status !== TaskStatus.NotCompleted)
            default: return tasks
        }
    }

    return (
        <div className="todolist-wrapper">
            <div className="todolist">
                <div className="todolist__title">
                    <ConvertTitle title={props.todoTitle} callback={(title) => changeTodolistTitle({ title, todolistID: props.todolistID })} />
                </div>
                <div className="todolist__addItem">
                    <AddItem callback={createTask} />
                </div>
                <ul className="todolist__tasks">
                    {
                        sortedTask(props.tasks, filterValue).map(task =>
                            <li className="todolist__task task" key={task.id}>
                                <Task
                                    task={task}
                                    deleteTask={deleteTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    key={task.title}
                                />
                            </li>
                        )
                    }
                </ul>
                <div className="todolist__filter">
                    <Switcher titles={['all', 'active', 'completed']} callback={changeFilter} />
                </div>
            </div>
        </div>

    )
})