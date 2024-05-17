// export const sayHello = (text) => {
//   return text;
// };

class Task {
  constructor(title) {
    this.id = Date.now();
    this.title = title;
    this.completed = false;
  }
}

export class GeneratorTask {
  constructor() {
    this.tasks = [];
  }

  addTask(title) {
    const task = new Task(title.trim());
    this.tasks.push(task);
    return this.renderTasks(task.id, task.title);
  }

  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  getTask(id) {
    return this.tasks.find((task) => task.id === id);
  }

  getTasks() {
    return this.tasks;
  }

  removeAllTasks() {
    this.tasks = [];
  }

  completeTask(id) {
    const task = this.getTask(id);
    task.completed = !task.completed;
  }

  editTask(id, title) {
    const task = this.getTask(id);
    task.title = title;
  }

  renderTasks(id, title) {
    const taskElement = document.createElement("li");
    taskElement.setAttribute("data-id", id);

    taskElement.innerHTML = `
        <div class="view">
            <input class="toggle" type="checkbox">
            <label>${title}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${title}">
    `;

    return taskElement;
  }

  renderCompletedTasks() {
    return this.tasks.filter((task) => task.completed);
  }

  renderActiveTasks() {
    return this.tasks.filter((task) => !task.completed);
  }

  persistData() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
}

{
  /* <li>
  <div class="view">
    <input class="toggle" type="checkbox">
    <label>Buy a unicorn</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="Buy a unicorn">
</li> */
}

// Tarea Checkeada
{
  /* <div class="view">
  <input class="toggle" type="checkbox" checked="checked">
  <label>Learn JavaScript</label>
  <button class="destroy"></button>
</div> */
}

// Tarea sin Checkear
{
  /* <div class="view">
  <input class="toggle" type="checkbox">
  <label>Buy a unicorn</label>
  <button class="destroy"></button>
</div> */
}

// Tarea Editada
{
  /* <li class="editing">
  <div class="view"><input class="toggle" type="checkbox">
   <label>Make dishes</label>
   <button class="destroy"></button>
   </div>
   <input class="edit" value="Make dishes">
</li> */
}
