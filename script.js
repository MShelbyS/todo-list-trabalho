// ===============================
// Carrega as tarefas salvas no navegador
// Se não existir nenhuma, cria um array vazio
// ===============================
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// ===============================
// Função responsável por salvar o array de tarefas
// no localStorage do navegador
// ===============================
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ===============================
// Seleciona elementos do HTML
// ===============================
const form = document.querySelector("#taskForm");
const taskList = document.querySelector("#taskList");


// ===============================
// Função responsável por renderizar
// (mostrar) todas as tarefas na tela
// ===============================
function renderTasks() {

    // Limpa a lista antes de renderizar novamente
    taskList.innerHTML = "";

    // Percorre todas as tarefas do array
    tasks.forEach((task, index) => {

        // Cria elemento da lista
        const li = document.createElement("li");

        // Conteúdo da tarefa
        li.innerHTML = `
            <strong>${task.title}</strong><br>
            ${task.description}<br>
            Prioridade: ${task.priority}<br><br>

            <button class="completeBtn">Concluir</button>
            <button class="deleteBtn">Excluir</button>
        `;

        // Se a tarefa estiver marcada como concluída
        // aplica o estilo de texto riscado
        if (task.completed) {
            li.style.textDecoration = "line-through";
        }

        // Seleciona os botões
        const completeBtn = li.querySelector(".completeBtn");
        const deleteBtn = li.querySelector(".deleteBtn");


        // ===============================
        // Evento para marcar tarefa como concluída
        // Alterna entre concluída e não concluída
        // ===============================
        completeBtn.addEventListener("click", function () {

            task.completed = !task.completed;

            saveTasks();

            renderTasks();

        });


        // ===============================
        // Evento para excluir tarefa
        // Remove do array e salva novamente
        // ===============================
        deleteBtn.addEventListener("click", function () {

            tasks.splice(index, 1);

            saveTasks();

            renderTasks();

        });

        // Adiciona a tarefa na lista HTML
        taskList.appendChild(li);

    });

}


// ===============================
// Evento de envio do formulário
// Cria uma nova tarefa
// ===============================
form.addEventListener("submit", function (event) {

    // Impede a página de recarregar
    event.preventDefault();

    // Captura os valores dos campos
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const priority = document.querySelector("#priority").value;

    // Verifica se o título foi preenchido
    if (title.trim() === "") {
        alert("Digite um título!");
        return;
    }

    // Cria objeto da tarefa
    const task = {
        title: title,
        description: description,
        priority: priority,
        completed: false
    };

    // Adiciona a tarefa ao array
    tasks.push(task);

    // Salva no localStorage
    saveTasks();

    // Atualiza a lista na tela
    renderTasks();

    // Limpa os campos do formulário
    form.reset();

});


// ===============================
// Renderiza as tarefas ao carregar o site
// ===============================
renderTasks();