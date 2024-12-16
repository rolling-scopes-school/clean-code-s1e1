// Получаем элементы
var taskInput = document.getElementById("new-task-input");
var addButton = document.querySelector(".add-task-btn"); // Кнопка добавления
var incompleteTaskHolder = document.getElementById("incomplete-task-list"); // Список незавершенных задач
var completedTasksHolder = document.getElementById("completed-task-list"); // Список завершенных задач

// Функция для создания новой задачи
var createNewTaskElement = function(taskString) {
    var listItem = document.createElement("li");

    // Создаем элементы для задачи
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    var deleteButtonImg = document.createElement("img");

    label.innerText = taskString;
    label.className = 'task-label';

    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput.className = "task-input-field";

    editButton.innerText = "Edit";
    editButton.className = "edit-task-btn";

    deleteButton.className = "delete-task-btn";
    deleteButtonImg.src = './remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    // Добавляем элементы в li
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

// Добавить задачу
var addTask = function() {
    console.log("Add Task...");
    if (!taskInput.value) return; // Если поле пустое, не добавляем задачу

    var listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem); // Добавляем задачу в список незавершенных
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = ""; // Очищаем поле ввода
}

// Редактирование задачи
var editTask = function() {
    console.log("Edit Task...");
    var listItem = this.parentNode;

    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".edit-task-btn");
    var containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("editMode");
};

// Удалить задачу
var deleteTask = function() {
    console.log("Delete Task...");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem); // Удаляем задачу из списка
}

// Пометить задачу как завершенную
var taskCompleted = function() {
    console.log("Complete Task...");
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem); // Перемещаем в завершенные задачи
    bindTaskEvents(listItem, taskIncomplete);
}

// Пометить задачу как незавершенную
var taskIncomplete = function() {
    console.log("Incomplete Task...");
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem); // Перемещаем в незавершенные задачи
    bindTaskEvents(listItem, taskCompleted);
}

// Функция для привязки событий к кнопкам
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("Bind list item events");

    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit-task-btn");
    var deleteButton = taskListItem.querySelector("button.delete-task-btn");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

// Привязать события ко всем элементам на странице
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Обработчик события клика по кнопке добавления задачи
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
