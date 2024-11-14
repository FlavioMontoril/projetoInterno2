import React, { useState } from "react";
import { useTask } from "../../context/TaskProvider";

export function TaskItem({ data }) {

    const { editTask } = useTask()
    const {deleteTask} = useTask()

    const [task, setTask] = useState(data)

    const [isDisabled, setIsDisabled] = useState(true)

    function handleNewInputChange(e) {
        const { name, value } = e.target
        console.log(value)

        setTask((state) => ({
            ...state,
            [name]: value
        }))
    }

    function handleDeleteTasks() {
        const confirmDelete = window.confirm("Deseja deletar a tarefa?")

        if(confirmDelete){
            if(task.id){
                deleteTask(task.id)
            }
            
        }
        else{
            alert("Exclusão cancelada!")
            }
            
        }

    function handleEnableEdit(e) {
        e.preventDefault()


        if (!isDisabled) {
            editTask(task)
        }

        setIsDisabled(!isDisabled)

    }

    return (
        <div className="card" key={data.id}>
            <div>
                <div>
                    <label htmlFor="titulo">
                        Título:
                        <input name="titulo" disabled={isDisabled} defaultValue={task.titulo} onChange={(e) => handleNewInputChange(e)} />
                    </label>
                </div>

                <div>
                    <label htmlFor="descricao">
                        Descrição:
                        <input name="descricao" disabled={isDisabled} defaultValue={task.descricao} onChange={(e) => handleNewInputChange(e)} />
                    </label>
                </div>

                <div>
                    <label htmlFor="status">
                        Status:
                        <select name="status" disabled={isDisabled} defaultValue={task.status} required onChange={(e) => handleNewInputChange(e)}>
                            <option>Selecione um status</option>
                            <option value="pendente">Pendente</option>
                            <option value="Em andamento">Em andamento</option>
                            <option value="concluído">Concluido</option>
                        </select>
                    </label>
                    <br/>
                </div>
            </div>

            <div className="button-container">
            <button className="btn" onClick={handleEnableEdit}>
                {isDisabled ? "Editar" : "salvar"}
            </button>

            <button className="btn" onClick={handleDeleteTasks}> 
                Apagar
            </button>
            </div>
            <hr/>
            <br/>
            
            <p>Titulo: <span>{data.titulo}</span></p>
            <p>Descrição: <span>{data.descricao}</span></p>
            <p>Status: <span>{data.status}</span></p>
            <p>Criado: <span>{data.criado_em}</span></p>
            <p>ID: <span>{data.id}</span></p>

        </div>
    )
}