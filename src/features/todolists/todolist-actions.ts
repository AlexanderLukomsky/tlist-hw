import { ResultCodeType } from '../../api/instance';
import { todolist_api } from "../../api/todolist-api";
import { setAppStatusAC } from '../../app/app-reducer';
import { AppThunk } from '../../store/store';
import { handleServerAppError, handleServerNetworkError } from '../../store/utils/utils';
import { changeTodolistRequestStatusAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC, setTodolistsAC } from './todolist-reducer';
//thunks
export const fetchTodolistsTC = (): AppThunk => async (dispatch) => {
   dispatch(setAppStatusAC({ status: 'loading' }))
   try {
      const res = await todolist_api.getTodolist()
      dispatch(setTodolistsAC({ todolists: res.data }))
      dispatch(setAppStatusAC({ status: 'successed' }))
   } catch (err) {
      handleServerNetworkError((err as Error).message, dispatch)
   }
}

export const changeTodolistTitleTC = (payload: { todolistID: string, title: string }): AppThunk => async (dispatch) => {
   dispatch(setAppStatusAC({ status: 'loading' }))
   dispatch(changeTodolistRequestStatusAC({ todolistID: payload.todolistID, status: 'loading' }))
   try {
      const res = await todolist_api.changeTitle(payload)
      if (res.data.resultCode === ResultCodeType.Ok) {
         dispatch(changeTodolistTitleAC(payload))
         dispatch(changeTodolistRequestStatusAC({ todolistID: payload.todolistID, status: 'successful' }))
         dispatch(setAppStatusAC({ status: 'successed' }))
      } else {
         handleServerAppError(res.data, dispatch)
         dispatch(changeTodolistRequestStatusAC({ todolistID: payload.todolistID, status: 'idle' }))
      }
   }
   catch (error) {
      handleServerNetworkError((error as Error).message, dispatch)
   }
}

export const deleteTodolistTC = (todolistID: string): AppThunk =>
   async (dispatch) => {
      dispatch(changeTodolistRequestStatusAC({ todolistID, status: 'loading' }))
      try {
         await todolist_api.deleteTodolist(todolistID)
         dispatch(deleteTodolistAC({ todolistID }))
      } catch (err) {
         handleServerNetworkError((err as Error).message, dispatch)
      }
   }

export const createTodolistTC = (title: string): AppThunk =>
   async (dispatch) => {
      try {
         const res = await todolist_api.createTodolist(title)
         if (res.data.resultCode === ResultCodeType.Ok) {
            dispatch(createTodolistAC({ todolist: res.data.data.item }))
         } else {
            handleServerAppError(res.data, dispatch)
         }
      } catch (err) {
         handleServerNetworkError((err as Error).message, dispatch)
      }
   }