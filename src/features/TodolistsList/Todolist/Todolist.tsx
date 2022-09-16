import { Delete } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import React, { MouseEvent, useEffect, useState } from "react"
import { AddItem } from "../../../components/AddItem/AddItem"
import { ChangeableTitle } from "../../../components/ChangeableTitle/ChangeableTitle"
import { Switcher } from "../../../components/Switcher/Switcher"
import { createTaskTC, deleteTaskTC, fetchTasksTC, updateTaskTC } from "../../../store/reducers/task-reducer"
import { changeTodolistTitleTC, deleteTodolistTC } from "../../../store/reducers/todolist-reducer"
import { TaskStatus, TaskType } from "../../../types/TaskType"
import { TodolistType } from "../../../types/TodolistType"
import { Task } from "./Task/Task"
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useAppDispatch } from "../../../store/store"
type FilterValueType = 'all' | 'active' | 'completed'
type TodolistPropsType = {
    todolist: TodolistType
    tasks: TaskType[]
}
export const Todolist: React.FC<TodolistPropsType> = React.memo(({ todolist, ...props }: TodolistPropsType) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(todolist.id))
    }, [])
    const [filterValue, setFilterValue] = useState<FilterValueType>('all')
    //dispatch todolist TC
    const changeTodolistTitle = (payload: { title: string, todolistID: string }) => {
        dispatch(changeTodolistTitleTC(payload))
    }
    const deleteTodolist = (todolistID: string) => {
        dispatch(deleteTodolistTC(todolistID))
    }
    //dispatch task TC
    const createTask = (title: string) => {
        dispatch(createTaskTC({ todolistID: todolist.id, title }))
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
    const disabledTodo = todolist.requestStatus === 'loading'
    return (
        <div className="todolist-wrapper">
            <div className="todolist">
                <div className="todolist__delete delete-button ">
                    <IconButton
                        size="large"
                        disabled={disabledTodo}
                        onClick={() => { deleteTodolist(todolist.id) }}>
                        <HighlightOffOutlinedIcon color={disabledTodo ? 'action' : 'error'} />
                    </IconButton>
                </div>
                <div className="todolist__title">
                    <ChangeableTitle disabled={disabledTodo} title={todolist.title} callback={(title) => changeTodolistTitle({ title, todolistID: todolist.id })} />
                </div>
                <AddItem callback={createTask} disabled={disabledTodo} />
                <ul className="todolist__tasks">
                    {
                        sortedTask(props.tasks, filterValue).map(task =>
                            <Task
                                todolistRequestStatus={disabledTodo}
                                task={task}
                                deleteTask={deleteTask}
                                changeTaskStatus={changeTaskStatus}
                                changeTaskTitle={changeTaskTitle}
                                key={task.id}
                            />
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