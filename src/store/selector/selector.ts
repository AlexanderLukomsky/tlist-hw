import { TasksStateType, TaskType } from "../../types/TaskType";
import { TodolistType } from "../../types/TodolistType";
import { AppRootStoreType } from "../store";

export const returnTasks = (state: AppRootStoreType): TasksStateType => state.tasks
export const returnTodolists = (state: AppRootStoreType): TodolistType[] => state.todolists