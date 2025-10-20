const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(".todo-app__button_add");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

function createNewTaskElement(taskText) {
    const li = document.createElement("li");
    li.className = "todo-app__task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-app__checkbox";

    const label = document.createElement("label");
    label.className = "todo-app__label todo-app__label_task";
    label.innerText = taskText;

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "todo-app__task-input";

    const editButton = document.createElement("button");
    editButton.className = "todo-app__button todo-app__button_edit";
    editButton.innerText = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.className = "todo-app__button todo-app__button_delete";
    const deleteImg = document.createElement("img");
    deleteImg.src = "./remove.svg";
    deleteImg.alt = "Remove Task";
    deleteButton.appendChild(deleteImg);

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(editInput);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    bindTaskEvents(li);

    return li;
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const listItem = createNewTaskElement(taskText);
    incompleteTaskHolder.appendChild(listItem);
    taskInput.value = "";
}

function editTask() {
    const listItem = this.closest("li");
    const label = listItem.querySelector(".todo-app__label_task");
    const input = listItem.querySelector(".todo-app__task-input");
    const btn = listItem.querySelector(".todo-app__button_edit");

    if (listItem.classList.contains("todo-app__task-item_edit-mode")) {
        label.innerText = input.value.trim() || label.innerText;
        btn.innerText = "Edit";
    } else {
        input.value = label.innerText;
        btn.innerText = "Save";
    }

    listItem.classList.toggle("todo-app__task-item_edit-mode");
}

function deleteTask() {
    const listItem = this.closest("li");
    listItem.parentNode.removeChild(listItem);
}

function taskCompleted() {
    const listItem = this.closest("li");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem);
}

function taskIncomplete() {
    const listItem = this.closest("li");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem);
}

function bindTaskEvents(li) {
    const checkbox = li.querySelector(".todo-app__checkbox");
    const editBtn = li.querySelector(".todo-app__button_edit");
    const deleteBtn = li.querySelector(".todo-app__button_delete");

    editBtn.onclick = editTask;
    deleteBtn.onclick = deleteTask;

    checkbox.onchange = function() {
        if (this.checked) taskCompleted.call(this);
        else taskIncomplete.call(this);
    };
}

addButton.onclick = addTask;

taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

Array.from(incompleteTaskHolder.children).forEach(bindTaskEvents);
Array.from(completedTasksHolder.children).forEach(bindTaskEvents);
