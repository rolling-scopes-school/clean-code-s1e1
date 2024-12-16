// Document is the DOM, can be accessed in the console with document.window.
// Tree is from the top: html, body, p, etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.

// Elements
const taskInput = document.getElementById("new-task-input");
const addButton = document.querySelector("button"); // First button
const todoList = document.getElementById("todo-list");
const completedList = document.getElementById("completed-list");

// Create a new task list item
function createNewTaskElement(taskString) {
    const listItem = document.createElement("li");

    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const deleteButtonImg = document.createElement("img");

    label.innerText = taskString;
    label.className = "task-label";

    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput.className = "task-input";

    editButton.innerText = "Edit";
    editButton.className = "edit-btn";

    deleteButton.className = "delete-btn";
    deleteButtonImg.src = './remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    // Append elements
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

// Add a task
function addTask() {
    if (!taskInput.value.trim()) return; // Prevent creating empty tasks

    const listItem = createNewTaskElement(taskInput.value);
    todoList.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

// Edit an existing task
function editTask() {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector('input[type=text]');
    const label = listItem.querySelector("label");
    const editBtn = listItem.querySelector(".edit-btn");
    const isEditMode = listItem.classList.contains("editing");

    if (isEditMode) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("editing");
}

// Delete task
function deleteTask() {
    const listItem = this.parentNode;
    listItem.parentNode.removeChild(listItem);
}

// Mark task as completed
function taskCompleted() {
    const listItem = this.parentNode;
    completedList.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

// Mark task as incomplete
function taskIncomplete() {
    const listItem = this.parentNode;
    todoList.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

// AJAX request (example placeholder)
function ajaxRequest() {
    console.log("AJAX Request");
}

// Bind events to task list items
function bindTaskEvents(taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.edit-btn");
    const deleteButton = taskListItem.querySelector("button.delete-btn");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

// Initialize tasks
function initializeTasks() {
    Array.from(todoList.children).forEach(item => {
        bindTaskEvents(item, taskCompleted);
    });

    Array.from(completedList.children).forEach(item => {
        bindTaskEvents(item, taskIncomplete);
    });
}

// Set the click handler for the add button
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

// Initialize existing tasks on page load
initializeTasks();
