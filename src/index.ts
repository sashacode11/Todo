interface Todo {
  text: string,
  completed: boolean
}

const btn = document.getElementById("btn")!;
const input = document.getElementById("input")! as HTMLInputElement;
const form = document.querySelector("form")!;
const list = document.getElementById("list")!;

const todos: Todo[] = readTodo();
todos.forEach(createTodo);

function readTodo() {
  const todosJSON = localStorage.getItem('todos');
  if(todosJSON === null) return [];
  return JSON.parse(todosJSON);
}

function saveTodo() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
function createTodo(todo: Todo) {
  const todoLI = createTodoLI(todo);
  const checkbox = createCheckbox(todo, todoLI);
  const remove = createRemoveTodo(todo, todoLI);

  todoLI.append(todo.text, checkbox, remove);
  list.append(todoLI, remove);
}

function createTodoLI(todo: Todo) {
  const todoLI = document.createElement('li');
  todoLI.style.fontSize = '24px';
  return todoLI;
}

function createCheckbox(todo: Todo, todoLI: HTMLElement): HTMLInputElement {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', () => {
    todo.completed = checkbox.checked;
    saveTodo();
  });
  return checkbox;
}

function createRemoveTodo(todo: Todo, todoLI: HTMLElement): HTMLElement {
  const remove = document.createElement('span');
  remove.className = 'fa fa-trash';
  remove.addEventListener('click', () => {
    list.removeChild(todoLI);

    const todoIndex = todos.findIndex(todo => todo.text === todoLI.textContent);
    todos.splice(todoIndex, 1);    
    saveTodo();
  })
  return remove;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTodo = {
    text: input.value,
    completed: false
  }
  todos.push(newTodo);
  createTodo(newTodo);
  saveTodo();
  input.value = ''; 
});
