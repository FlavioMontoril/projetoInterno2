const baseUrl = 'http://localhost:4001'

export async function getAllTasksApi(){
   return await fetch(`${baseUrl}/tarefas`)
}

export async function createTasksApi(task){

    console.log("Chegou task", task)
    return await fetch(
        `${baseUrl}/tarefas`, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        }
)
}

export async function deleteTasksApi(id){

    console.log("Apagou tarefa", id)
    return await fetch(
        `${baseUrl}/tarefas/${encodeURIComponent(id)}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
           
        }
    )

}