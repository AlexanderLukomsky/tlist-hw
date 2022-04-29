import { useDispatch, useSelector } from 'react-redux';
import { v1 } from 'uuid';
import './App.css';
import { AddItemForm } from './Components/AddItemForm/AddItemForm';
import { Todolist } from './Components/Todolist/Todolist';

import { addTaskAC, changeStatusAC, removeTaskAC, TasksType } from './reducer/tasksReducer';
import { addTodolistAC, changeFilterAC, deleteTodlistAC, FilterType, TodolistType } from './reducer/todolistReducer';
import { AppStateType } from './redux/redux';
function App() {
    const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)
    const todolist = useSelector<AppStateType, TodolistType[]>(state => state.todolist)
    const dispatch = useDispatch()
    console.log(tasks);
    const addTask = (todolistID: string, title: string) => {
        const taskID = v1()
        dispatch(addTaskAC(todolistID, taskID, title))
    }
    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeStatusAC(todolistID, taskID, isDone))
    }
    const deleteTask = (todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    }
    const changeFilter = (todolistID: string, filter: FilterType) => {
        dispatch(changeFilterAC(todolistID, filter))
    }
    const deleteTodlist = (todolistID: string) => {
        const action = deleteTodlistAC(todolistID)
        dispatch(action)
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }
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
