// script

const TODO_LIST = [];
let ID = 1;

document.querySelector("#add-task").addEventListener("click", function () {
  let taskInput = document.querySelector("#input-task");
  let taskName = taskInput.value.trim();

  //let countTasks = TODO_LIST.filter((t) => t.name === taskName).length;

  if (taskName === "") {
    document.querySelector("#todo-form").classList.add("was-validated");
    return;
  } else {
    document.querySelector("#todo-form").classList.remove("was-validated");

    let task = {
      id: ID++,
      name: taskInput.value.trim(),
      completed: false,
    };
    TODO_LIST.push(task);
    addTaskToTable();

    document.querySelector("#input-task").value = "";
    document.querySelector("#input-task").focus();
  }
});

function addTaskToTable() {
  let tableTemplate = "";
  TODO_LIST.forEach((task) => {
    tableTemplate += `
    <tr>
      <th scope="row">${task.id}</th>
      <td class="text-start">${task.name}</td>
      <td class="text-center">
      <div class="form-switch">
        <input class="form-check-input" type="checkbox" role="switch" ${
          task.completed ? "checked" : ""
        } onchange="changeStatusTask(${task.id});" >
      </div>
      </td>
      <td>
        <i class="fa-regular fa-trash-can" style="color: red" onclick="deleteTask(${
          task.id
        });" ></i>
      </td>
    </tr>
    `;
  });

  document.querySelector("#todo-table").innerHTML = tableTemplate;
  document.querySelector("#finished-tasks").innerHTML = TODO_LIST.filter(
    (t) => t.completed
  ).length;
  document.querySelector("#total-tasks").innerHTML = TODO_LIST.length;
}

function deleteTask(id) {
  const index = TODO_LIST.findIndex((task) => task.id === id);
  if (index !== -1) {
    TODO_LIST.splice(index, 1);
    addTaskToTable();
  }
}

function changeStatusTask(id) {
  const task = TODO_LIST.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    addTaskToTable();
  }
}
