import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { FilterType, Todolist, TodolistType } from './Components/Todolist/Todolist';
const todoListID1 = v1()
const todoListID2 = v1()
function App() {
    const [todolist, setTodolist] = useState<TodolistType[]>([
        { todolistID: todoListID1, title: 'todolist-1', filter: 'all' },
        { todolistID: todoListID2, title: 'todolist-2', filter: 'completed' },
    ])

    const [tasks, setTasks] = useState(
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
        setTasks({ ...tasks, [todolistID]: [{ taskID: v1(), title, isDone: false }, ...tasks[todolistID]] })
    }
    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(t => t.taskID === taskID ? { ...t, isDone } : t) })
    }
    const deleteTask = (todolistID: string, taskID: string) => {
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter(t => t.taskID !== taskID) })
    }
    const changeFilter = (todolistID: string, filter: FilterType) => {
        setTodolist(todolist.map(t => t.todolistID === todolistID ? { ...t, filter } : t))
    }
    const deleteTodlist = (todolistID: string) => {
        setTodolist(todolist.filter(t => t.todolistID !== todolistID))
        delete tasks[todolistID]
    }
    return (
        <div className="App">
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
