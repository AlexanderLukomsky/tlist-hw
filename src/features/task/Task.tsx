import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import { Checkbox, IconButton } from '@mui/material';
import { FC } from 'react';
import { ChangeableTitle } from '../../components/ChangeableTitle/ChangeableTitle';
import { useAppDispatch } from '../../store/store';
import { TaskStatus, TaskType } from '../../types/TaskType';
import { tasksAsyncActions } from './task-reducer';

import './task.scss';
import { deleteTask } from './tasks-sagas';

type TaskPropsType = {
    task: TaskType;
};
export const Task: FC<TaskPropsType> = ({ task }) => {
    const { updateTask } = tasksAsyncActions;
    const dispatch = useAppDispatch();
    const convertToBooleanStatus = (status: TaskStatus) => {
        switch (status) {
            case TaskStatus.Completed:
                return true;
            case TaskStatus.NotCompleted:
                return false;
            default:
                return false;
        }
    };
    const changeTaskStatus = (payload: {
        todolistID: string;
        taskID: string;
        status: boolean;
    }) => {
        const convertStatusToTaskStatusType = payload.status
            ? TaskStatus.Completed
            : TaskStatus.NotCompleted;
        dispatch(
            updateTask({
                todolistID: payload.todolistID,
                taskID: payload.taskID,
                taskModel: { status: convertStatusToTaskStatusType }
            })
        );
    };
    const changeTaskTitle = (payload: {
        todolistID: string;
        taskID: string;
        taskModel: { title: string };
    }) => {
        dispatch(updateTask(payload));
    };
    return (
        <li className="task">
            <Checkbox
                checked={convertToBooleanStatus(task.status)}
                onChange={(status) => {
                    changeTaskStatus({
                        todolistID: task.todoListId,
                        taskID: task.id,
                        status: status.currentTarget.checked
                    });
                }}
                icon={<RadioButtonUncheckedOutlinedIcon color="primary" />}
                checkedIcon={<CheckCircleOutlineOutlinedIcon color="success" />}
            />
            <div className="task__title">
                <ChangeableTitle
                    title={task.title}
                    callback={(title) => {
                        changeTaskTitle({
                            todolistID: task.todoListId,
                            taskID: task.id,
                            taskModel: { title }
                        });
                    }}
                />
            </div>
            <IconButton
                onClick={() => {
                    dispatch(
                        deleteTask({
                            todolistID: task.todoListId,
                            taskID: task.id
                        })
                    );
                }}
                className="task__delete"
            >
                <DeleteOutlineOutlinedIcon
                    fontSize="medium"
                    color="secondary"
                />
            </IconButton>
        </li>
    );
};
