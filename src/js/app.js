var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

//New task list item
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = 'todo__task todo__task--label';
  checkBox.type = "checkbox";
  checkBox.classList.add("todo__checkbox");
  editInput.type = "text";
  editInput.className = "todo__task todo__task--input";
  editButton.innerText = "Edit";
  editButton.className = "todo__button todo__button--edit button_edit";
  deleteButton.className = "todo__button todo__button--delete";
  deleteButtonImg.src = './assets/remove.svg';
  deleteButtonImg.alt = 'remove';
  listItem.classList.add('todo__item');

  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

var addTask = function() {
  if (!taskInput.value) return;

  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

//Edit an existing task.
var editTask=function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".todo__button--edit");
  var containsClass = listItem.classList.contains("todo__item--edit-mode");

  if(containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
    editBtn.classList.remove("button_save");
    editBtn.classList.add("button_edit");
  }else{
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
    editBtn.classList.add("button_save");
    editBtn.classList.remove("button_edit");
  }
  listItem.classList.toggle("todo__item--edit-mode");
};

//Delete task.
var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted = function() {

  var listItem = this.parentNode;

  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {

  var listItem = this.parentNode;

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

var bindTaskEvents = function(taskListItem,checkBoxEventHandler){
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.todo__button--edit");
  var deleteButton = taskListItem.querySelector("button.todo__button--delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}  

for (var i = 0; i < incompleteTaskHolder.children.length; i += 1){
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i += 1){
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}