// ===============================
// Carrega tarefas salvas no navegador
// Caso não exista nenhuma, cria um array vazio
// ===============================
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// ===============================
// Salva tarefas no localStorage
// ===============================
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ===============================
// Seleciona elementos do HTML
// ===============================
const form = document.querySelector("#taskForm");
const taskList = document.querySelector("#taskList");
const searchInput = document.querySelector("#search");


// ===============================
// Função responsável por renderizar
// (mostrar) as tarefas na tela
// ===============================
function renderTasks(filter=""){

    taskList.innerHTML = "";

    // filtra tarefas pela pesquisa
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

    filteredTasks.forEach((task) => {

        const li = document.createElement("li");

        // define status da tarefa
        const status = task.completed ? "Concluída" : "Pendente";

        li.innerHTML = `
            <strong>${task.title}</strong><br>
            ${task.description}<br>
            Prioridade: ${task.priority}<br>
            Criado em: ${task.date}<br>
            Status: ${status}<br><br>

            <button class="completeBtn">Concluir</button>
            <button class="editBtn">Editar</button>
            <button class="deleteBtn">Excluir</button>
        `;

        // aplica estilo se concluída
        if(task.completed){
            li.style.textDecoration = "line-through";
        }

        const completeBtn = li.querySelector(".completeBtn");
        const deleteBtn = li.querySelector(".deleteBtn");
        const editBtn = li.querySelector(".editBtn");


        // ===============================
        // Marca tarefa como concluída
        // ===============================
        completeBtn.addEventListener("click", function(){

            task.completed = !task.completed;

            saveTasks();

            renderTasks(searchInput.value);

        });


        // ===============================
        // Exclui tarefa
        // ===============================
        deleteBtn.addEventListener("click", function(){

            const index = tasks.indexOf(task);

            tasks.splice(index,1);

            saveTasks();

            renderTasks(searchInput.value);

        });


        // ===============================
        // Edita tarefa existente
        // ===============================
        editBtn.addEventListener("click", function(){

            const newTitle = prompt("Editar título:", task.title);
            const newDescription = prompt("Editar descrição:", task.description);
            const newPriority = prompt("Editar prioridade (Baixa, Média, Alta):", task.priority);

            if(newTitle !== null && newTitle.trim() !== ""){
                task.title = newTitle;
            }

            if(newDescription !== null){
                task.description = newDescription;
            }

            if(newPriority !== null){
                task.priority = newPriority;
            }

            saveTasks();

            renderTasks(searchInput.value);

        });

        taskList.appendChild(li);

    });

}


// ===============================
// Evento de envio do formulário
// Cria nova tarefa
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
// Pesquisa tarefas pelo título
// ===============================
searchInput.addEventListener("input", function(){

    renderTasks(searchInput.value);

});


// ===============================
// Renderiza tarefas ao abrir o site
// ===============================
renderTasks();