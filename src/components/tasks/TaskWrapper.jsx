import { useEffect, useState } from "react";
import { getAllTasksApi } from "../../services/api";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";

export function TaskWrapper() {

    // ESTADO QUE ARMAZENA A MINHA LISTA DE TAREFAS.
    const [taskList, setTaskList] = useState([])

    // ESTADO RESPONSÁVEL PELA A ESTRUTURA DE CRIAÇÃO DE UMA TAREFA.
    const [task, setTask] = useState({
        titulo: '',
        descricao: '',
        status: ''
      }) 

    // ESSA FUNÇÃO É RESPONSÁVEL POR BUSCAR AS MINHAS TAREFAS CRIADAS.
    async function getTasks() {
        const response = await getAllTasksApi()
        if (response.status === 200) {
            const data = await response.json()
            setTaskList(data)
        }
    }


    // AO CARREGAR A PÁGINA ME MOSTRA AS MINHAS TAREFAS EXISTENTES.
    useEffect(() => {
        getTasks();
    }, [])


    return (
        // COMPONENTE QUE RENDERIZA NA TELA O MEU FORMULÁRIO E A MINHA LISTA DE TAREFAS.
        <div className="container">
            <TaskForm task={task} setTask={setTask} taskList={taskList} setTaskList={setTaskList}/>
            <TaskList listTasks={taskList} setListTasks={setTaskList}  />
        </div>
    )
}