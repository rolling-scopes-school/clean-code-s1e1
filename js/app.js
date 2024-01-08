//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.querySelector("#new-task"); //Add a new task.
const addButton = document.querySelector(".main__button"); //first button
const incompleteTaskHolder = document.querySelector("#incomplete-tasks"); //ul of #incompleteTasks
const completedTasksHolder = document.querySelector("#completed-tasks"); //completed-tasks

const createNewTaskElement = (taskString) => {
  const listItem = document.createElement("li");
  listItem.className = "task__list-item";

  listItem.innerHTML = `
        <input type="checkbox">
        <label class="task">${taskString}</label>
        <input type="text" class="task">
        <button class="edit">Edit</button>
        <button class="delete"><img src="./img/remove.svg" alt="remove img"></button>
    `;

  return listItem;
};

const addTask = () => {
  console.log("Add Task...");

  // Check if taskInput is defined
  if (!taskInput || !taskInput.value) return;

  // Create a new list item with the text from the #new-task
  const listItem = createNewTaskElement(taskInput.value);

  // Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);

  // Bind events to the new task
  bindTaskEvents(listItem, taskCompleted);

  // Clear the input field
  taskInput.value = "";
};

//Edit an existing task.

const editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");

  if (!editInput || !label || !editBtn) {
    console.error("Missing required elements");
    return;
  }

  const containsClass = listItem.classList.contains("editMode");

  // If class of the parent is .editmode
  if (containsClass) {
    // Switch to .editmode
    // Label becomes the input's value.
    label.textContent = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.textContent;
    editBtn.innerText = "Save";
  }

  // Toggle .editmode on the parent.
  listItem.classList.toggle("editMode");
};

//Delete task.
const deleteTask = function () {
  console.log("Delete Task...");

  const listItem = this.parentNode;

  if (listItem && listItem.parentNode) {
    // Remove the parent list item from the ul.
    listItem.parentNode.removeChild(listItem);
  }
};

//Mark task completed
const taskCompleted = function () {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  console.log("Incomplete Task...");

  const listItem = this.parentNode;

  if (listItem && listItem.parentNode) {
    // Remove the "completed" class
    listItem.classList.remove("completed");

    // Append the task list item to the container for incomplete tasks
    listItem.parentNode.appendChild(listItem);

    // Rebind events for the task (now in a new container)
    bindTaskEvents(listItem, taskCompleted);
  }
};

const ajaxRequest = () => {
  console.log("AJAX Request");
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  console.log("bind list item events");
  // Select ListItems children
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  // Bind editTask to edit button.
  editButton.addEventListener("click", editTask);
  // Bind deleteTask to delete button.
  deleteButton.addEventListener("click", deleteTask);
  // Bind taskCompleted to checkBoxEventHandler.
  checkBox.addEventListener("change", checkBoxEventHandler);
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
