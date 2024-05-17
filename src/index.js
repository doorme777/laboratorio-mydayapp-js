import "./css/base.css";

import { GeneratorTask } from "./js/utils.mjs";

export const generatorTask = new GeneratorTask();

export const main = document.querySelector(".main");
export const footer = document.querySelector(".footer");

window.addEventListener("load", function () {
  console.log("La página ha cargado!");
  if (generatorTask.getTasks().length === 0) {
    main.style.display = "none";
    footer.style.display = "none";
    return 0;
  }
  main.style.display = "block";
  footer.style.display = "block";
});

window.addEventListener("hashchange", function () {
  console.log("La URL ha cambiado!");
});
