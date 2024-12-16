// Получаем элементы
var taskInput = document.getElementById("new-task-input");
var addBtn = document.querySelector(".add-btn"); // Кнопка добавления
var todoList = document.getElementById("todo-list"); // Список незавершенных задач
var doneList = document.getElementById("done-list"); // Список завершенных задач

// Функция для создания новой задачи
var createTask = function(taskText) {
    var listItem = document.createElement("li");
    listItem.className = 'li';

    // Создаем элементы для задачи
    var checkBox = document.createElement("input");
    checkBox.className = 'input'
    var label = document.createElement("label");
    label.className = 'label';
    var editInput = document.createElement("input");
    editInput.className = 'editInput'
    var editBtn = document.createElement("button");
    var deleteBtn = document.createElement("button");
    var deleteImg = document.createElement("img");
    deleteImg.className = 'img'

    label.innerText = taskText;
    label.className = 'task-label';

    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput.className = "input-field";

    editBtn.innerText = "Edit";
    editBtn.classList.add("button", "edit-btn");

    deleteBtn.classList.add("button", "delete-btn");
    deleteImg.src = './remove.svg';
    deleteBtn.appendChild(deleteImg);

    // Добавляем элементы в li
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);
    return listItem;
}

// Добавить задачу
var addTask = function() {
    console.log("Add Task...");
    if (!taskInput.value) return; // Если поле пустое, не добавляем задачу

    var listItem = createTask(taskInput.value);
    todoList.appendChild(listItem); // Добавляем задачу в список незавершенных
    bindTaskEvents(listItem, markTaskDone);

    taskInput.value = ""; // Очищаем поле ввода
}

// Редактирование задачи
var editTask = function() {
    console.log("Edit Task...");
    var listItem = this.parentNode;

    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".edit-btn");
    var isEditing = listItem.classList.contains("editMode");

    if (isEditing) {
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
var markTaskDone = function() {
    console.log("Complete Task...");
    var listItem = this.parentNode;
    doneList.appendChild(listItem); // Перемещаем в завершенные задачи
    bindTaskEvents(listItem, markTaskTodo);
}

// Пометить задачу как незавершенную
var markTaskTodo = function() {
    console.log("Incomplete Task...");
    var listItem = this.parentNode;
    todoList.appendChild(listItem); // Перемещаем в незавершенные задачи
    bindTaskEvents(listItem, markTaskDone);
}

// Функция для привязки событий к кнопкам
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("Bind list item events");

    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editBtn = taskListItem.querySelector("button.edit-btn");
    var deleteBtn = taskListItem.querySelector("button.delete-btn");

    editBtn.onclick = editTask;
    deleteBtn.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

// Привязать события ко всем элементам на странице
for (var i = 0; i < todoList.children.length; i++) {
    bindTaskEvents(todoList.children[i], markTaskDone);
}

for (var i = 0; i < doneList.children.length; i++) {
    bindTaskEvents(doneList.children[i], markTaskTodo);
}

// Обработчик события клика по кнопке добавления задачи
addBtn.onclick = addTask;
addBtn.addEventListener("click", addTask);
