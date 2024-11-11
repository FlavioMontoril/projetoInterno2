import React, { useState } from "react";
import { deleteTasksApi } from "../../services/api";
import { LuTrash } from "react-icons/lu";
import { GiConfirmed } from "react-icons/gi";
import { CiEdit } from "react-icons/ci";

export const TaskList = ({ listTasks, setListTasks }) => {
    const [isDisabled, setIsDisabled] = useState(false)
    
    // ESSA FUNÇÃO SALVA OS VALORES DIGITADOS NO IMPUT E ADICIONA AO EVENTO, LOGO APÓS É CRIADO UM INPUT, ONDE VAI ESPALHADO A LISTA DE TAREFAS
    // E OS VALORES DIGITADOS NO IMPUT. APÓS ISTO, É ADICIONADO O NEW INPUT NA LISTA DE TAREFAS COM OS NOVOS VALORES
    function handleNewInputChange(e) {
        const { name, value } = e.target
        const newInput = { ...listTasks, [name]: value }
      
        setListTasks(newInput)
      }

    // ESTA É UMA FUNCÃO ASYNCRONA(ASYNC) ONDE VAI FAZER UMA CHAMADA Á API, A API FAZ UMA REQUISIÇÃO AO SERVIDOR 
    // PARA EXLUIR A TAREFA NO BACKEND E LOGO VAI RETORNAR A CHAMADA(AWAIT). NEW LIST É UMA NOVA LISTA COM UMA FUNÇÃO PARA
    // RETORNAR A LISTA QUE NÃO TENHA A ID DA TAREFA DELETADA
      async function handleDeleteTasks(id) {
        const response = await deleteTasksApi(id)
        if (response.status === 204) {
            const newList = listTasks.filter(task => task.id !== id)
            setListTasks(newList)
        }
    }

    function handleEnableEdit() {
        setIsDisabled(true)
    }

    return (
        <>
            {
    // ESTA FUNÇÃO VAI MAPEAR TODOS OS ITENS DAS TAREFAS, DA MINHA LISTA DE TAREFAS E VAI RENDERIZAR NA TELA QUANDO QUANDO A PÁGINA FOR CARREGADA,
    // ATRAVÉS DO USEEFFECT, UM HOOK DO HEACT QUE CHAMA A FUNÇÃO GETTASKS().      
                listTasks.map(task => (
                    <div key={task.id} className="card">

                        <div>
                            <label htmlFor="titulo">
                                Título:
                                <input disabled={!isDisabled} name="titulo" defaultValue={task.titulo} onChange={(e) => handleNewInputChange(e)} />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="descricao">
                                Descrição:
                                <input disabled={!isDisabled} name="descricao" defaultValue={task.descricao} onChange={(e) => handleNewInputChange(e)} />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="status">
                                Status:
                                <input disabled={!isDisabled} name="status" defaultValue={task.status} onChange={(e) => handleNewInputChange(e)} />
                            </label>
                        </div>

                        <button className="confirmEditButton" >
                            <GiConfirmed size={20} color="blue" />
                        </button>

                        <br></br>
                        <hr></hr>
                        <br></br>

                        <p>Titulo: <span>{task.titulo}</span></p>
                        <p>Descrição: <span>{task.descricao}</span></p> 
                        <p>Status: <span>{task.status}</span></p>
                        <p>Criado: <span>{task.criado_em}</span></p>
                        <p>ID: <span>{task.id}</span></p>

                        <div className="trash">
                            <button className="deleteButton" onClick={() => handleDeleteTasks(task.id)}  >
                                <LuTrash size={20} color="red" />

                            </button>

                            <button className="editButton" onClick={handleEnableEdit} >
                                <CiEdit size={20} color="blue" />
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}