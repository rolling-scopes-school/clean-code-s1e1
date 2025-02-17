// ---------------------------
// Get necessary DOM elements
// ---------------------------
const taskInput = document.getElementById("new-task");
// In your HTML, the add button has class "todo-app__add-button"
const addButton = document.querySelector(".todo-app__add-button");
// ID in the HTML: "incomplete-tasks"
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
// ID in the HTML: "completed-tasks"
const completedTasksHolder = document.getElementById("completed-tasks");

// -------------------------------------------------------
// Function to create a new task list item (<li> element)
// -------------------------------------------------------
function createNewTaskElement(taskText) {
  // Create a new <li> element with the "todo-app__item" class
  const listItem = document.createElement("li");
  listItem.className = "todo-app__item";

  // Create a checkbox (type="checkbox") with "todo-app__checkbox" class
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "todo-app__checkbox";

  // Create a <label> with the text content and "todo-app__label" class
  const label = document.createElement("label");
  label.innerText = taskText;
  label.className = "todo-app__label";

  // Create an <input> for editing (type="text") with "todo-app__text-input" class
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "todo-app__text-input";

  // Create an Edit button with "todo-app__edit-button" class
  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "todo-app__edit-button";

  // Create a Delete button with "todo-app__delete-button" class
  const deleteButton = document.createElement("button");
  deleteButton.className = "todo-app__delete-button";

  // Add an <img> to the delete button
  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "Remove";
  deleteButton.appendChild(deleteButtonImg);

  // Append all created elements into the <li>
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

// -----------------------------
// Function to add a new task
// -----------------------------
function addTask() {
  // Prevent adding an empty string
  if (!taskInput.value) return;

  // Create the new <li> element
  const listItem = createNewTaskElement(taskInput.value);

  // Append the new task to the "incomplete tasks" list
  incompleteTaskHolder.appendChild(listItem);

  // Bind event handlers (e.g., edit, delete, checkbox)
  bindTaskEvents(listItem, markTaskCompleted);

  // Clear the input field
  taskInput.value = "";
}

// -----------------------------
// Function to edit a task
// -----------------------------
function editTask() {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type="text"]');
  const label = listItem.querySelector("label");
  const editBtn = this;

  // Check if <li> currently has the "todo-app__item--edit-mode" class
  const isInEditMode = listItem.classList.contains("todo-app__item--edit-mode");

  if (isInEditMode) {
    // If already in edit mode, save the input value into the label
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    // If not in edit mode, switch to edit mode and populate input with label text
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  // Toggle the edit mode class
  listItem.classList.toggle("todo-app__item--edit-mode");
}

// -----------------------------
// Function to delete a task
// -----------------------------
function deleteTask() {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

// ------------------------------------------------------
// Function to mark a task as completed (checkbox checked)
// ------------------------------------------------------
function markTaskCompleted() {
  const listItem = this.parentNode;
  // Move the task <li> to the completed tasks list
  completedTasksHolder.appendChild(listItem);

  // Re-bind events to handle "markTaskIncomplete" when checkbox is unchecked
  bindTaskEvents(listItem, markTaskIncomplete);
}

// ---------------------------------------------------------
// Function to mark a task as incomplete (checkbox unchecked)
// ---------------------------------------------------------
function markTaskIncomplete() {
  const listItem = this.parentNode;
  // Move the task <li> back to the "Todo" list
  incompleteTaskHolder.appendChild(listItem);

  // Re-bind events to handle "markTaskCompleted" when checkbox is checked
  bindTaskEvents(listItem, markTaskCompleted);
}

// -------------------------------------------------
// Function to bind all event handlers for one <li>
// -------------------------------------------------
function bindTaskEvents(taskListItem, checkBoxHandler) {
  const checkBox = taskListItem.querySelector('input[type="checkbox"]');
  const editButton = taskListItem.querySelector(".todo-app__edit-button");
  const deleteButton = taskListItem.querySelector(".todo-app__delete-button");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxHandler;
}

// -----------------------------
// Initial code execution
// -----------------------------

// Add task when the "Add" button is clicked
addButton.addEventListener("click", addTask);

// Bind existing items in the "incomplete tasks" list
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], markTaskCompleted);
}

// Bind existing items in the "completed tasks" list
for (let j = 0; j < completedTasksHolder.children.length; j++) {
  bindTaskEvents(completedTasksHolder.children[j], markTaskIncomplete);
}
