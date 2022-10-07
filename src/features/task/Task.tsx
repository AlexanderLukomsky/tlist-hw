import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import { Checkbox, IconButton } from "@mui/material";
import { FC } from "react";
import { ChangeableTitle } from "../../components/ChangeableTitle/ChangeableTitle";
import { TaskStatus, TaskType } from "../../types/TaskType";
import './task.scss';

type TaskPropsType = {
    todolistRequestStatus: boolean
    task: TaskType
    deleteTask: (payload: { todolistID: string, taskID: string }) => void
    changeTaskStatus: (payload: { todolistID: string, taskID: string, status: boolean }) => void
    changeTaskTitle: (payload: { todolistID: string, taskID: string, taskModel: { title: string } }) => void
}
export const Task: FC<TaskPropsType> = ({ task, deleteTask, changeTaskTitle, changeTaskStatus }) => {
    const convertToBooleanStatus = (status: TaskStatus) => {
        switch (status) {
            case TaskStatus.Completed: return true
            case TaskStatus.NotCompleted: return false
            default: return false
        }
    }
    return (
        <li className='task'>
            <Checkbox
                checked={convertToBooleanStatus(task.status)}
                onChange={(status) => { changeTaskStatus({ todolistID: task.todoListId, taskID: task.id, status: status.currentTarget.checked }) }}
                icon={<RadioButtonUncheckedOutlinedIcon color='primary' />}
                checkedIcon={<CheckCircleOutlineOutlinedIcon color='success' />}
            />
            <div className='task__title'>
                <ChangeableTitle
                    title={task.title}
                    callback={(title) => { changeTaskTitle({ todolistID: task.todoListId, taskID: task.id, taskModel: { title } }) }}
                />
            </div>
            <IconButton onClick={() => { deleteTask({ todolistID: task.todoListId, taskID: task.id }) }}
                className='task__delete'
            >
                <DeleteOutlineOutlinedIcon fontSize='medium' color='secondary' />
            </IconButton>
        </li>
    )
}