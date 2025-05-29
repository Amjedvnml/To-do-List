const form = document.getElementById("to-do-form");
const input = document.getElementById("to-do-input");
const list = document.getElementById("todo-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const task = input.value.trim();
    if (task !== "") {
        addTask(task);
        tasks.push(task);
        updateLocalStorage();
        input.value = "";
    }
});

function addTask(task, index = tasks.length - 1) {
    const li = document.createElement("li");
    li.textContent = task;

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.style.transform = "scale(1.5)";
    checkBox.style.marginRight = "10px";
    checkBox.onclick = function () {
        li.style.textDecoration = checkBox.checked ? "line-through" : "none";
    };

    li.prepend(checkBox);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.style.marginLeft = "10px";
    delBtn.onclick = function () {
        list.removeChild(li);
        tasks.splice(index, 1);
        updateLocalStorage();
        renderTasks();
    };

    checkBox.style.cursor = "pointer";
    checkBox.style.width = "50px";
    checkBox.style.backgroundColor = "#3dff3d";

    delBtn.style.backgroundColor = "#f44336";
    delBtn.style.color = "white";  
    delBtn.style.border = "none";
    delBtn.style.outline = "none";
    delBtn.style.padding = "8px 10px";
    delBtn.style.borderRadius = "4px";
    delBtn.style.cursor = "pointer";

    li.appendChild(delBtn);
    list.appendChild(li);
}

function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    list.innerHTML = "";
    tasks.forEach((task, index) => {
        addTask(task, index);
    });
}

renderTasks();
