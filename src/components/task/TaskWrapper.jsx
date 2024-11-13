import { useContext, useEffect, useState } from "react";
import { getAllTasksApi } from "../../services/api";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { TaskContext } from "../../context/TaskProvider";

export function TaskWrapper() {



    return (
        // COMPONENTE QUE RENDERIZA NA TELA O MEU FORMULÁRIO E A MINHA LISTA DE TAREFAS.
        <div className="container">
            <TaskForm />
            <TaskList  />
        </div>
    )
}