var listElement = document.querySelector('body #app ul');
var inputElement = document.querySelector('body #app input');
var buttonElement = document.querySelector('body #app button');

var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodos(){
listElement.innerHTML = '';

    for(todo of todos){
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);

        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');

        var position = todos.indexOf(todo);
        linkElement.setAttribute('onclick', 'deleteTodo('+position+')');

        var linkText = document.createTextNode('Excluir');
        linkElement.appendChild(linkText);

        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);

        listElement.appendChild(todoElement);
    }
}

renderTodos();

function addTodo(){
    var todoText = inputElement.value;

    todos.push(todoText);
    inputElement.value = '';

    renderTodos();
    salveToStorage();
}

buttonElement.onclick = addTodo;

function deleteTodo(position){
    todos.splice(position, 1);
    renderTodos();
    salveToStorage();
}

function salveToStorage(){
    localStorage.setItem('list_todos', JSON.stringify(todos));
}