import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import { Checkbox, IconButton } from "@mui/material";
import { FC } from "react";
import { tasksActions } from '.';
import { ChangeableTitle } from "../../components/ChangeableTitle/ChangeableTitle";
import { useActions } from '../../store/store';
import { TaskStatus, TaskType } from "../../types/TaskType";
import './task.scss';

type TaskPropsType = {
    task: TaskType
}
export const Task: FC<TaskPropsType> = ({ task }) => {
    const { deleteTask, updateTask } = useActions(tasksActions)
    const convertToBooleanStatus = (status: TaskStatus) => {
        switch (status) {
            case TaskStatus.Completed: return true
            case TaskStatus.NotCompleted: return false
            default: return false
        }
    }
    const changeTaskStatus = (payload: { todolistID: string, taskID: string, status: boolean }) => {
        const convertStatusToTaskStatusType = payload.status ? TaskStatus.Completed : TaskStatus.NotCompleted
        updateTask({ todolistID: payload.todolistID, taskID: payload.taskID, taskModel: { status: convertStatusToTaskStatusType } })
    }
    const changeTaskTitle = (payload: { todolistID: string, taskID: string, taskModel: { title: string } }) => {
        updateTask(payload)
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