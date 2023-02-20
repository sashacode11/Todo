"use strict";
const btn = document.getElementById("btn");
const input = document.getElementById("input");
const form = document.querySelector("form");
const list = document.getElementById("list");
const todos = readTodo();
todos.forEach(createList);
function readTodo() {
    const todosJSON = localStorage.getItem('todos');
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
}
function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
        text: input.value,
        completed: false
    };
    todos.push(newTodo);
    createList(newTodo);
    saveTodo();
    input.value = '';
}
function saveTodo() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
function createList(todo) {
    const todoLI = document.createElement('li');
    todoLI.style.fontSize = '24px';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        saveTodo();
    });
    todoLI.append(todo.text);
    list.append(todoLI);
    todoLI.append(checkbox);
    const remove = document.createElement('span');
    remove.className = 'fa fa-trash';
    remove.addEventListener('click', () => {
        list.removeChild(todoLI);
        const todoIndex = todos.findIndex(todo => todo.text === todoLI.textContent);
        todos.splice(todoIndex, 1);
        saveTodo();
    });
    list.append(remove);
    todoLI.append(remove);
}
form.addEventListener('submit', handleSubmit);
