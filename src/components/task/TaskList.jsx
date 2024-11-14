import React, { useContext } from "react";
import { TaskItem } from "./TaskItem";
import { TaskContext } from "../../context/TaskProvider";

export const TaskList = () => {

    const { tasks } = useContext(TaskContext)

    return (
        <>
            {  
                tasks.map((task) => (
                    <TaskItem data={task} key={task.id} />
                ))
            }
        </>
    )
}