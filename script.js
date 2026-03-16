let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Seleciona elementos
const form = document.querySelector("#taskForm");
const taskList = document.querySelector("#taskList");

// Função para criar tarefa na tela
function createTaskElement(task){

    const li = document.createElement("li");

    li.innerHTML = `
        <strong>${task.title}</strong><br>
        ${task.description}<br>
        Prioridade: ${task.priority}<br><br>
        <button class="completeBtn">Concluir</button>
        <button class="deleteBtn">Excluir</button>
    `;

    taskList.appendChild(li);

    const completeBtn = li.querySelector(".completeBtn");
    const deleteBtn = li.querySelector(".deleteBtn");

    completeBtn.addEventListener("click", function(){
        li.style.textDecoration = "line-through";
    });

    deleteBtn.addEventListener("click", function(){

        const index = Array.from(taskList.children).indexOf(li);

        tasks.splice(index,1);

        saveTasks();

        li.remove();

    });
}

// Evento do formulário
form.addEventListener("submit", function(event){

    event.preventDefault();

    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const priority = document.querySelector("#priority").value;

    if(title.trim() === ""){
        alert("Digite um título!");
        return;
    }

    const task = {
        title: title,
        description: description,
        priority: priority
    };

    tasks.push(task);

    saveTasks();

    createTaskElement(task);

    form.reset();

});

// Carregar tarefas salvas
tasks.forEach(task => {
    createTaskElement(task);
});