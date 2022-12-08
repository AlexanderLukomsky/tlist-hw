import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AddItem } from '../../components/AddItem/AddItem';
import { useAppDispatch } from '../../store/store';
import { selectIsLoggedIn } from '../auth/selectors';
import { selectTodolists } from './selector';
import { createTodolist, fetchTodolists } from './todolist-sagas';
import { Todolist } from './Todolist/Todolist';

export const Todolists: React.FC = React.memo(() => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useSelector(selectIsLoggedIn);

    const todolists = useSelector(selectTodolists);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchTodolists());
        }
    }, [isLoggedIn, dispatch]);

    if (!isLoggedIn) return <Navigate to="/login" />;

    return (
        <div>
            <div className="add-todolist">
                <AddItem
                    disabled={false}
                    callback={(title) => {
                        dispatch(createTodolist(title));
                    }}
                />
            </div>
            <div className="todolists-list">
                {todolists.map((t) => (
                    <Todolist key={t.id} todolist={t} todolistID={t.id} />
                ))}
            </div>
        </div>
    );
});
