//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task')
const addButton = document.getElementsByTagName('button')[0] //first button
const incompleteTaskHolder = document.getElementById('incompleteTasks') //ul of #incompleteTasks
const completedTasksHolder = document.getElementById('completed-tasks') //completed-tasks

//New task list item
function createNewTaskElement(taskString) {
	const listItem = document.createElement('li')
	listItem.className = 'task-item'

	const checkBox = document.createElement('input')
	const label = document.createElement('label')
	const editInput = document.createElement('input')
	const editButton = document.createElement('button')
	const deleteButton = document.createElement('button')
	const deleteButtonImg = document.createElement('img')

	label.innerText = taskString
	label.className = 'task-item__label'

	//Each elements, needs appending
	checkBox.type = 'checkbox'
	editInput.type = 'text'
	editInput.className = 'task-item__input'

	editButton.innerText = 'Edit' //innerText encodes special characters, HTML does not.
	editButton.className = 'edit'

	deleteButton.className = 'delete'
	deleteButtonImg.src = './remove.svg'
	deleteButton.appendChild(deleteButtonImg)

	//and appending.
	listItem.appendChild(checkBox)
	listItem.appendChild(label)
	listItem.appendChild(editInput)
	listItem.appendChild(editButton)
	listItem.appendChild(deleteButton)
	return listItem
}

function addTask() {
	console.log('Add Task...')
	//Create a new list item with the text from the #new-task:
	if (!taskInput.value) return
	const listItem = createNewTaskElement(taskInput.value)

	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem)
	bindTaskEvents(listItem, taskCompleted)

	taskInput.value = ''
}

//Edit an existing task.

function editTask() {
	console.log('Edit Task...')
	console.log("Change 'edit' to 'save'")

	const listItem = this.parentNode

	const editInput = listItem.querySelector('input[type=text]')
	const label = listItem.querySelector('label')
	const editBtn = listItem.querySelector('.edit')
	const containsClass = listItem.classList.contains('editMode')
	//If class of the parent is .editmode
	if (containsClass) {
		//switch to .editmode
		//label becomes the inputs value.
		label.innerText = editInput.value
		editBtn.innerText = 'Edit'
	} else {
		editInput.value = label.innerText
		editBtn.innerText = 'Save'
	}

	//toggle .editmode on the parent.
	listItem.classList.toggle('editMode')
}

//Delete task.
function deleteTask() {
	console.log('Delete Task...')

	const listItem = this.parentNode
	if (listItem) {
		listItem.remove()
	}
}

//Mark task completed
function taskCompleted() {
	console.log('Complete Task...')

	//Append the task list item to the #completed-tasks
	const listItem = this.parentNode
	completedTasksHolder.appendChild(listItem)
	bindTaskEvents(listItem, taskIncomplete)
}

function taskIncomplete() {
	console.log('Incomplete Task...')
	//Mark task as incomplete.
	//When the checkbox is unchecked
	//Append the task list item to the #incompleteTasks.
	const listItem = this.parentNode
	incompleteTaskHolder.appendChild(listItem)
	bindTaskEvents(listItem, taskCompleted)
}

function ajaxRequest() {
	console.log('AJAX Request')
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.addEventListener('click', addTask)
addButton.addEventListener('click', ajaxRequest)

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
	console.log('bind list item events')
	//select ListItems children
	const checkBox = taskListItem.querySelector('input[type=checkbox]')
	const editButton = taskListItem.querySelector('button.edit')
	const deleteButton = taskListItem.querySelector('button.delete')

	//Bind editTask to edit button.
	editButton.onclick = editTask
	//Bind deleteTask to delete button.
	deleteButton.onclick = deleteTask
	//Bind taskCompleted to checkBoxEventHandler.
	checkBox.onchange = checkBoxEventHandler
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (const element of incompleteTaskHolder.children) {
	//bind events to list items chldren(tasksCompleted)
	bindTaskEvents(element, taskCompleted)
}

//cycle over completedTasksHolder ul list items
for (const element of completedTasksHolder.children) {
	//bind events to list items chldren(tasksIncompleted)
	bindTaskEvents(element, taskIncomplete)
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
