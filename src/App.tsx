import { TaskContainer } from "./features/TodolistsList/Todolist/Task/TaskContainer";

export const App: React.FC = () => {

    return (
        <div className="App">
            <div>
                <TaskContainer />
            </div>
        </div>
    );
}
