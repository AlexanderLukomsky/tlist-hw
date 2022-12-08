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
import {
    useActions,
    useAppDispatch,
    useAppSelector
} from '../../../store/store';
import { TodolistType } from '../../../types/TodolistType';
import { selectFilteredTasks } from '../selector';
import { Task } from '../../task/Task';
import { todolistAsyncActions } from '../todolist-reducer';

import { createTask, fetchTasks } from '../../task/tasks-sagas';
type TodolistPropsType = {
    todolist: TodolistType;
    todolistID: string;
};
export const Todolist: FC<TodolistPropsType> = React.memo(
    ({ todolist, todolistID }: TodolistPropsType) => {
        const { changeTodolistTitle, deleteTodolist } =
            useActions(todolistAsyncActions);
        const dispatch = useAppDispatch();
        const tasks = useAppSelector((state) =>
            selectFilteredTasks(state, todolistID)
        );
        useEffect(() => {
            dispatch(fetchTasks(todolist.id));
        }, [todolist.id, dispatch]);
        //filter
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
                                deleteTodolist(todolist.id);
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
                                changeTodolistTitle({
                                    title,
                                    todolistID: todolist.id
                                })
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
