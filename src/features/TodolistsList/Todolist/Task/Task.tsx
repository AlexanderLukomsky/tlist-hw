import React, { ChangeEvent, useState } from "react"
import { Button } from "../../../../components/Button/Buttons"
import { Checkbox } from "../../../../components/Checkbox"
import { ConvertTitle } from "../../../../components/ConvertTitle/ConvertTitle"
import { TaskStatus, TaskType } from "../../../../types/TaskType"

type TaskPropsType = {
    todolistRequestStatus: boolean
    task: TaskType
    deleteTask: (payload: { todolistID: string, taskID: string }) => void
    changeTaskStatus: (payload: { todolistID: string, taskID: string, status: boolean }) => void
    changeTaskTitle: (payload: { todolistID: string, taskID: string, taskModel: { title: string } }) => void
}
export const Task: React.FC<TaskPropsType> = ({ task, ...props }) => {
    const convertToBooleanStatus = (status: TaskStatus) => {
        switch (status) {
            case TaskStatus.Completed: return true
            case TaskStatus.NotCompleted: return false
            default: return false
        }
    }
    return (
        <>
            <Checkbox
                checked={convertToBooleanStatus(task.status)}
                onChange={(status: boolean) => { props.changeTaskStatus({ todolistID: task.todoListId, taskID: task.id, status }) }}
            />
            <ConvertTitle title={task.title} callback={(title) => { props.changeTaskTitle({ todolistID: task.todoListId, taskID: task.id, taskModel: { title } }) }} />
            <span className="task__delete delete-button">
                <Button title={''}
                    callback={() => { props.deleteTask({ todolistID: task.todoListId, taskID: task.id }) }}
                />
            </span>

        </>
    )
}