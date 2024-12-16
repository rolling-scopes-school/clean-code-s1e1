const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completed-tasks");



const createNewTaskElement = (taskString) => {
    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const deleteButtonImg = document.createElement("img");

    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput.className = "task";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.className = "delete";
    deleteButtonImg.src = "./remove.svg";
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

const addTask = () => {
    console.log("Add Task...");
    if (!taskInput.value) return;

    const listItem=createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";

}

const editTask = () => {
	console.log("Edit Task...")
	console.log("Change 'edit' to 'save'")
	const listItem = this.parentNode
	const editInput = listItem.querySelector("input[type=text]")
	const label = listItem.querySelector("label")
	const editBtn = listItem.querySelector(".edit")
	const containsClass = listItem.classList.contains("editMode")

	if (containsClass) {
		label.innerText = editInput.value
		editBtn.innerText = "Edit"
	} else {
		editInput.value = label.innerText
		editBtn.innerText = "Save"
	}

	listItem.classList.toggle('editMode')
}

const deleteTask = () => {
	console.log("Delete Task...")
	const listItem = this.parentNode
	const ul = listItem.parentNode
	ul.removeChild(listItem)
}

const taskCompleted = () => {
	console.log("Complete Task...")
	const listItem = this.parentNode
	completedTasksHolder.appendChild(listItem)
	bindTaskEvents(listItem, taskIncomplete)
}


const taskIncomplete = () => {
	console.log("Incomplete Task...")
	const listItem = this.parentNode
	incompleteTaskHolder.appendChild(listItem)
	bindTaskEvents(listItem, taskCompleted)
}



const ajaxRequest = () => {
	console.log("AJAX Request")
}

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


const bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
    console.log("bind list item events");

    const checkBox=taskListItem.querySelector("input[type=checkbox]");
    const editButton=taskListItem.querySelector("button.edit");
    const deleteButton=taskListItem.querySelector("button.delete");

    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}


for (const i=0; i<incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (const i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
