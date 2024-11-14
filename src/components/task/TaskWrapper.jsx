import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";

export function TaskWrapper() {



    return (
        <div className="container">
            <TaskForm />
            <TaskList  />
        </div>
    )
}