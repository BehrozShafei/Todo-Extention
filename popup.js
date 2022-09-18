const taskInput = document.querySelector(".task-input input"),
  filters = document.querySelectorAll(".filters span"),
  clearAll = document.querySelector(".clear-btn"),
  taskBox = document.querySelector(".task-box");

let editId,
  isEditTask = false,
  todos = JSON.parse(localStorage.getItem("todo-list"));

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
        
        liTag += `<li class="task">
                            <label for="${id}">
                                <input class="trstttttttt"  type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                            <i onclick='deleteTask(${id}, "${filter}")' class='fa-solid fa-remove' style='color:red;font-size:25px'></i>
                            <i onclick='editTask(${id}, "${todo.name}")' class='fa-solid fa-edit' style='color:blue'></i>
                            <i onclick='startCount(${id}, "${filter}")'class='fa-solid fa-clock'style='color:gray' ></i>
                            <p class="timer-text"><span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span></p>
                            </div>
                        </li>`;
      
      }
    });
  }
  
  taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
  let test = document.querySelectorAll(".trstttttttt")
 Array.from(test).map((post) => {
  post.addEventListener("click", someFunction);
function someFunction(event) {
  console.log(event.target.id);
  if(event.target.id)updateStatus(post)
}
  })


  
  let checkTask = taskBox.querySelectorAll(".task");
  !checkTask.length
    ? clearAll.classList.remove("active")
    : clearAll.classList.add("active");
  taskBox.offsetHeight >= 300
    ? taskBox.classList.add("overflow")
    : taskBox.classList.remove("overflow");
}

function showMenu(selectedTask) {
  let menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      menuDiv.classList.remove("show");
    }
  });
}

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    console.log("Please select===>>>>electedTask.checked"+selectedTask.checked)


    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}
const startCount=()=>{
 let hoursSpan= '.hours';
 let  minutesSpan= '.minutes';
 let secondsSpan= '.seconds'
  const seconds = document.querySelector(secondsSpan);
            const minutes = document.querySelector(minutesSpan);
            const hours = document.querySelector(hoursSpan); 

            let sec = 0;
            intervalID = setInterval(function() {
                sec++;
                seconds.textContent = (`0${sec % 60}`).substr(-2);
                minutes.textContent = (`0${(parseInt(sec / 60)) % 60}`).substr(-2);
                hours.textContent = (`0${parseInt(sec / 3600)}`).substr(-2);
            }, 1000);
}
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
