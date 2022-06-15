import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodolistsTC } from "../../store/reducers/todolist-reducer"
import { returnTasks, returnTodolists } from "../../store/selector/selector"
import { Todolist } from "./Todolist/Todolist"

export const TodolistsList: React.FC = () => {

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])
    const dispatch = useDispatch()
    const tasks = useSelector(returnTasks)
    const todolists = useSelector(returnTodolists)


    return (
        <div className="todolists-list">
            {todolists.map(t =>
                <Todolist key={t.id} todolistID={t.id} tasks={tasks[t.id]} todoTitle={t.title} />
            )}
        </div>
    )
}