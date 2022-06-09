import React, { useState } from "react";
import { Switcher } from "./Switcher";
import { Task } from "./Task";
type FilterValueType = 'all' | 'active' | 'completed'
export const TaskContainer: React.FC = () => {
    const [filterValue, setFilterValue] = useState<FilterValueType>('all')
    const changeFilter = (filterValue: string) => {
        switch (filterValue) {
            case 'all': setFilterValue(filterValue); break
            case 'active': setFilterValue(filterValue); break
            case 'completed': setFilterValue(filterValue); break
            default: return
        }
    }

    const tasks = [{ title: 'first', isDone: false }, { title: 'second', isDone: true }, { title: 'third', isDone: false }]
    const sortTask = (tasks: { title: string, isDone: boolean }[], filterValue: FilterValueType) => {
        switch (filterValue) {
            case 'active': return tasks.filter(t => !t.isDone)
            case 'completed': return tasks.filter(t => t.isDone)
            default: return tasks
        }
    }
    return (
        <div>
            <div>
                title
            </div>
            <div>
                <input type="text" />
                <button>+++</button>
            </div>

            <div>
                {
                    sortTask(tasks, filterValue).map(task => <Task task={task} key={task.title} />)
                }

            </div>
            <div>
                <Switcher titles={['all', 'active', 'completed']} callback={changeFilter} />
            </div>
        </div>
    )
}