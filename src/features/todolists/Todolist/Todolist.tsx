import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { IconButton } from "@mui/material"
import React, { useEffect, FC } from "react"
import { AddItem } from "../../../components/AddItem/AddItem"
import { ChangeableTitle } from "../../../components/ChangeableTitle/ChangeableTitle"
import { Switcher } from "../../../components/Switcher/Switcher"
import { changeFilter, FilterType } from "../../../common/reducers/filter-reducer"
import { useActions, useAppDispatch, useAppSelector } from "../../../store/store"
import { TaskStatus } from "../../../types/TaskType"
import { TodolistType } from "../../../types/TodolistType"
import { selectFilteredTasks } from '../selector'
import { Task } from "../../task/Task"
import { tasksActions } from '../../task'
import { todolistActions } from '..'
type TodolistPropsType = {
    todolist: TodolistType,
    todolistID: string
}
export const Todolist: FC<TodolistPropsType> = React.memo(({ todolist, todolistID }: TodolistPropsType) => {
    const { fetchTasks, createTask, deleteTask, updateTask } = useActions(tasksActions)
    const { changeTodolistTitle, deleteTodolist } = useActions(todolistActions)
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => selectFilteredTasks(state, todolistID))
    useEffect(() => {
        fetchTasks(todolist.id)
    }, [todolist.id, fetchTasks])
    //dispatch task TC
    const changeTaskStatus = (payload: { todolistID: string, taskID: string, status: boolean }) => {
        const convertStatusToTaskStatusType = payload.status ? TaskStatus.Completed : TaskStatus.NotCompleted
        updateTask({ todolistID: payload.todolistID, taskID: payload.taskID, taskModel: { status: convertStatusToTaskStatusType } })
    }
    const changeTaskTitle = (payload: { todolistID: string, taskID: string, taskModel: { title: string } }) => {
        updateTask(payload)
    }
    //filter
    const onChangeFilter = (filterValue: FilterType) => {
        dispatch(changeFilter({ filterValue }))
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
                <AddItem callback={(title: string) => { createTask({ todolistID: todolist.id, title }) }} disabled={disabledTodo} />
                <ul className="todolist__tasks">
                    {
                        tasks.map(task =>
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
                    <Switcher titles={['all', 'active', 'completed']} callback={onChangeFilter} />
                </div>
            </div>
        </div>

    )
})