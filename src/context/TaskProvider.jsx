import { createContext, useContext, useEffect, useState } from "react";
import { createTasksApi, deleteTasksApi, editTasksApi, getAllTasksApi } from "../services/api";




export const TaskContext = createContext(undefined)


export function useTask() {
    const ctx = useContext(TaskContext)

    if (!ctx) {
        console.log('')
        throw new Error('useTasks deve ser usado dentro do contexto')

    }

    return ctx
}



export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([])

    // ESSA FUNÇÃO É RESPONSÁVEL POR BUSCAR AS MINHAS TAREFAS CRIADAS.
    async function getTasks() {
        const response = await getAllTasksApi()
        if (response.status === 200) {
            const data = await response.json()
            setTasks(data)
        }
    }


    async function createTask(task) {
        try {

            const response = await createTasksApi(task)

            if (response.status === 201) {
                const currentTask = await response.json()
                // const newTasks = [currentTask, ...taskList]

                setTasks((state) => [currentTask, ...state])
            }
            else {
                alert("Insira as informações necessárias")
            }
        } catch (error) {
            console.log(error)

        }
    }

    async function editTask(newValuesTask) {
        try {
            const { id, titulo, descricao, criado_em, status } = newValuesTask

            const response = await editTasksApi(id, { titulo, descricao, criado_em, status })
            if (response.status === 200) {

                const newTaksEdit = tasks.map((task) => {
                    if (task.id === newValuesTask.id) {
                        return newValuesTask
                    } else {
                        return task
                    }
                })

                setTasks(newTaksEdit)
            }

        } catch (error) {
            console.log(error)
        }

    }

    async function deleteTask(id) {
        const response = await deleteTasksApi(id)
        if (response.status === 204) {

            const index = tasks.findIndex((task) => task.id === id)
            const newTasks = tasks.splice(index, 1)
            setTasks((state) => [...newTasks])
            console.log("Esta exluindo")
        }
    }
    console.log(tasks)
    useEffect(() => {
        getTasks();
    }, [])

    return (
        <TaskContext.Provider value={{ tasks, setTasks, createTask, editTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    )
}