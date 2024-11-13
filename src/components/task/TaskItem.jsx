import React, { useContext, useState } from "react";
// import { deleteTasksApi } from "../../services/api";
// import { LuTrash } from "react-icons/lu";
// import { GiConfirmed } from "react-icons/gi";
// import { CiEdit } from "react-icons/ci";
import { TaskContext, useTask } from "../../context/TaskProvider";

export function TaskItem({ data }) {

    const { editTask } = useTask()
    const {deleteTask} = useTask()

    const [task, setTask] = useState(data)

    const [isDisabled, setIsDisabled] = useState(true)

    // ESSA FUNÇÃO SALVA OS VALORES DIGITADOS NO IMPUT E ADICIONA AO EVENTO, LOGO APÓS É CRIADO UM INPUT, ONDE VAI ESPALHADO A LISTA DE TAREFAS
    // E OS VALORES DIGITADOS NO IMPUT. APÓS ISTO, É ADICIONADO O NEW INPUT NA LISTA DE TAREFAS COM OS NOVOS VALORES
    function handleNewInputChange(e) {
        const { name, value } = e.target
        console.log(value)
        // const newList = listTasks
        // newList[index] = {
        //     ...newList[index],
        //     [name]: value
        // }

        // setListTasks(newList)
        setTask((state) => ({
            ...state,
            [name]: value
        }))
    }

    function handleDeleteTasks() {

            console.log("Chegou no delete", task.id)
            if(task.id){
                deleteTask(task.id)
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
                            <option value="emAndamento">Em andamento</option>
                            <option value="concluído">Concluido</option>
                        </select>
                    </label><br></br>
                </div>
            </div>

            <button onClick={handleEnableEdit}>
                {isDisabled ? "editar" : "salvar"}
            </button>

            <button className="deleteButton" onClick={handleDeleteTasks}> 
                Apagar
            </button>
                   {/*} <LuTrash size={20} color="red" />

                </button>

            /* <button className="confirmEditButton" >
                <GiConfirmed size={20} color="blue" />
            </button> */}


            {/* <p>Titulo: <span>{data.titulo}</span></p>
            <p>Descrição: <span>{data.descricao}</span></p>
            <p>Status: <span>{data.status}</span></p>
            <p>Criado: <span>{data.criado_em}</span></p>
            <p>ID: <span>{data.id}</span></p>

            <div className="trash">
                <button className="deleteButton" onClick={() => handleDeleteTasks(data.id)}  >
                    <LuTrash size={20} color="red" />

                </button>

                <button className="editButton" onClick={handleEnableEdit()} >
                    <CiEdit size={20} color="blue" />
                </button>
            </div> */}
        </div>
    )
}