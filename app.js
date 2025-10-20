
(function() {
    "use strict"; 

    
    const taskInput = document.getElementById("new-task-input");
    const addButton = document.getElementById("add-task-button"); 
    const incompleteTaskHolder = document.getElementById("incomplete-tasks-list");
    const completedTasksHolder = document.getElementById("completed-tasks-list");

    const createNewTaskElement = function(taskString) {
        const listItem = document.createElement("li");


        const checkBox = document.createElement("input");
        const label = document.createElement("label");
        const editInput = document.createElement("input");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        const deleteButtonImg = document.createElement("img");

        label.innerText = taskString;
        label.className = 'task-label';

        checkBox.type = "checkbox";
        editInput.type = "text";
        editInput.className = "task-text-input";

        editButton.innerText = "Edit";
        editButton.className = "edit-btn"; 

        deleteButton.className = "delete-btn"; 
        deleteButtonImg.src = './remove.svg';
        deleteButtonImg.alt = 'Delete icon';
        deleteButton.appendChild(deleteButtonImg);

    
        listItem.append(checkBox, label, editInput, editButton, deleteButton); 
        return listItem;
    };


    
    const addTask = function() {
        console.log("Adding Task...");
        if (!taskInput.value) return;

        const listItem = createNewTaskElement(taskInput.value);
        
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);

        taskInput.value = "";
    };

    const editTask = function() {
        const listItem = this.parentNode;
        
        
        const editInput = listItem.querySelector('.task-text-input');
        const label = listItem.querySelector(".task-label");
        const editBtn = listItem.querySelector(".edit-btn");
        
        const isEditMode = listItem.classList.contains("task-list__item--edit-mode");

        if (isEditMode) {
            label.innerText = editInput.value;
            editBtn.innerText = "Edit";
        } else {
            editInput.value = label.innerText;
            editBtn.innerText = "Save";
        }

        listItem.classList.toggle("task-list__item--edit-mode");
    };

    const deleteTask = function() {
        const listItem = this.parentNode;
        const ul = listItem.parentNode;
        ul.removeChild(listItem);
    };

    const taskCompleted = function() {
        const listItem = this.parentNode;
        completedTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);
    };

    const taskIncomplete = function() {
        const listItem = this.parentNode;
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
    };

    const ajaxRequest = function() {
        console.log("AJAX Request: Data should be sent to the server here.");
    };



    const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
        console.log("Binding list item events...");
        
    
        const checkBox = taskListItem.querySelector("input[type=checkbox]");
        const editButton = taskListItem.querySelector(".edit-btn");
        const deleteButton = taskListItem.querySelector(".delete-btn");

        editButton.addEventListener('click', editTask); 
        deleteButton.addEventListener('click', deleteTask);
        checkBox.addEventListener('change', checkBoxEventHandler);
    };

    
    const handleAddTaskClick = function() {
        addTask();
        ajaxRequest();
    };


    addButton.addEventListener("click", handleAddTaskClick);


    const initTasks = function(holder, handler) {
        
        for (let i = 0; i < holder.children.length; i++) {
            bindTaskEvents(holder.children[i], handler);
        }
    };

    
    initTasks(incompleteTaskHolder, taskCompleted);
    initTasks(completedTasksHolder, taskIncomplete);

})(); 
