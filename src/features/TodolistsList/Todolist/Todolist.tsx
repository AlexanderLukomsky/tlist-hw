import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { IconButton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AddItem } from "../../../components/AddItem/AddItem"
import { ChangeableTitle } from "../../../components/ChangeableTitle/ChangeableTitle"
import { Switcher } from "../../../components/Switcher/Switcher"
import { updateTaskTC } from "../../../store/reducers/task-reducer"
import { createTask, deleteTask, fetchTasks } from '../../../store/reducers/tasks-sagas'
import { changeTodolistTitleTC, deleteTodolistTC } from "../../../store/reducers/todolist-reducer"
import { TaskStatus, TaskType } from "../../../types/TaskType"
import { TodolistType } from "../../../types/TodolistType"
import { Task } from "./Task/Task"
type FilterValueType = 'all' | 'active' | 'completed'
type TodolistPropsType = {
    todolist: TodolistType
    tasks: TaskType[]
}
export const Todolist: React.FC<TodolistPropsType> = React.memo(({ todolist, ...props }: TodolistPropsType) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasks(todolist.id))
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
    const createTaskHandler = (title: string) => {
        dispatch(createTask({ todolistID: todolist.id, title }))
    }
    const deleteTaskHandler = (payload: { todolistID: string, taskID: string }) => {
        dispatch(deleteTask(payload))
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
                <AddItem callback={createTaskHandler} disabled={disabledTodo} />
                <ul className="todolist__tasks">
                    {
                        sortedTask(props.tasks, filterValue).map(task =>
                            <Task
                                todolistRequestStatus={disabledTodo}
                                task={task}
                                deleteTask={deleteTaskHandler}
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