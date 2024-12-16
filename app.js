
const addButton = document.querySelector(".add__confirm"); 
const incompleteTaskHolder = document.querySelector(".incomplete__list");
const completedTasksHolder = document.querySelector(".completed__list");


//New task list item
const createNewTaskElement = function(taskString){

  const listItem = document.createElement("li");
  listItem.classList.add("incomplete__task");
  
  const checkBox = document.createElement("input");//checkbox
  checkBox.classList.add("incomplete__check");

  const label = document.createElement("label");//label
  label.classList.add("incomplete__label");

  const editInput = document.createElement("input");//text
  editInput.classList.add("incomplete__input");

  const editButton = document.createElement("button");//edit button
  editButton.className = "incomplete__confirm";
  const deleteButton = document.createElement("button");//delete button
  deleteButton.classList.add("incomplete__delete");
  const deleteButtonImg = document.createElement("img");//delete button image
  deleteButtonImg.classList.add("incomplete__delete-img");

  label.textContent = taskString;
 
  checkBox.type = "checkbox";
  editInput.type = "text";
 
  editButton.textContent = "Edit"; 

  deleteButton.className = "incomplete__delete";
  deleteButtonImg.src = './remove.svg';
  deleteButton.append(deleteButtonImg);

  //and appending.
  listItem.append(checkBox);
  listItem.append(label);
  listItem.append(editInput);
  listItem.append(editButton);
  listItem.append(deleteButton);
  return listItem;
}

const addTask = function(){
    console.log("Add Task...");
    const taskInput = document.querySelector(".add__input"); 
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.append(listItem);

    taskInput.value = "";
}

//Edit an existing task.

const editTask = function(self){
    console.log("Edit Task...");

    const listItem = self.closest("li");
    let prefix = "completed";
    if (listItem.classList.contains("incomplete__task")) prefix = "incomplete";

    const editInput = listItem.querySelector(`.${prefix}__input`);
    const label = listItem.querySelector(`.${prefix}__label`);
    
    if(listItem.classList.contains(`${prefix}__edit`)){
      label.textContent = editInput.value;
      self.textContent = "Edit";
    } else {
      editInput.value = label.textContent;
      self.textContent = "Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle(`${prefix}__edit`);
};


//Delete task.
const deleteTask = function(target){
    const listItem = target.closest("li").remove();
}

//Mark task completed
const changeTaskToCompleted = function(self){
    console.log("Complete Task...");
    const parent = self.closest("li");
    parent.className = parent.className.replace(/incomplete/g,"completed");
    Array.from(parent.children).forEach(elem => elem.className = elem.className.replace(/incomplete/g,"completed"));
    //Append the task list item to the completed folder
    completedTasksHolder.appendChild(self.closest("li"));
}

const changeTaskToIncomplete = function(self){
  console.log("Complete Task...");
  const parent = self.closest("li");
  parent.className = parent.className.replace(/completed/g,"incomplete");
  Array.from(parent.children).forEach(elem => elem.className = elem.className.replace(/completed/g,"incomplete"));
  //Append the task list item to the incomplete folder
  incompleteTaskHolder.appendChild(self.closest("li"));
}

const ajaxRequest=function(){
    console.log("AJAX Request");
}

addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);
incompleteTaskHolder.addEventListener("click", delegateClick);
completedTasksHolder.addEventListener("click", delegateClick);

function delegateClick(ev) {
  console.log(ev.target.className);
  if (ev.target.className === "incomplete__check") {
    changeTaskToCompleted(ev.target);
  } else {  
    if (ev.target.className === "completed__check") changeTaskToIncomplete(ev.target);
  }  
  if (/confirm/.test(ev.target.className)) editTask(ev.target);
  if (/delete/.test(ev.target.className)) deleteTask(ev.target);
}
