// Crée ici les selecteurs 

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")

//!!!!!!!!!!!!!!!!ECOUTEURS va nous permet de crée l'action addTodo qu'on va crée par la suite !!!!!!!!!!!!!!!!!!!!!!!!!
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo);

// CREATION DES FUNCTIONS !!!!!!!!!

function addTodo(event) {
    event.preventDefault(); // <= stock l'information en mémoire ! généralement dans les buttons des formulaires !
    ///Création de la div !
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    ///Création du li dans la div
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;//<= Nous permet de récupéré la valeur du button !
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo); //<= La methode appendChild permet d'ajouter newTodo donc le li, a ma div todoDIv !
    // Ajouter la todo au localstorage !!
    saveLocalTodos(todoInput.value);
    // création des buttons du li !!
    //BOUTON CHECK !!
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //Button supprimé
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //AJOUTER NOTRE TODO à NOTRE TODO-LIST
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}
////FUNCTION QUI PERMET EFFACER LA DIV
function deleteCheck(e){
    const item = e.target;
    //DELETE TODO
    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        //CETTE EVENEMENT VA ATTENDRE LA FIN DE L'ANIMATION DU CSS ET SUPRIMER COMPLETEMENT LA DIV
        todo.addEventListener("transitionend", function() {
        todo.remove();
        });
        
    }
    // CHECK
    if(item.classList[0] === "complete-btn") {
        const checkTodo = item.parentElement;
        checkTodo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes; //CECI NOUS PERMET DE RECUPERER LES ENFANTS DE LA TODOLIST
    todos.forEach(function (todo) { // IL FAUT CREE UNE BOUCLE FOREACH AFIN DE RECUPERE CHAQUE ELEMENT, ON CREE UNE FUNCTION QUI PREND LE PARAMETRE TODO
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos (todo) {
    //CHECKER SI IL YA DES ELEMENTS EXISTANT AU CAHRGEMENT DE LA PAGE
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if (localStorage.getItem["todos"] === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        ///Création du li dans la div
        const newTodo = document.createElement("li");
        newTodo.innerText = todo//<= Nous permet de récupéré la valeur du button !
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo); //<= La methode appendChild permet d'ajouter newTodo donc le li, a ma div todoDIv !
        // création des buttons du li !!
        //BOUTON CHECK !!
        const completeButton = document.createElement("button");
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);
        //Button supprimé
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //AJOUTER NOTRE TODO à NOTRE TODO-LIST
        todoList.appendChild(todoDiv);
    });
}

//CETTE FUNCTION VA NOUS PERMET D'EFFACER LES DIV 
function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem["todos"] === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}