
//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

let taskInput=document.getElementById("new_task");
let addButton=document.getElementsByTagName("button")[0];
let incompleteTaskHolder=document.getElementById("incomplete_Tasks");
let completedTasksHolder=document.getElementById("completed_tasks");


//New task list item
let createNewTaskElement=function(taskString){

    let listItem=document.createElement("li");

    let checkBox=document.createElement("input");
    let label=document.createElement("label");
    let editInput=document.createElement("input");
    let editButton=document.createElement("button");

    let deleteButton=document.createElement("button");
    let deleteButtonImg=document.createElement("img");

    label.innerText=taskString;
    label.className="task";

    label.classList.add("task")


    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";
    editInput.className = "task";

    editButton.innerText="Edit"; 
    editButton.className="edit";

    deleteButton.className="delete";
    deleteButtonImg.src="./remove.svg";
    deleteButton.appendChild(deleteButtonImg);

    
    listItem.classList.add("list_element")
    checkBox.classList.add("input")
    editInput.classList.add("input")
    editButton.classList.add("button")
    deleteButton.classList.add("button")
    deleteButtonImg.classList.add("img")


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



let addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new_task:
    if (!taskInput.value) return;
    let listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

let editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    let listItem=this.parentNode;

    let editInput=listItem.querySelector("input[type=text]");
    let label=listItem.querySelector("label");
    let editBtn=listItem.querySelector(".edit");
    let containsClass=listItem.classList.contains("edit_Mode");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("edit_Mode");
};


//Delete task.
let deleteTask=function(){
    console.log("Delete Task...");

    let listItem=this.parentNode;
    let ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
let taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed_tasks
    let listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


let taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    let listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



let ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


let bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    let checkBox=taskListItem.querySelector("input[type=checkbox]");
    let editButton=taskListItem.querySelector("button.edit");
    let deleteButton=taskListItem.querySelector("button.delete");


    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

 //bind events to list items chldren(tasksCompleted)
for (let i=0; i<incompleteTaskHolder.children.length;i++){
   
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}



  //bind events to list items chldren(tasksIncompleted)
for (let i=0; i<completedTasksHolder.children.length;i++){
  
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.