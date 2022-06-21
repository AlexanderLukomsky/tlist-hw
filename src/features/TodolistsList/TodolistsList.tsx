import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { AddItem } from "../../components/AddItem/AddItem";
import { createTodolistTC, fetchTodolistsTC } from "../../store/reducers/todolist-reducer"
import { returnTasks, returnTodolists } from "../../store/selector/selector"
import { Todolist } from "./Todolist/Todolist"

export const TodolistsList: React.FC = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])
    const tasks = useSelector(returnTasks)
    const todolists = useSelector(returnTodolists)
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
}