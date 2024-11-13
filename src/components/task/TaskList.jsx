import React, { useContext } from "react";
import { TaskItem } from "./TaskItem";
import { TaskContext } from "../../context/TaskProvider";

export const TaskList = () => {

    const { tasks } = useContext(TaskContext)

    return (
        <>
            {
                // ESTA FUNÇÃO VAI MAPEAR TODOS OS ITENS DAS TAREFAS, DA MINHA LISTA DE TAREFAS E VAI RENDERIZAR NA TELA QUANDO QUANDO A PÁGINA FOR CARREGADA,
                // ATRAVÉS DO USEEFFECT, UM HOOK DO HEACT QUE CHAMA A FUNÇÃO GETTASKS().      
                tasks.map((task) => (
                    <TaskItem data={task} key={task.id} />
                ))
            }
        </>
    )
}