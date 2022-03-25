import React, { useReducer } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { AddItemForm } from './Components/AddItemForm/AddItemForm';
import { Todolist } from './Components/Todolist/Todolist';

import { addTaskAC, addTasksListAC, changeStatusAC, deleteTasksListAC, removeTaskAC, StateReducerType, taskReducer } from './reducer/tasksReducer';
import { addTodolistAC, changeFilterAC, deleteTodlistAC, FilterType, todolistReducer, TodolistType } from './reducer/todolistReducer';
const todoListID1 = v1()
const todoListID2 = v1()
function App() {
    const [todolist, todolistDispatch] = useReducer(todolistReducer, [
        { todolistID: todoListID1, title: 'todolist-1', filter: 'all' },
        { todolistID: todoListID2, title: 'todolist-2', filter: 'all' },
    ])

    const [tasks, tasksDispatch] = useReducer(taskReducer,
        {
            [todoListID1]: [
                { taskID: v1(), title: 'HTML', isDone: true },
                { taskID: v1(), title: 'SCSS', isDone: true },
                { taskID: v1(), title: 'ReactJS', isDone: false },
                { taskID: v1(), title: '4', isDone: false },
                { taskID: v1(), title: '5', isDone: false },
                { taskID: v1(), title: '6', isDone: true },
            ],
            [todoListID2]: [
                { taskID: v1(), title: 'HTML2', isDone: true },
                { taskID: v1(), title: 'SCSS2', isDone: false },
                { taskID: v1(), title: 'ReactJS2', isDone: true },
                { taskID: v1(), title: '6', isDone: true },
                { taskID: v1(), title: '3', isDone: false },
                { taskID: v1(), title: '2', isDone: true },
            ]
        }
    )
    const addTask = (todolistID: string, title: string) => {
        const taskID = v1()
        tasksDispatch(addTaskAC(todolistID, taskID, title))
    }
    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        tasksDispatch(changeStatusAC(todolistID, taskID, isDone))
    }
    const deleteTask = (todolistID: string, taskID: string) => {
        tasksDispatch(removeTaskAC(todolistID, taskID))
    }
    const changeFilter = (todolistID: string, filter: FilterType) => {
        todolistDispatch(changeFilterAC(todolistID, filter))
    }
    const deleteTodlist = (todolistID: string) => {
        todolistDispatch(deleteTodlistAC(todolistID))
        tasksDispatch(deleteTasksListAC(todolistID))
    }
    const addTodolist = (title: string) => {
        const todolistID = v1();
        tasksDispatch(addTasksListAC(todolistID))
        todolistDispatch(addTodolistAC(todolistID, title))
    }
    console.log(tasks);
    return (
        <div className="App">
            <AddItemForm callback={(title) => { addTodolist(title) }} />
            {
                todolist.map(t =>
                    <Todolist
                        key={t.todolistID}
                        todolistID={t.todolistID}
                        title={t.title}
                        tasks={tasks[t.todolistID]}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        deleteTodlist={deleteTodlist}
                        filterValue={t.filter}
                    />

                )
            }

        </div>
    );
}
export default App;
