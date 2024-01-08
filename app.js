
var taskInput = document.getElementById("newTask");
var addButton = document.getElementById("addTodoBtn")
var incompleteTaskHolder = document.getElementById("incompleteTasks");
var completedTasksHolder = document.getElementById("completedTasks");

var createNewTaskElement = function(taskString){

  var listItem = document.createElement("li");
  listItem.className = "task-row"

  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton  =  document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = 'task-label'

  checkBox.type = "checkbox";
  checkBox.className = ('checkbox-input')

  editInput.type = "text";
  editInput.className = 'text-input'

  editButton.innerText = "Edit";
  editButton.className = "btn edit";

  deleteButton.className = "btn delete";
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask=function(){
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

var editTask = function(){

  var listItem = this.parentNode;

  var editInput = listItem.querySelector('input[type = text]');
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".edit");
  var containsClass = listItem.classList.contains("edit-mode");

  if(containsClass){
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  }else{
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle('edit-mode')
}

var deleteTask = function(){
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

var taskCompleted = function(){
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete = function(){
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

addButton.addEventListener("click",addTask);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  var checkBox = taskListItem.querySelector("input[type = checkbox]");
  var editButton = taskListItem.querySelector(".edit");
  var deleteButton = taskListItem.querySelector(".delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;

  checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++){
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++){
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
