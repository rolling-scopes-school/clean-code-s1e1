//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

// DOM Elements
const addTaskInput = document.getElementById("new-task"); // Input for new task
const addButton = document.querySelector(".task__button-add"); // Button to add task
const incompleteTaskHolder = document.getElementById("incompleteTasks"); // List of incomplete tasks
const completedTasksHolder = document.getElementById("completed-tasks"); // List of completed tasks

// Function to create a new task list item
const createNewTaskElement = function (taskString) {
    // Create elements
    const listItem = document.createElement("li");
    listItem.className = "task-list__item";

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "task__checkbox";

    const label = document.createElement("label");
    label.innerText = taskString;
    label.className = "task__label";

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "task__input task__input--edit";

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "task__button task__button--edit";
    editButton.setAttribute("aria-label", "Edit task");

    const deleteButton = document.createElement("button");
    deleteButton.className = "task__button task__button--delete";
    deleteButton.setAttribute("aria-label", "Delete task");

    const deleteButtonImg = document.createElement("img");
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.alt = "Delete";
    deleteButtonImg.className = "task__button-icon task__button-icon--delete";
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

// Add a new task
const addTask = function () {
    const taskString = addTaskInput.value.trim();
    if (!taskString) return; // Prevent adding empty tasks

    const listItem = createNewTaskElement(taskString);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    addTaskInput.value = ""; // Clear the input field
};

// Edit an existing task
const editTask = function () {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector(".task__input--edit");
    const label = listItem.querySelector(".task__label");
    const editButton = listItem.querySelector(".task__button--edit");

    const isEditMode = listItem.classList.contains("task-list__item--editMode");
    if (isEditMode) {
        label.innerText = editInput.value; // Save new text
        editButton.innerText = "Edit";
        label.classList.remove('task-list__label--editMode');
    } else {
        editInput.value = label.innerText; // Load current text into input
        editButton.innerText = "Save";
        label.classList.add('task-list__label--editMode');
    }

    listItem.classList.toggle("task-list__item--editMode");
};

// Delete a task
const deleteTask = function () {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
};

// Mark task as completed
const taskCompleted = function () {
    const listItem = this.parentNode;
    listItem.classList.add("task-list__item--completed");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

// Mark task as incomplete
const taskIncomplete = function () {
    const listItem = this.parentNode;
    listItem.classList.remove("task-list__item--completed");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

// Bind events to a task list item
const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector(".task__checkbox");
    const editButton = taskListItem.querySelector(".task__button--edit");
    const deleteButton = taskListItem.querySelector(".task__button--delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

// Set the click handler to the addTask function
addButton.addEventListener("click", addTask);

// Cycle over incomplete tasks and bind events
Array.from(incompleteTaskHolder.children).forEach((task) =>
    bindTaskEvents(task, taskCompleted)
);

// Cycle over completed tasks and bind events
Array.from(completedTasksHolder.children).forEach((task) =>
    bindTaskEvents(task, taskIncomplete)
);




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.