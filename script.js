// Seleciona o formulário
const form = document.querySelector("#taskForm");

// Lista de tarefas
const taskList = document.querySelector("#taskList");

// Evento de envio do formulário
form.addEventListener("submit", function(event){

    event.preventDefault();

    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const priority = document.querySelector("#priority").value;

    if(title.trim() === ""){
        alert("Digite um título!");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <strong>${title}</strong><br>
        ${description}<br>
        Prioridade: ${priority}<br><br>
        <button class="completeBtn">Concluir</button>
        <button class="deleteBtn">Excluir</button>
    `;

    taskList.appendChild(li);

    // botão concluir
    const completeBtn = li.querySelector(".completeBtn");

    completeBtn.addEventListener("click", function(){
        li.style.textDecoration = "line-through";
    });

    // botão excluir
    const deleteBtn = li.querySelector(".deleteBtn");

    deleteBtn.addEventListener("click", function(){
        li.remove();
    });

    form.reset();

});