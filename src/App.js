import React, { useEffect, useState, } from "react";
import { LuTrash } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { createTasksApi, deleteTasksApi, getAllTasksApi } from "./services/api";

export function App() {
  const [tasks, setTasks] = useState([])

  const [titulo, setTitulo] = useState([])
  const [descricao, setDescricao] = useState([])

  function handleChangeTitle(e) {
    console.log(e.target.value)
    setTitulo(e.target.value)
  }

  function handleChangeDescricao(e) {
    setDescricao(e.target.value)
    console.log(e.target.value)
  }


  async function getTasks() {

    const response = await getAllTasksApi()

    if (response.status === 200) {
      const data = await response.json()


      setTasks(data)

    }


  }

  async function createTasks(e) {

    e.preventDefault()

    const task = {
      titulo: titulo,
      descricao: descricao,
    }


    const response = await createTasksApi(task)
    console.log("LELE", response)


    if (response.status === 201) {
      const currentTask = await response.json()
      const newTasks = [currentTask, ...tasks]

      setTasks(newTasks)
    }

  }

  async function deleteTasks(id) {

    console.log("lele", id)
    const response = await deleteTasksApi(id)
    if (response.status === 204) {
      const newList = tasks.filter(task => task.id !== id)
      console.log("NEW LIST", newList)
      setTasks(newList)
      // tasks.filter((task)=>{return sdfsdf})

    }


  }

  useEffect(() => {
    getTasks();
  }, [])



  return (
    <div className="container">

      <form onSubmit={createTasks}>
        <h1>Cadastro de tarefas</h1>
        <input placeholder="Titulo..." name="titulo" type="text" onChange={(e) => handleChangeTitle(e)} />
        <input placeholder="Descrição..." name="descricao" type="text" onChange={(e) => handleChangeDescricao(e)} />
        <button type="submit"  >Cadastrar</button>
      </form>

      {tasks.map(task => (

        <div key={task.id} className="card">
          <p>Titulo: <span>{task.titulo}</span></p>
          <p>Tipo: <span>{task.descricao}</span></p>
          <p>Criado em: <span>{task.criado_em}</span></p>
          <p>status: <span>{task.status}</span></p>

          <div className="trash">
            <button className="deleteButton"  onClick={() => deleteTasks(task.id)}  >
              <LuTrash size={20} color="red" />
              {/* <img src={trash} /> */}
            </button>

            <button className="editButton" >
            <CiEdit size={20} color="blue"/>
            </button>
          </div>

        </div>
      ))}

    </div>
  );
}
