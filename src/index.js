import "./css/base.css";

import { GeneratorTask } from "./js/utils.js";

export const generatorTask = new GeneratorTask();

// elmentos de la vista.
export const main = document.querySelector(".main");
export const footer = document.querySelector(".footer");
// elemento de entrada de texto.
export const inputCreateTask = document.querySelector("input.new-todo");
// elementos de lista.
export const todoList = document.querySelector(".todo-list");
export const todo = document.querySelectorAll("li");
export const destroy = document.querySelectorAll(".destroy");
export const toggleChecked = document.querySelectorAll(".toggle");

function renderIfExist() {
  if (generatorTask.getTasks().length === 0) {
    main.style.display = "none";
    footer.style.display = "none";
    return 0;
  }
  main.style.display = "block";
  footer.style.display = "block";
}

window.addEventListener("load", renderIfExist);

window.addEventListener("hashchange", function () {
  console.log("La URL ha cambiado!");
});

inputCreateTask.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const task = event.target.value;
    const element = generatorTask.addTask(task);
    event.target.value = "";
    renderIfExist();

    todoList.append(element);
  }
});
