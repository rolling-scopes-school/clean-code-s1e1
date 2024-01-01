//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.querySelector(".add-tasks__input");//Add a new task.
const addButton = document.querySelector(".add-tasks__btn"); //add-tasks__btn
const todoTaskHolder = document.querySelector(".task__list--todo"); // task__list--todo
const completedTasksHolder = document.querySelector(".task__list--completed"); //task__list--completed


//New task list item
const createNewTaskElement = function (taskString) {

    const listItem = document.createElement("li");

    //input (checkbox)
    const checkBox = document.createElement("input");//checkbx
    //label
    const label = document.createElement("label");//label
    //input (text)
    const editInput = document.createElement("input");//text
    //task__btn--edit
    const editButton = document.createElement("button");//edit button

    //task__btn--delete
    const deleteButton=document.createElement("button");//delete button
    const deleteButtonImg=document.createElement("img");//delete button image
    
    listItem.className = "task__item";
    label.innerText = taskString;
    label.className = "task__label";

    // Each elements, needs appending
    checkBox.type = "checkbox";
    checkBox.className = "task__input input__checkbox";
    editInput.type = "text";
    editInput.className = "task__input input__text";

    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "task__btn--edit btn";

    deleteButton.className = "task__btn--delete btn";
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.className = "task__remove-img";
    deleteButton.appendChild(deleteButtonImg);

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}


const addTask = function () {
    console.log("Add Task...");
    //Create a new list item with the text from the #.add-tasks__input:
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);

    //Append listItem to todoTaskHolder
    todoTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

}


//Edit an existing task.

const editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    const listItem=this.parentNode;

    const editInput = listItem.querySelector(".input__text");
    const label = listItem.querySelector(".task__label");
    const editBtn = listItem.querySelector(".task__btn--edit");
    const containsClass = listItem.classList.contains("task__edit-mode");
    //If class of the parent is .task__edit-mode
    if (containsClass) {

        //switch to .task__edit-mode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .task__edit-mode on the parent.
    listItem.classList.toggle("task__edit-mode");
};


//Delete task.
const deleteTask = function () {
    console.log("Delete Task...");

    const listItem = this.parentNode;
    const ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
const taskCompleted = function () {
    console.log("Complete Task...");

    //Append the task list item to the task__list--completed
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete = function () {
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the task__list--todo.
    const listItem = this.parentNode;
    todoTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



const ajaxRequest = function () {
    console.log("AJAX Request");
}


//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
//select ListItems children
    const checkBox = taskListItem.querySelector(".input__checkbox");
    const editButton=taskListItem.querySelector(".task__btn--edit");
    const deleteButton=taskListItem.querySelector(".task__btn--delete");


    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}


//cycle over todoTaskHolder ul list items
//for each list item
for (let i = 0; i < todoTaskHolder.children.length; i++) {

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(todoTaskHolder.children[i],taskCompleted);
}


//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}


// Issues with usability don"t get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.