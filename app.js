// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.

// DOM Elements
const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(".todo-app__button");
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completed-tasks");

/**
 * Creates a new task list item element
 * @param {string} taskString - The task description
 * @returns {HTMLElement} - The created list item
 */
const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  listItem.className = "todo-app__task";

  // Create checkbox
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "todo-app__checkbox";
  checkBox.setAttribute("aria-label", "Mark task as complete");

  // Create label
  const label = document.createElement("label");
  label.innerText = taskString;
  label.className = "todo-app__task-label";

  // Create edit input
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "todo-app__task-input";

  // Create edit button
  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "todo-app__button edit";
  editButton.setAttribute("aria-label", "Edit task");

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.className = "todo-app__button todo-app__button_delete delete";
  deleteButton.setAttribute("aria-label", "Delete task");

  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "";
  deleteButtonImg.className = "todo-app__delete-icon";
  deleteButton.appendChild(deleteButtonImg);

  // Append all elements to list item
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

/**
 * Adds a new task to the incomplete tasks list
 */
const addTask = function () {
  console.log("Add Task...");

  // Prevent creation of empty tasks
  if (!taskInput.value.trim()) {
    return;
  }

  // Create a new list item with the text from the input
  const listItem = createNewTaskElement(taskInput.value);

  // Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  // Clear input field
  taskInput.value = "";
};

/**
 * Edits an existing task
 */
const editTask = function () {
  console.log("Edit Task...");

  const listItem = this.parentNode;
  const editInput = listItem.querySelector(".todo-app__task-input");
  const label = listItem.querySelector(".todo-app__task-label");
  const editBtn = listItem.querySelector(".edit");
  const isEditMode = listItem.classList.contains("todo-app__task_edit-mode");

  if (isEditMode) {
    // Save mode: update label with input value
    const newValue = editInput.value.trim();
    if (newValue) {
      label.innerText = newValue;
    }
    editBtn.innerText = "Edit";
    editBtn.setAttribute("aria-label", "Edit task");
  } else {
    // Edit mode: populate input with label value
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
    editBtn.setAttribute("aria-label", "Save task");
  }

  // Toggle edit mode class
  listItem.classList.toggle("todo-app__task_edit-mode");
};

/**
 * Deletes a task
 */
const deleteTask = function () {
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  // Remove the list item from the ul
  ul.removeChild(listItem);
};

/**
 * Marks a task as completed
 */
const taskCompleted = function () {
  console.log("Complete Task...");

  const listItem = this.parentNode;
  const checkBox = listItem.querySelector(".todo-app__checkbox");

  // Update checkbox aria-label
  checkBox.setAttribute("aria-label", "Mark task as incomplete");

  // Move task to completed list
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

/**
 * Marks a task as incomplete
 */
const taskIncomplete = function () {
  console.log("Incomplete Task...");

  const listItem = this.parentNode;
  const checkBox = listItem.querySelector(".todo-app__checkbox");

  // Update checkbox aria-label
  checkBox.setAttribute("aria-label", "Mark task as complete");

  // Move task back to incomplete list
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

/**
 * Binds events to task list item elements
 * @param {HTMLElement} taskListItem - The task list item
 * @param {Function} checkBoxEventHandler - Handler for checkbox change event
 */
const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");

  // Select list item's children
  const checkBox = taskListItem.querySelector(".todo-app__checkbox");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  // Bind events
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

// Set click handler for add button
addButton.addEventListener("click", addTask);

// Allow adding task with Enter key
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Bind events to existing incomplete tasks
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// Bind events to existing completed tasks
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
