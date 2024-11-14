import React, { useState } from "react";
import { useTask } from "../../context/TaskProvider";

export const TaskForm = () => {

    // const { createTask } = useContext(TaskContext)
    const { createTask } = useTask()

    // ESTADO RESPONSÁVEL PELA A ESTRUTURA DE CRIAÇÃO DE UMA TAREFA.
    const [task, setTask] = useState({
        titulo: '',
        descricao: '',
        status: ''
    })

    function handleInputChange(e) {

        const { name, value } = e.target
        const newTaskValue = { ...task, [name]: value }

        setTask(newTaskValue)
    }

    async function handleCreateTasks(e) {
        e.preventDefault()
        createTask(task)

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