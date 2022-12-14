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
        <label for=${data.id}>${data.title}</label>
        <img src="bin.png" class="delete"  id =${data.id} />
        `;
    taskList.appendChild(li);

    if (data.completed == true) {
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
    title: text,
    completed: false,
  };

  tasks.push(task);
  renderList();
}

function toggleTask(taskId) {
  tasks.map((data) => {
    if (data.id == taskId) {
      data.completed = !data.completed;
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


async function fetchToDos(){
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos');
        let todos = await res.json();
        todos = todos.slice(0, 10);

        tasks = todos;
        renderList();
    } catch(error){
        console.log("error", error);
    }
}

fetchToDos()