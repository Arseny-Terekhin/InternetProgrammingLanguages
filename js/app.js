let todos = [];

// загрузка при старте
loadTodos();

document.getElementById("addBtn").addEventListener("click", addTodo);

function addTodo() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (title === "") {
    alert("Введите название задачи");
    return;
  }

  const todo = {
    id: Date.now(),
    title,
    description,
    done: false
  };

  todos.push(todo);
  saveTodos();
  renderTodos();

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
}

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    if (todo.done) {
      li.classList.add("done");
    }

    li.innerHTML = `
            <strong>${todo.title}</strong><br>
            <small>${todo.description}</small><br>
            <button onclick="toggleDone(${todo.id})">✔</button>
            <button onclick="deleteTodo(${todo.id})">❌</button>
        `;

    list.appendChild(li);
  });
}

function toggleDone(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      todo.done = !todo.done;
    }
    return todo;
  });

  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);

  saveTodos();
  renderTodos();
}

// localStorage

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const data = localStorage.getItem("todos");

  if (data) {
    todos = JSON.parse(data);
    renderTodos();
  }
}
