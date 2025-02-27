// Refactored JavaScript for Todo App

const taskInput = document.getElementById("new-task");
const addButton = document.querySelector("button");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

// Create a new task list item
const createNewTaskElement = (taskString) => {
    const listItem = document.createElement("li");

    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const deleteButtonImg = document.createElement("img");

    label.innerText = taskString;
    label.className = "task";

    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput.className = "task";

    editButton.innerText = "Edit";
    editButton.className = "edit";

    deleteButton.className = "delete";
    deleteButtonImg.src = "./remove.svg";
    deleteButton.appendChild(deleteButtonImg);

    listItem.append(checkBox, label, editInput, editButton, deleteButton);
    return listItem;
};

const addTask = () => {
    if (!taskInput.value.trim()) return;
    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
};

const editTask = function () {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector("input[type=text]");
    const label = listItem.querySelector("label");
    const editBtn = listItem.querySelector(".edit");
    const isEditMode = listItem.classList.toggle("edit-mode");

    if (isEditMode) {
        // Switch to edit mode
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
        editInput.style.display = "inline-block";
        label.style.display = "none";
    } else {
        // Switch to view mode
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
        editInput.style.display = "none";
        label.style.display = "inline-block";
    }
};

const deleteTask = function () {
    this.parentNode.remove();
};

const taskCompleted = function () {
    completedTasksHolder.appendChild(this.parentNode);
    bindTaskEvents(this.parentNode, taskIncomplete);
};

const taskIncomplete = function () {
    incompleteTaskHolder.appendChild(this.parentNode);
    bindTaskEvents(this.parentNode, taskCompleted);
};

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.edit");
    const deleteButton = taskListItem.querySelector("button.delete");

    editButton.addEventListener("click", editTask);
    deleteButton.addEventListener("click", deleteTask);
    checkBox.addEventListener("change", checkBoxEventHandler);
};

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

Array.from(incompleteTaskHolder.children).forEach(item => bindTaskEvents(item, taskCompleted));
Array.from(completedTasksHolder.children).forEach(item => bindTaskEvents(item, taskIncomplete));
