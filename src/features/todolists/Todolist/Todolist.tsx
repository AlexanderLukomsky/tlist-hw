import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { IconButton } from '@mui/material';
import React, { useEffect, FC } from 'react';
import { AddItem } from '../../../components/AddItem/AddItem';
import { ChangeableTitle } from '../../../components/ChangeableTitle/ChangeableTitle';
import { Switcher } from '../../../components/Switcher/Switcher';
import {
    changeFilter,
    FilterType
} from '../../../common/reducers/filter-reducer';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { TodolistType } from '../../../types/TodolistType';
import { selectFilteredTasks } from '../selector';
import { Task } from '../../task/Task';

import { createTask, fetchTasks } from '../../task/tasks-sagas';
import { changeTodolistTitle, deleteTodolist } from '../todolist-sagas';

type TodolistPropsType = {
    todolist: TodolistType;
    todolistID: string;
};

export const Todolist: FC<TodolistPropsType> = React.memo(
    ({ todolist, todolistID }: TodolistPropsType) => {
        const dispatch = useAppDispatch();

        const tasks = useAppSelector((state) =>
            selectFilteredTasks(state, todolistID)
        );

        useEffect(() => {
            dispatch(fetchTasks(todolist.id));
        }, [todolist.id, dispatch]);

        const onChangeFilter = (filterValue: FilterType) => {
            dispatch(changeFilter({ filterValue }));
        };

        const disabledTodo = todolist.requestStatus === 'loading';

        return (
            <div className="todolist-wrapper">
                <div className="todolist">
                    <div className="todolist__delete delete-button ">
                        <IconButton
                            size="large"
                            disabled={disabledTodo}
                            onClick={() => {
                                dispatch(deleteTodolist(todolist.id));
                            }}
                        >
                            <HighlightOffOutlinedIcon
                                color={disabledTodo ? 'action' : 'error'}
                            />
                        </IconButton>
                    </div>
                    <div className="todolist__title">
                        <ChangeableTitle
                            disabled={disabledTodo}
                            title={todolist.title}
                            callback={(title) =>
                                dispatch(
                                    changeTodolistTitle({
                                        title,
                                        todolistID: todolist.id
                                    })
                                )
                            }
                        />
                    </div>
                    <AddItem
                        callback={(title: string) => {
                            dispatch(
                                createTask({ todolistID: todolist.id, title })
                            );
                        }}
                        disabled={disabledTodo}
                    />
                    <ul className="todolist__tasks">
                        {tasks.map((task) => (
                            <Task task={task} key={task.id} />
                        ))}
                    </ul>
                    <div className="todolist__filter">
                        <Switcher
                            titles={['all', 'active', 'completed']}
                            callback={onChangeFilter}
                        />
                    </div>
                </div>
            </div>
        );
    }
);
