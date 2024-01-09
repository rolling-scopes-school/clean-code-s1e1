//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.querySelector(".task__input_new"); //Add a new task.
const addButton = document.querySelector(".task__button_add");//Button 'Add'
const todoList = document.querySelector(".task-list_todo");//ul of .task-list_todo
const completedTasksList = document.querySelector(".task-list_completed");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

  const listItem = document.createElement("li");
  listItem.className = "task";

  //input (checkbox)
  var checkBox=document.createElement("input");//checkbox
  checkBox.className = "task__checkbox";
  checkBox.type="checkbox";
  //label
  var label=document.createElement("label");//label
  label.className='task__label';
  label.innerText=taskString;
  //input (text)
  var editInput=document.createElement("input");//text
  editInput.className='task__input';
  editInput.type="text";
  //button.edit
  var editButton=document.createElement("button");//edit button
  editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
  editButton.className="task__button task__button_edit";

  //button.delete
  var deleteButton=document.createElement("button");//delete button
  var deleteButtonImg=document.createElement("img");//delete button image
  deleteButton.className="task__button task__button_delete";
  deleteButtonImg.src="./remove.svg";
  deleteButtonImg.alt="delete Icon";
  deleteButtonImg.className="task__delete-img";
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



var addTask=function(){
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  var listItem=createNewTaskElement(newTaskInput.value);

  //Append listItem to todoList
  todoList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  newTaskInput.value="";

}

//Edit an existing task.

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  var listItem=this.parentNode;

  var editInput=listItem.querySelector('.task__input');
  var label=listItem.querySelector(".task__label");
  var editBtn=listItem.querySelector(".task__button_edit");
  var containsClass=listItem.classList.contains("task_edit-mode");
  //If class of the parent is .edit-mode
  if(containsClass){

    //switch to .editmode
    //label becomes the inputs value.
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  }else{
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }

  //toggle .edit-mode on the parent.
  listItem.classList.toggle("task_edit-mode");
};


//Delete task.
var deleteTask=function(){
  console.log("Delete Task...");

  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  var listItem=this.parentNode;
  completedTasksList.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the .task-list_todo.
  var listItem=this.parentNode;
  todoList.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  //select ListItems children
  var checkBox=taskListItem.querySelector(".task__checkbox");
  var editButton=taskListItem.querySelector(".task__button_edit");
  var deleteButton=taskListItem.querySelector(".task__button_delete");


  //Bind editTask to edit button.
  editButton.onclick=editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over todoList ul list items
//for each list item
for (var i=0; i<todoList.children.length;i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(todoList.children[i],taskCompleted);
}




//cycle over completedTasksList ul list items
for (var i=0; i<completedTasksList.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksList.children[i],taskIncomplete);
}




// Issues with usability don"t get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.