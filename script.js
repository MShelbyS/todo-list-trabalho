let tasks = [];

// Seleciona o formulário
const form = document.querySelector("#taskForm");

// Seleciona a lista onde as tarefas vão aparecer
const taskList = document.querySelector("#taskList");

// Evento de envio do formulário
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const priority = document.querySelector("#priority").value;

    // Validação
    if (title.trim() === "") {
        alert("Digite um título para a tarefa!");
        return;
    }

    // Cria o item da lista
    const li = document.createElement("li");

    li.innerHTML = `
        <strong>${title}</strong><br>
        ${description}<br>
        Prioridade: ${priority}<br><br>

        <button class="completeBtn">Concluir</button>
        <button class="deleteBtn">Excluir</button>
    `;

    // Adiciona na lista
    taskList.appendChild(li);

    tasks.push({
    title: title,
    description: description,
    priority: priority
});

    localStorage.setItem("tasks", JSON.stringify(tasks));

    // BOTÃO CONCLUIR
    const completeBtn = li.querySelector(".completeBtn");

    completeBtn.addEventListener("click", function() {
        li.style.textDecoration = "line-through";
    });

    // BOTÃO EXCLUIR
    const deleteBtn = li.querySelector(".deleteBtn");

    deleteBtn.addEventListener("click", function() {
        li.remove();
    });

    // Limpa formulário
    form.reset();

});

window.addEventListener("load", function() {

    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);

        tasks.forEach(function(task) {

            const li = document.createElement("li");

            li.innerHTML = `
                <strong>${task.title}</strong><br>
                ${task.description}<br>
                Prioridade: ${task.priority}<br><br>

                <button class="completeBtn">Concluir</button>
                <button class="deleteBtn">Excluir</button>
            `;

            taskList.appendChild(li);

        });

    }

});