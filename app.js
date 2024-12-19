// DOM Elements
const addTaskInput=document.getElementById("new-task");//Add a new task.
const addButton=document.querySelector(".task__button-add");//first button
const incompleteTaskHolder=document.getElementById("incompleteTasks");//ul of #incompleteTasks
const completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks

//New task list item
const createNewTaskElement=function(taskString){
    const listItem=document.createElement("li");
    const checkBox=document.createElement("input");//checkbx
    const label=document.createElement("label");//label
    const editInput=document.createElement("input");//text
    const editButton=document.createElement("button");//edit button


    const deleteButton=document.createElement("button");//delete button
    const deleteButtonImg=document.createElement("img");//delete button image

    label.innerText=taskString;
    label.className='task';


    checkBox.type="checkbox";
    editInput.type="text";
    editInput.className="task";

    editButton.innerText="Edit"; 
    editButton.className="edit";

    deleteButton.className="delete";
    deleteButtonImg.src='./remove.svg';
    deleteButton.appendChild(deleteButtonImg);


 
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



const addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    const listItem=createNewTaskElement(taskInput.value);


    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

const editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    const listItem=this.parentNode;

    const editInput=listItem.querySelector('input[type=text]');
    const label=listItem.querySelector("label");
    const editBtn=listItem.querySelector(".edit");
    const containsClass=listItem.classList.contains("editMode");
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    listItem.classList.toggle("editMode");
};


//Delete task.
const deleteTask=function(){
    console.log("Delete Task...");

    const listItem=this.parentNode;
    const ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
const taskCompleted=function(){
    console.log("Complete Task...");

    
    const listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    
    const listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



const ajaxRequest=function(){
    console.log("AJAX Request");
}




//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


const bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
const checkBox=taskListItem.querySelector("input[type=checkbox]");
const editButton=taskListItem.querySelector("button.edit");
const deleteButton=taskListItem.querySelector("button.delete");



    editButton.onclick=editTask;

    deleteButton.onclick=deleteTask;

    checkBox.onchange=checkBoxEventHandler;
}


for (let i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (let i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




