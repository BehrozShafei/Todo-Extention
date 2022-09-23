const taskInput = document.querySelector(".task-input input"),
  filters = document.querySelectorAll(".filters span"),
  clearAll = document.querySelector(".clear-btn"),
  taskBox = document.querySelector(".task-box");

let editId,
  isEditTask = false,
  todos = JSON.parse(localStorage.getItem("todo-list"));
const hoursSpan = ".hours";
const minutesSpan = ".minutes";
const secondsSpan = ".seconds";
const clockIcon = ".fa-clock";
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});

showTodo("all");

function showTodo(filter) {
  let liTag = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let completed = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        if (todo.time > 0) {
          setTimeout(() => {
            setTimer(todo.time, id);
          }, 100);
        }
        liTag += `<li class="task">
                            <label for="${id}">
                                <input class="mainDiv"  type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                            <i onclick='deleteTask(${id}, "${filter}")' class='fa-solid fa-remove' style='color:red;font-size:25px'></i>
                            <i onclick='editTask(${id}, "${todo.name}")' class='fa-solid fa-edit' style='color:blue'></i>
                            <i onclick='startCount(${id},"${todo.status}")'class='fa-solid fa-clock'style='color:gray' ></i>
                            <p class="timer-text"><span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span></p>
                            </div>
                        </li>`;
      }
    });
  }
  taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
  let msinDivElement = document.querySelectorAll(".mainDiv");
  Array.from(msinDivElement).map((post) => {
    post.addEventListener("click", someFunction);
    function someFunction(event) {
      console.log(event.target.id);
      if (event.target.id) updateStatus(post);
    }
  });

  let checkTask = taskBox.querySelectorAll(".task");
  !checkTask.length
    ? clearAll.classList.remove("active")
    : clearAll.classList.add("active");
  taskBox.offsetHeight >= 300
    ? taskBox.classList.add("overflow")
    : taskBox.classList.remove("overflow");
}

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}
const setTimer = (sec, id) => {
  const seconds = document.querySelectorAll(secondsSpan)[id];
  const minutes = document.querySelectorAll(minutesSpan)[id];
  const hours = document.querySelectorAll(hoursSpan)[id];
  seconds.textContent = `0${sec % 60}`.substr(-2);
  minutes.textContent = `0${parseInt(sec / 60) % 60}`.substr(-2);
  hours.textContent = `0${parseInt(sec / 3600)}`.substr(-2);
};
const startCount = (id, status) => {
  console.log("status", status);

  if (status === "completed") {
  } else {
    console.log(
      "document.querySelector(minutesSpan)",
      document.querySelectorAll(minutesSpan)
    );
    let sec = todos[id].time || 0;
    let clock = document.querySelectorAll(clockIcon)[id];
    debugger;
    if (!todos[id].stream) {
      clock.style.color = "green";
      clock.style["font-size"] = "30px";
      const seconds = document.querySelectorAll(secondsSpan)[id];
      const minutes = document.querySelectorAll(minutesSpan)[id];
      const hours = document.querySelectorAll(hoursSpan)[id];
      intervalID = setInterval(function () {
        sec++;
        seconds.textContent = `0${sec % 60}`.substr(-2);
        minutes.textContent = `0${parseInt(sec / 60) % 60}`.substr(-2);
        hours.textContent = `0${parseInt(sec / 3600)}`.substr(-2);
        console.log("sec", sec);
        todos[id].time = sec;
      }, 1000);
      todos[id].stream = true;
    } else {
      debugger;
      todos[id].time = sec;
      clearInterval(intervalID);
      todos[id].stream = false;
      clock.style.color = "#ff00f8";
      clock.style["font-size"] = "25px";
    }
  }
};
function editTask(taskId, textName) {
  editId = taskId;
  isEditTask = true;
  taskInput.value = textName;
  taskInput.focus();
  taskInput.classList.add("active");
}

function deleteTask(deleteId, filter) {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(filter);
}

clearAll.addEventListener("click", () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
});

taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!isEditTask) {
      todos = !todos ? [] : todos;
      let taskInfo = { name: userTask, status: "pending" };
      todos.push(taskInfo);
    } else {
      isEditTask = false;
      todos[editId].name = userTask;
    }
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(document.querySelector("span.active").id);
  }
});
