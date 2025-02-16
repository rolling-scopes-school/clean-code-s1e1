//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.querySelector(".task-add__button");//first button
var incompleteTaskHolder=document.querySelector(".task-list__items");//ul of #incompleteTasks
var completedTasksHolder=document.querySelector(".task-list--completed .task-list__items");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.classList.add("task-list__item");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    checkBox.classList.add("task-list__checkbox");
    //label
    var label=document.createElement("label");//label
    label.classList.add("task-list__label");
    //input (text)
    var editInput=document.createElement("input");//text
    editInput.classList.add("task-list__input");
    //button.edit
    var editButton=document.createElement("button");//edit button
    editButton.classList.add("task-list__button", "task-list__button--edit");
    //button.delete
    var deleteButton=document.createElement("button");//delete button
    deleteButton.classList.add("task-list__button", "task-list__button--delete");
    var deleteButtonImg=document.createElement("img");//delete button image
    deleteButtonImg.classList.add("task-list__icon");

    label.innerText=taskString;

    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.

    deleteButtonImg.src='./remove.svg';
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
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";
}

//Edit an existing task.
var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var listItem=this.parentNode;
    var editInput=listItem.querySelector(".task-list__input");
    var label=listItem.querySelector(".task-list__label");
    var editBtn=listItem.querySelector(".task-list__button--edit");
    var containsClass=listItem.classList.contains("task-list__item--edit-mode");

    if(containsClass){
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }
    listItem.classList.toggle("task-list__item--edit-mode");
};

//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");
    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete=function(){
    console.log("Incomplete Task...");
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
    var checkBox=taskListItem.querySelector(".task-list__checkbox");
    var editButton=taskListItem.querySelector(".task-list__button--edit");
    var deleteButton=taskListItem.querySelector(".task-list__button--delete");
    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.?