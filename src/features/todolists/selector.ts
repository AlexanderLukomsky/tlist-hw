import { createSelector } from "@reduxjs/toolkit";
import { TaskStatus, TaskType } from "../../types/TaskType";
import { TodolistType } from "../../types/TodolistType";
import { FilterType } from "../../common/reducers/filter-reducer";
import { AppRootStoreType } from "../../store/store";
export const selectFilter = (state: AppRootStoreType): FilterType => state.filter
export const selectTasks = (state: AppRootStoreType, todolistID: string): TaskType[] => state.tasks[todolistID]
export const selectTodolists = (state: AppRootStoreType): TodolistType[] => state.todolists

export const selectFilteredTasks = createSelector(
   [selectTasks, selectFilter],
   (tasks, filter) => {
      switch (filter) {
         case 'active': return tasks.filter(t => t.status === TaskStatus.NotCompleted)
         case 'completed': return tasks.filter(t => t.status === TaskStatus.Completed)
         default: return tasks
      }
   }
)