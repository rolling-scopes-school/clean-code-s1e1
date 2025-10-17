document.addEventListener("DOMContentLoaded", () => {
    const newTaskInput = document.querySelector("#new-task");
    const addTaskButton = document.querySelector(".add-task__button");
    const todoList = document.querySelector("#incomplete-tasks");
    const completeList = document.querySelector("#completed-tasks");

    const createNewTaskElement = (taskString) => {
        const listItem = document.createElement("li");
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.classList.add("todo__checkbox");
        const label = document.createElement("label");
        label.innerText = taskString;
        label.classList.add("todo__label", "task");
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = taskString;
        editInput.classList.add("todo__input", "task");
        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.classList.add("todo__edit");
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("todo__delete");
        const deleteButtonImg = document.createElement("img");
        deleteButtonImg.src = "./remove.svg";
        deleteButtonImg.alt = "Delete task";
        deleteButtonImg.classList.add("todo__delete-icon");
        deleteButton.appendChild(deleteButtonImg);     
        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        return listItem;
    };

    const addTask = () => {
        if (!newTaskInput.value) return;
        const listItem = createNewTaskElement(newTaskInput.value);
        todoList.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
        newTaskInput.value = "";
    };

    const editTask = function() {
        const listItem = this.parentNode;
        const editInput = listItem.querySelector("input[type=text]");
        const label = listItem.querySelector("label");
        const editBtn = listItem.querySelector("button.todo__edit");
        const containsClass = listItem.classList.contains("editMode");

        if (containsClass) {
            label.innerText = editInput.value;
            editBtn.innerText = "Edit";
        } else {
            editInput.value = label.innerText;
            editBtn.innerText = "Save";
        }
        listItem.classList.toggle("editMode");
    };

    const deleteTask = function() {
        const listItem = this.parentNode;
        const ul = listItem.parentNode;
        ul.removeChild(listItem);
    };

    const taskCompleted = function() {
        const listItem = this.parentNode;
        completeList.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);
    };

    const taskIncomplete = function() {
        const listItem = this.parentNode;
        todoList.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
    };

    const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
        const checkBox = taskListItem.querySelector("input[type=checkbox]");
        const editButton = taskListItem.querySelector("button.todo__edit");
        const deleteButton = taskListItem.querySelector("button.todo__delete");
        editButton.onclick = editTask;
        deleteButton.onclick = deleteTask;
        checkBox.onchange = checkBoxEventHandler;
    };

    addTaskButton.addEventListener("click", addTask);

    for (let i = 0; i < todoList.children.length; i++) {
        bindTaskEvents(todoList.children[i], taskCompleted);
    }
    for (let i = 0; i < completeList.children.length; i++) {
        bindTaskEvents(completeList.children[i], taskIncomplete);
    }
});
