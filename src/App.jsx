import React, { useEffect, useState, } from "react";
import { LuTrash } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { createTasksApi, deleteTasksApi, editTasksApi, getAllTasksApi } from "./services/api";

export function App() {
  const [tasks, setTasks] = useState([])//lista
  const [isDisabled, setIsDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  // const [titulo, setTitulo] = useState('')
  // const [descricao, setDescricao] = useState('')
  // const [status, setStatus] = useState('')

  const [task, setTask] = useState({
    titulo: '',
    descricao: '',
    status: ''
  })

  function handleEnableEdit(){
    setIsDisabled(true)
  }



  // function handleChangeTitle(e) {
  //   console.log(e.target.value)
  //   //titulo = []
  //   setTitulo(e.target.value)
  //   //titulo = e.tagert.value string
  // }

  // function handleChangeDescricao(e) {
  //   setDescricao(e.target.value)
  //   console.log(e.target.value)
  // }

  // function handleChangeStatus(e) {
  //   setStatus(e.target.value)
  //   console.log(e.target.value)
  // }


  async function getTasks() {

    const response = await getAllTasksApi()

    if (response.status === 200) {
      const data = await response.json()


      setTasks(data)

    }


  }

  async function handleCreateTasks(e) {

    e.preventDefault()

    // const task = {
    //   titulo: titulo,
    //   descricao: descricao,
    //   status: status
    // }

    // const _task = {
    //   titulo,
    //   descricao,
    //   status
    // }



    const response = await createTasksApi(task)
    console.log("LELE", response)


    if (response.status === 201) {
      const currentTask = await response.json()
      const newTasks = [currentTask, ...tasks]

      setTasks(newTasks)
    }

  }

  async function handleDeleteTasks(id) {

    console.log("lele", id)
    const response = await deleteTasksApi(id)
    if (response.status === 204) {
      const newList = tasks.filter(task => task.id !== id)
      console.log("NEW LIST", newList)
      setTasks(newList)
      // tasks.filter((task)=>{return sdfsdf})

    }

  }

  function handleNewInputChange(e) {
    const { name, value } = e.target
    const newInput = { ...task, [name]: value }

    setTask(newInput)
  }

  function handleInputChange(e) {
    // const name = e.target.name
    // const value = e.target.value
    const { name, value } = e.target
    const newTaskValue = { ...task, [name]: value }

    setTask(newTaskValue)

  }

  useEffect(() => {
    getTasks();
  }, [])


  return (
    <div className="container">

      <form onSubmit={handleCreateTasks}>
        <h1>Cadastro de tarefas</h1>
        <input
          placeholder="Titulo..."
          name="titulo"
          type="text"
          onChange={(e) => handleInputChange(e)}
          value={task.titulo}
        />
        <input
          placeholder="Descrição..."
          name="descricao"
          type="text"
          onChange={(e) => handleInputChange(e)}
          value={task.descricao}
        />
        <input
          placeholder="Status..."
          name="status"
          type="text"
          onChange={(e) => handleInputChange(e)}
          value={task.status}
        />
        <button type="submit">Cadastrar</button>
      </form>


      {tasks.map(task => (

        <div key={task.id} className="card">
          <div key={task.id}>
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
          <hr></hr>
          <br></br>

          <p>Titulo: <span>{task.titulo}</span></p>
          <p>Tipo: <span>{task.descricao}</span></p>
          <p>Criado em: <span>{task.criado_em}</span></p>
          <p>status: <span>{task.status}</span></p>

          <div className="trash">
            <button className="deleteButton" onClick={() => handleDeleteTasks(task.id)}  >
              <LuTrash size={20} color="red" />
              {/* <img src={trash} /> */}
            </button>

            <button className="editButton" onClick={handleEnableEdit} >
              <CiEdit size={20} color="blue" />
            </button>
           
           
          </div>

        </div>
      ))}

    </div>
  );
}
