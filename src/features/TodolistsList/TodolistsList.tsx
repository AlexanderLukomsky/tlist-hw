import React, { useEffect } from "react"
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { AddItem } from "../../components/AddItem/AddItem";
import { createTodolistTC, fetchTodolistsTC } from "../../store/reducers/todolist-reducer"
import { returnTasks, returnTodolists } from "../../store/selector/selector"
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Todolist } from "./Todolist/Todolist"

export const TodolistsList: React.FC = React.memo(() => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const tasks = useSelector(returnTasks)
    const todolists = useSelector(returnTodolists)
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchTodolistsTC())
        }
    }, [isLoggedIn, dispatch])
    if (!isLoggedIn) return <Navigate to='/login' />

    return (
        <div>
            <div className="add-todolist">
                <AddItem disabled={false} callback={(title) => { dispatch(createTodolistTC(title)) }} />
            </div>
            <div className="todolists-list">
                {todolists.map(t =>
                    <Todolist key={t.id} todolist={t} tasks={tasks[t.id]} />
                )}
            </div>

        </div>
    )
})