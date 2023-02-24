const todoinput = document.querySelector(".todo-input")
const todobutton = document.querySelector(".todo-button")
const todolist = document.querySelector(".todo-list")
const todo_option = document.querySelector(".filter-todo")

todobutton.addEventListener("click",addtodobtn)
todolist.addEventListener("click",deleteComplete_Todo)
todo_option.addEventListener("click",filter_todo)



function addtodobtn(event){
    event.preventDefault();
    const tododiv = document.createElement("div")
    tododiv.classList.add("todo")
    const litodo = document.createElement("li")
    litodo.innerText = todoinput.value;
    console.log(litodo)
    localstoragetodos(todoinput.value)
    litodo.classList.add("todo-item")
    tododiv.appendChild(litodo)
    todoinput.value="";
    const completedbtn = document.createElement("button");
    completedbtn.innerHTML="<i class='fas fa-check'></i>";
    completedbtn.classList.add("complete-btn");
    tododiv.appendChild(completedbtn);
    const trashdbtn = document.createElement("button");
    trashdbtn.innerHTML="<i class='fas fa-trash'></i>";
    trashdbtn.classList.add("trash-btn");
    tododiv.appendChild(trashdbtn);
    todolist.appendChild(tododiv);
}
function deleteComplete_Todo (event){
    // console.log(event.target)
    const e = event.target;
    console.log(e.parentElement)
    if(e.classList[0] === "trash-btn"){
        const transh = e.parentElement;
        transh.remove();
        localStorageremove(transh)
    }else if(e.classList[0] === "complete-btn"){
        const complete = e.parentElement;
        complete.classList.toggle("completed")
    }


}
function filter_todo(event){ 
    const todo_filter = todolist.childNodes;
    // console.log(todo_filter)
    todo_filter.forEach(function(todo){
        switch(event.target.value){
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
                if (todo.classList.contains("completed")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break;
        }
    })

}
function localstoragetodos (todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos))
}
function localStorageremove(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex),1);
    localStorage.setItem("todos", JSON.stringify(todos)); 
    
    console.log(todoindex)
}