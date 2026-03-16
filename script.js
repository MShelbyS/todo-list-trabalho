// ===============================
// Carrega tarefas salvas no navegador
// Caso não exista nenhuma, cria um array vazio
// ===============================
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// ===============================
// Função responsável por salvar tarefas
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
const searchInput = document.querySelector("#search");


// ===============================
// Função responsável por mostrar
// as tarefas na tela
// ===============================
function renderTasks(filter = "") {

    // limpa lista antes de renderizar
    taskList.innerHTML = "";

    // filtra tarefas pela busca
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(filter.toLowerCase())
    );

    // se não houver tarefas
    if(filteredTasks.length === 0){

        const li = document.createElement("li");
        li.textContent = "Nenhuma tarefa cadastrada";

        taskList.appendChild(li);

        return;
    }

    // percorre tarefas filtradas
    filteredTasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${task.title}</strong><br>
            ${task.description}<br>
            Prioridade: ${task.priority}<br>
            Criado em: ${task.date}<br><br>

            <button class="completeBtn">Concluir</button>
            <button class="deleteBtn">Excluir</button>
        `;

        // aplica estilo se tarefa concluída
        if(task.completed){
            li.style.textDecoration = "line-through";
        }

        const completeBtn = li.querySelector(".completeBtn");
        const deleteBtn = li.querySelector(".deleteBtn");


        // ===============================
        // Evento para concluir tarefa
        // ===============================
        completeBtn.addEventListener("click", function(){

            task.completed = !task.completed;

            saveTasks();

            renderTasks(searchInput.value);

        });


        // ===============================
        // Evento para excluir tarefa
        // ===============================
        deleteBtn.addEventListener("click", function(){

            const realIndex = tasks.indexOf(task);

            tasks.splice(realIndex,1);

            saveTasks();

            renderTasks(searchInput.value);

        });

        taskList.appendChild(li);

    });

}


// ===============================
// Evento de envio do formulário
// Cria uma nova tarefa
// ===============================
form.addEventListener("submit", function(event){

    event.preventDefault();

    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const priority = document.querySelector("#priority").value;

    if(title.trim() === ""){
        alert("Digite um título!");
        return;
    }

    // cria objeto da tarefa
    const task = {
        title: title,
        description: description,
        priority: priority,
        date: new Date().toLocaleDateString(),
        completed: false
    };

    tasks.push(task);

    saveTasks();

    renderTasks(searchInput.value);

    form.reset();

});


// ===============================
// Evento de pesquisa de tarefas
// Filtra tarefas pelo título
// ===============================
searchInput.addEventListener("input", function(){

    renderTasks(searchInput.value);

});


// ===============================
// Mostra tarefas ao abrir o site
// ===============================
renderTasks();