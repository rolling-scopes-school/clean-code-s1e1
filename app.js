// Document is the DOM and can be accessed in the console with document.window.
// Tree is from the top: html, body, p, etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.

// Break things down into smaller steps and take each step at a time.
// Event handling, user interaction is what starts the code execution.

const taskInput = document.querySelector("#add-task-input"); // Add a new task.
const addButton = document.querySelector(".button-add-note"); // First button
const incompleteTaskHolder = document.querySelector(".add-todo__incomplete-tasks"); // ul of .add-todo__incomplete-tasks
const completedTasksHolder = document.querySelector(".add-completed__completed-tasks"); // ul of .add-completed__completed-tasks

// New task list item
const createNewTaskElement = function(taskString) {
  const listItem = document.createElement("li");
  listItem.className = "list";

  // Input (checkbox)
  const checkBox = document.createElement("input"); // Checkbox
  checkBox.type = "checkbox";
  checkBox.className = "add-input list-input";

  // Label
  const label = document.createElement("label"); // Label
  label.innerText = taskString;
  label.className = "add-tasks list-label";

  // Input (text)
  const editInput = document.createElement("input"); // Text input
  editInput.type = "text";
  editInput.className = "add-tasks add-input";

  // Button.edit
  const editButton = document.createElement("button"); // Edit button
  editButton.innerText = "Edit"; 
  editButton.className = "edit list-button add-task__button";

  // Button.delete
  const deleteButton = document.createElement("button"); // Delete button
  deleteButton.className = "delete list-button add-task__button";

  // Delete button image
  const deleteButtonImg = document.createElement("img"); // Delete button image
  deleteButtonImg.className = "list-img";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "Delete";
  deleteButton.appendChild(deleteButtonImg);

  // Append elements to listItem
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function() {
  console.log("Add Task...");
  if (!taskInput.value) return; // Prevent creation of empty tasks
  
  // Create a new list item with the text from the #add-task-input:
  const listItem = createNewTaskElement(taskInput.value.trim());

  // Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  // Clear the input
  taskInput.value = "";
};

// Edit an existing task
const editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const containsClass = listItem.classList.contains("edit-mode");

  // If class of the parent is .edit-mode
  if (containsClass) {
    // Label becomes the input's value
    label.innerText = editInput.value.trim();
    editBtn.innerText = "Edit";
  } else {
    // Switch to edit mode
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  // Toggle .edit-mode on the parent
  listItem.classList.toggle("edit-mode");
};

// Delete task
const deleteTask = function() {
  console.log("Delete Task...");
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  // Remove the parent list item from the ul
  ul.removeChild(listItem);
};

// Mark task completed
const taskCompleted = function() {
  console.log("Complete Task...");
  // Append the task list item to the .add-completed__completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

// Mark task incomplete
const taskIncomplete = function() {
  console.log("Incomplete Task...");
  // When the checkbox is unchecked
  // Append the task list item to the .incomplete-tasks
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

// The glue to hold it all together.

// Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);

// Bind events to existing list items
const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  // Select ListItem children
  const checkBox = taskListItem.querySelector("input[type='checkbox']");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

// Cycle over incompleteTaskHolder ul list items
for (let i = 0; i < incompleteTaskHolder.children.length; i += 1) {
  // Bind events to list items children (tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// Cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i += 1) {
  // Bind events to list items children (tasksIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.
