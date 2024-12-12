
const taskInput = document.getElementById("new-task");//Add a new task.
const addButton = document.getElementsByTagName("button")[0];//first button
const incompleteTaskHolder = document.getElementById("todo-tasks");//ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks

//New task list item
const createNewTaskElement = function(taskString) {

  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.setAttribute("alt", "Button-delete");

  label.textContent = taskString;
  label.className = 'task';

  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.textContent = "Edit";
  editButton.className = "button-edit";

  deleteButton.className = "button-delete";
  deleteButtonImg.src = './remove.svg';
  deleteButton.append(deleteButtonImg);

  listItem.append(checkBox);
  listItem.append(label);
  listItem.append(editInput);
  listItem.append(editButton);
  listItem.append(deleteButton);

  return listItem;
}


const addTask = function() {

  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";
}

//Edit an existing task.

const editTask = function() {

  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".button-edit");
  const containsClass = listItem.classList.contains("edit-mode");

  if (containsClass) {
    label.textContent = editInput.value;
    editBtn.textContent = "Edit";
  }
  else {
    editInput.value = label.textContent;
    editBtn.textContent = "Save";
  }

  listItem.classList.toggle("edit-mode");
};


//Delete task.
const deleteTask = function() {

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}


//Mark task completed
const taskCompleted = function() {

  const listItem = this.parentNode;
  completedTasksHolder.append(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


const taskIncomplete = function() {

  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}


addButton.addEventListener("click", addTask);


const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {

  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.button-edit");
  const deleteButton = taskListItem.querySelector("button.button-delete");

  // onclick automatically replaces the previous handler,
  // and there is no need to check for duplicates (when using addEventListener)
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i += 1){
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}


for (let i = 0; i < completedTasksHolder.children.length; i += 1){
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}