const taskInput= document.getElementById("new-task");
const addButton= document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");



const createNewTaskElement = function (taskString) {
    const listItem = document.createElement("div");
    listItem.className = "main-form__item";

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "main-form__checkbox";

    const label = document.createElement("label");
    label.className = "main-form__label";
    label.innerText = taskString;

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "main-form__input_task";

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "main-form__button main-form__edit";

    const deleteButton = document.createElement("button");
    deleteButton.className = "main-form__button main-form__delete";
    const deleteButtonImg = document.createElement("img");
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.alt = "remove";
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};



const addTask = function(){
    console.log("Add Task...");

    if (!taskInput.value) return;
    const listItem=createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}


const editTask = function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    const listItem=this.parentNode;
    const editInput=listItem.querySelector('.main-form__input_task');
    const label=listItem.querySelector(".main-form__label");
    const editBtn= this;
    const containsClass=listItem.classList.contains("editMode");

    if (containsClass) {
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    } else {
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }
    listItem.classList.toggle("editMode");
};

const deleteTask = function(){
    console.log("Delete Task...");

    const listItem=this.parentNode;
    const ul=listItem.parentNode;
    ul.removeChild(listItem);

}

const taskCompleted = function(){
    console.log("Complete Task...");
    const listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete = function(){
    console.log("Incomplete Task...");
    const listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



const ajaxRequest=function(){
    console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


const bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
    const checkBox=taskListItem.querySelector(".main-form__checkbox");
    const editButton=taskListItem.querySelector(".main-form__edit");
    const deleteButton=taskListItem.querySelector(".main-form__delete");

    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.