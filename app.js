//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task"); //Add a new task.
const addButton = document.getElementById("addButton"); //first button
const incompleteTaskHolder = document.getElementById("incompleteTasks"); //ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0, j = incompleteTaskHolder.children.length; i < j; i++) {
	//bind events to list items chldren(tasksCompleted)
	bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0, j = completedTasksHolder.children.length; i < j; i++) {
	//bind events to list items chldren(tasksIncompleted)
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// * Functions

//New task list item
function createNewTaskElement(taskString) {
	const listItem = document.createElement("li");

	//input (checkbox)
	const checkBox = document.createElement("input"); //checkbx
	//label
	const label = document.createElement("label"); //label
	//input (text)
	const editInput = document.createElement("input"); //text
	//button.edit
	const editButton = document.createElement("button"); //edit button

	//button.delete
	const deleteButton = document.createElement("button"); //delete button
	const deleteButtonImg = document.createElement("img"); //delete button image

	label.innerText = taskString;
	label.className = "todo__task";

	//Each elements, needs appending
	checkBox.type = "checkbox";
	editInput.type = "text";
	editInput.className = "todo__task";

	editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
	editButton.className = "todo__button";

	deleteButton.className = "todo__button todo__button--delete";
	deleteButtonImg.src = "./remove.svg";
	deleteButton.append(deleteButtonImg);

	//and appending.
	listItem.append(checkBox, label, editInput, editButton, deleteButton);
	return listItem;
}

function addTask(e) {
	e.stopPropagation();
	//Create a new list item with the text from the #new-task:
	if (!taskInput.value) return;

	const listItem = createNewTaskElement(taskInput.value);

	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.append(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";
}

//Edit an existing task.

function editTask() {
	const listItem = this.parentElement;
	const editInput = listItem.querySelector("input[type=text]");
	const label = listItem.querySelector("label");
	const editBtn = listItem.querySelector(".todo__button");
	const isClass = listItem.classList.contains("tasks-list__item--edit");
	
	//If class of the parent is .editmode
	if (isClass) {
		//switch to .editmode
		//label becomes the inputs value.
		label.innerText = editInput.value;
		editBtn.innerText = "Edit";
	} else {
		editInput.value = label.innerText;
		editBtn.innerText = "Save";
	}

	//toggle .editmode on the parent.
	listItem.classList.toggle("tasks-list__item--edit");
}

//Delete task.
function deleteTask() {
	const listItem = this.parentElement;
	const ul = listItem.parentElement;
	//Remove the parent list item from the ul.
	ul.removeChild(listItem);
}

//Mark task completed
function taskCompleted() {
	//Append the task list item to the #completed-tasks
	const listItem = this.parentElement;
	completedTasksHolder.append(listItem);
	bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
	//Mark task as incomplete.
	//When the checkbox is unchecked
	//Append the task list item to the #incompleteTasks.
	const listItem = this.parentElement;
	incompleteTaskHolder.append(listItem);
	bindTaskEvents(listItem, taskCompleted);
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
	//select ListItems children
	const checkBox = taskListItem.querySelector("input[type=checkbox]");
	const editButton = taskListItem.querySelector("button.todo__button");
	const deleteButton = taskListItem.querySelector("button.todo__button--delete");

	//Bind editTask to edit button.
	editButton.onclick = editTask;
	//Bind deleteTask to delete button.
	deleteButton.onclick = deleteTask;
	//Bind taskCompleted to checkBoxEventHandler.
	checkBox.onchange = checkBoxEventHandler;
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
