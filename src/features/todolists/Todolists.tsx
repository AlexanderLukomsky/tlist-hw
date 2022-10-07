import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { todolistActions } from ".";
import { AddItem } from "../../components/AddItem/AddItem";
import { useActions } from "../../store/store";
import { selectIsLoggedIn } from "../auth/selectors";
import { selectTodolists } from "./selector";
import { Todolist } from "./Todolist/Todolist";

export const Todolists: React.FC = React.memo(() => {
    const { fetchTodolistsTC, createTodolistTC } = useActions(todolistActions)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const todolists = useSelector(selectTodolists)
    useEffect(() => {
        if (isLoggedIn) {
            fetchTodolistsTC()
        }
    }, [isLoggedIn, fetchTodolistsTC])
    if (!isLoggedIn) return <Navigate to='/login' />

    return (
        <div>
            <div className="add-todolist">
                <AddItem disabled={false} callback={(title) => { createTodolistTC(title) }} />
            </div>
            <div className="todolists-list">
                {todolists.map(t =>
                    <Todolist key={t.id} todolist={t} todolistID={t.id} />
                )}
            </div>

        </div>
    )
})