const taskInput = document.querySelector("#new-task");
const addButton = document.querySelector(".button");
const incompleteTaskHolder = document.querySelector("#incompleteTasks");
const completedTasksHolder = document.querySelector("#completed-tasks");

const createNewTaskElement = (taskString) => {
    const listItem = document.createElement("li");
    listItem.className = "list__item";

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "list__item-checkbox";

    const label = document.createElement("label");
    label.className = "list__item-label";
    label.innerText = taskString;

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "list__item-input input--text";

    const editButton = document.createElement("button");
    editButton.className = "button button--edit";
    editButton.innerText = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.className = "button button--delete";

    const deleteButtonImg = document.createElement("img");
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.alt = "Delete";

    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

const addTask = () => {
    if (!taskInput.value) return;

    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
};

const editTask = function () {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector(".list__item-input");
    const label = listItem.querySelector(".list__item-label");
    const editButton = listItem.querySelector(".button--edit");

    const isEditMode = listItem.classList.contains("list__item--edit-mode");

    if (isEditMode) {
        label.innerText = editInput.value;
        editButton.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editButton.innerText = "Save";
    }

    listItem.classList.toggle("list__item--edit-mode");
};

const deleteTask = function () {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
};

const taskCompleted = function () {
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
    const checkBox = taskListItem.querySelector(".list__item-checkbox");
    const editButton = taskListItem.querySelector(".button--edit");
    const deleteButton = taskListItem.querySelector(".button--delete");

    checkBox.onchange = checkBoxEventHandler;
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
};

addButton.addEventListener("click", addTask);

Array.from(incompleteTaskHolder.children).forEach((item) =>
    bindTaskEvents(item, taskCompleted)
);

Array.from(completedTasksHolder.children).forEach((item) =>
    bindTaskEvents(item, taskIncomplete)
);