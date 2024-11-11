import React from "react";
import { createTasksApi } from "../../services/api";

export const TaskForm = ({ task, setTask, taskList, setTaskList }) => {

    function handleInputChange(e) {

        const { name, value } = e.target
        const newTaskValue = { ...task, [name]: value }

        setTask(newTaskValue)
    }

    async function handleCreateTasks(e) {
        e.preventDefault()

        const response = await createTasksApi(task)

        if (response.status === 201) {
            const currentTask = await response.json()
            const newTasks = [currentTask, ...taskList]

            setTaskList(newTasks)
        }
        else{
            alert("Insira as informações necessárias")
        }
        
    }

    return (

        <form onSubmit={handleCreateTasks}>
            <h1>Cadastro de tarefas</h1>
            <input
                placeholder="Titulo..."
                name="titulo"
                type="text"
                onChange={handleInputChange}
                value={task.titulo}
            />
            <input
                placeholder="Descrição..."
                name="descricao"
                type="text"
                onChange={handleInputChange}
                value={task.descricao}
            />

            <button type="submit">Cadastrar</button>
        </form>

    )
}