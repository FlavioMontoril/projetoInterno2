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

    return await fetch(
        `${baseUrl}/tarefas/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
           
        }
    )
}

export async function editTasksApi(id, updateData) {
    
    console.log("Editou a tarefa", updateData)
    return await fetch(
        `${baseUrl}/tarefas/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(updateData)
        }
    )
}