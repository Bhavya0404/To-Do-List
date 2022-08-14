let tasks = [];
const taskList = document.getElementById("list");

function renderList() {
  taskList.innerHTML = "";
  console.log(tasks);
  tasks.map((data) => {
    // console.log(data)
    let li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" id=${data.id} data-id="12" class="completed">
        <label for=${data.id}>${data.text}</label>
        <img src="bin.png" class="delete"  id =${data.id} />
        `;
    taskList.appendChild(li);

    if (data.isDone == true) {
      document.getElementById(data.id).checked = true;
    }
  });

  document.getElementById('tasks-counter').innerText = tasks.length;
  const bin = document.getElementsByClassName("delete");
  for (let i = 0; i < bin.length; i++) {
    bin[i].onclick = function () {
      deleteTask(bin[i].id);
    };
  }

  const check = document.getElementsByClassName("completed");
  for (let i = 0; i < check.length; i++) {
    check[i].onclick = function () {
      toggleTask(check[i].id);
    };
  }
}

function addTask(text) {
  const task = {
    id: Date.now(),
    text: text,
    isDone: false,
  };

  tasks.push(task);
  renderList();
}

function toggleTask(taskId) {
  tasks.map((data) => {
    if (data.id == taskId) {
      data.isDone = !data.isDone;
    }
  });

  console.log(tasks);
  renderList();
}

function deleteTask(taskId) {
  const newTasks = tasks.filter((data) => {
    if (data.id != taskId) {
      return data;
    }
  });

  tasks = newTasks;
  renderList();
}

function enterKey(e) {
  addTask(e.target.value);
  document.getElementById("add").value = "";
}

document.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    enterKey(event);
  }
});
