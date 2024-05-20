import { GeneratorTask } from "./js/utils.js";
import "./css/base.css";

// Instancia de GeneratorTask
const generatorTask = new GeneratorTask();

// Elementos de la vista
const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const inputCreateTask = document.querySelector("input.new-todo");
const todoList = document.querySelector(".todo-list");
const filters = document.querySelectorAll(".filters li a");

// Contador de tareas
const counter = document.querySelector(".todo-count strong");

// Limpiear la lista de tareas
const clearCompleted = document.querySelector(".clear-completed");

// Función para renderizar si existen tareas
function renderIfExist() {
  if (!main || !footer) return;

  const tasks = generatorTask.getTasks();
  if (localStorage.length === 0) {
    main.style.display = "none";
    footer.style.display = "none";
    return 0;
  }

  main.style.display = "block";
  footer.style.display = "block";

  // Limpia la lista antes de volver a renderizar
  todoList.innerHTML = "";

  tasks.forEach((task) => {
    const element = generatorTask.renderTasks(task.id, task.title);
    if (task.completed) {
      element.classList.add("completed");
      element.querySelector(".toggle").checked = true;
    }
    todoList.appendChild(element);
  });

  counter.textContent = generatorTask.getTasks().length;

  generatorTask.renderCompletedTasks().length === 0
    ? (clearCompleted.style.display = "none")
    : (clearCompleted.style.display = "block");
  attachEventListeners();
}

// Función para adjuntar event listeners a las tareas
function attachEventListeners() {
  const todoItems = document.querySelectorAll(".todo-list li");

  todoItems.forEach((item) => {
    const checkbox = item.querySelector(".toggle");
    const label = item.querySelector("label");
    const destroyButton = item.querySelector(".destroy");

    checkbox.addEventListener("click", function () {
      const id = item.getAttribute("data-id");
      generatorTask.completeTask(Number(id));
      item.classList.toggle("completed");
      renderIfExist();
    });

    label.addEventListener("dblclick", function () {
      item.classList.add("editing");
      const editInput = item.querySelector(".edit");
      editInput.focus();
      editInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === "Esc") {
          item.classList.remove("editing");
          generatorTask.editTask(
            Number(item.getAttribute("data-id")),
            editInput.value
          );
          renderIfExist();
        }
      });
    });

    destroyButton.addEventListener("click", function () {
      const id = item.getAttribute("data-id");
      generatorTask.removeTask(Number(id));
      renderIfExist();
    });
  });
}

// Evento para filtrar tareas
filters.forEach((filter) => {
  filter.addEventListener("click", function () {
    filters.forEach((item) => item.classList.remove("selected"));
    filter.classList.add("selected");
  });
});

// Evento para limpiar tareas completadas
if (clearCompleted) {
  clearCompleted.addEventListener("click", function () {
    generatorTask.removeAllTasksCompleted();
    renderIfExist();
    clearCompleted.style.display = "none";
  });
}

// Evento para cargar la página
window.addEventListener("load", renderIfExist);

// Evento para cambio en la URL (hashchange)
window.addEventListener("hashchange", function () {
  const hash = window.location.hash;

  if (hash === "#/pending") {
    const activeTasks = generatorTask.renderActiveTasks();
    todoList.innerHTML = "";
    activeTasks.forEach((task) => {
      const element = generatorTask.renderTasks(task.id, task.title);
      todoList.appendChild(element);
    });
  } else if (hash === "#/completed") {
    const completedTasks = generatorTask.renderCompletedTasks();
    todoList.innerHTML = "";
    completedTasks.forEach((task) => {
      const element = generatorTask.renderTasks(task.id, task.title);
      element.classList.add("completed");
      element.querySelector(".toggle").checked = true;
      todoList.appendChild(element);
    });
  } else {
    renderIfExist();
  }
});

// Evento para crear una nueva tarea al presionar Enter
if (inputCreateTask) {
  inputCreateTask.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      const task = event.target.value.trim();
      if (task) {
        generatorTask.addTask(task);
        event.target.value = "";
        renderIfExist();
      }
    }
  });
}
