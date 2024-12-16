//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.



document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("new-task");
  const addButton = document.querySelector(".main__add-button");
  const incompleteTaskHolder = document.querySelector(".task-list--incomplete");
  const completedTasksHolder = document.querySelector(".task-list--completed");

  const createTaskElement = (taskText) => {
    const listItem = document.createElement("li");
    listItem.className = "task";

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "task__checkbox";

    const label = document.createElement("label");
    label.className = "task__label";
    label.textContent = taskText;

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "task__input";

    const editButton = document.createElement("button");
    editButton.className = "task__edit-button";
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.className = "task__delete-button";

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./remove.svg";
    deleteIcon.alt = "Delete";
    deleteIcon.className = "task__delete-icon";
    deleteButton.appendChild(deleteIcon);

    listItem.append(checkBox, label, editInput, editButton, deleteButton);
    return listItem;
  };

  const addTask = () => {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const listItem = createTaskElement(taskText);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
  };

  const editTask = (event) => {
    const listItem = event.target.closest(".task");
    const editInput = listItem.querySelector(".task__input");
    const label = listItem.querySelector(".task__label");
    const editButton = listItem.querySelector(".task__edit-button");

    const isEditMode = listItem.classList.contains("task--edit-mode");
    if (isEditMode) {
      label.textContent = editInput.value;
      editButton.textContent = "Edit";
    } else {
      editInput.value = label.textContent;
      editButton.textContent = "Save";
    }
    listItem.classList.toggle("task--edit-mode");
  };

  const deleteTask = (event) => {
    const listItem = event.target.closest(".task");
    listItem.remove();
  };

  const taskCompleted = (event) => {
    const listItem = event.target.closest(".task");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
  };

  const taskIncomplete = (event) => {
    const listItem = event.target.closest(".task");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
  };

  const bindTaskEvents = (taskItem, checkBoxHandler) => {
    const checkBox = taskItem.querySelector(".task__checkbox");
    const editButton = taskItem.querySelector(".task__edit-button");
    const deleteButton = taskItem.querySelector(".task__delete-button");

    checkBox.onchange = checkBoxHandler;
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
  };

  addButton.addEventListener("click", addTask);

  document.querySelectorAll(".task-list--incomplete .task").forEach((task) => {
    bindTaskEvents(task, taskCompleted);
  });

  document.querySelectorAll(".task-list--completed .task").forEach((task) => {
    bindTaskEvents(task, taskIncomplete);
  });
});

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.