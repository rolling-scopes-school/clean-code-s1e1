//Document is the DOM can be accessed in the console with document.window.
//Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.
const newTaskInput = document.querySelector(".task__input_new"); //Add a new task input
const addButton = document.querySelector(".task__button_add");//Button 'Add'
const todoList = document.querySelector(".task-list_todo");//list todo-tasks
const completedTasksList = document.querySelector(".task-list_completed");//list completed-tasks

function createNewElementWithClass(el, elClasses) {
  const element = document.createElement(el);
  element.className = elClasses;
  return element;
}

//New task list item
const createNewTaskElement = function(taskString) {

  const listItem = createNewElementWithClass("li", "task");//task

  const checkBox = createNewElementWithClass("input", "task__checkbox");//checkbox
  checkBox.type="checkbox";
  const label = createNewElementWithClass("label", "task__label");//label
  label.innerText = taskString;
  const editInput = createNewElementWithClass("input", "task__input");//input
  editInput.type="text";
  const editButton = createNewElementWithClass("button", "task__button task__button_edit");//edit button
  editButton.innerText="Edit";
  const deleteButton = createNewElementWithClass("button", "task__button task__button_delete");//delete button
  deleteButton.innerHTML = '<img class="task__delete-img" src="./remove.svg" alt="delete Icon">';

  listItem.append(checkBox, label, editInput, editButton,deleteButton);
  return listItem;
}

const addTask = function() {
  console.log("Add Task...");

  //create and append listItem to todoList with the text from the .task-new
  if (newTaskInput.value) {
    const listItem = createNewTaskElement(newTaskInput.value);
    todoList.appendChild(listItem);
    bindTaskEvents(listItem);

    newTaskInput.value="";
  }
}

//Edit an existing task.
const editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;
  const editInput = listItem.querySelector('.task__input');
  const label = listItem.querySelector(".task__label");
  const editBtn = listItem.querySelector(".task__button_edit");
  const containsClass = listItem.classList.contains("task_edit-mode");

  //change label and button depending on task_edit-mode
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .task_edit-mode on the parent.
  listItem.classList.toggle("task_edit-mode");
};

//Delete task.
const deleteTask = function() {
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const list = listItem.parentNode;
  list.removeChild(listItem);
}

function toggleCompleteTask(checkbox) {
  const listItem = checkbox.parentNode;
  if (checkbox.checked) {
    completedTasksList.appendChild(listItem);
  } else {
    todoList.appendChild(listItem);
  }
}

//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);

const bindTaskEvents = function(taskListItem) {
  console.log("bind list item events");

  //select ListItems children and bind listeners to them
  const checkBox = taskListItem.querySelector(".task__checkbox");
  const editButton = taskListItem.querySelector(".task__button_edit");
  const deleteButton = taskListItem.querySelector(".task__button_delete");

  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  checkBox.addEventListener("change", () => toggleCompleteTask(checkBox));
}

//bind eventlistener for all interactive elements in every task of todo-tasks list
for (let i = 0; i < todoList.children.length; i += 1) {
  bindTaskEvents(todoList.children[i]);
}

//bind eventlistener for all interactive elements in every task of completed-tasks list
for (let i = 0; i < completedTasksList.children.length; i += 1) {
  bindTaskEvents(completedTasksList.children[i]);
}


//Issues with usability don't get seen until they are in front of a human tester.
//prevent creation of empty tasks.
//Change edit to save when you are in edit mode.