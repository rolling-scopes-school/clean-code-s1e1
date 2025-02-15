document.addEventListener("DOMContentLoaded", function () {
    const newTaskInput = document.getElementById("new-task");
    const addButton = document.querySelector("button");
    const todoList = document.getElementById("incomplete-tasks");
    const completedList = document.getElementById("completed-tasks");

    if (!newTaskInput || !addButton || !todoList || !completedList) {
        console.error("One or more required DOM elements are missing.");
        return;
    }

    addButton.addEventListener('click', function () {
        const taskText = newTaskInput.value.trim();
        if (taskText !== "") {
            const taskItem = createTaskElement(taskText, false);
            todoList.appendChild(taskItem);
            newTaskInput.value = "";
        }
    });

    function createTaskElement(taskText, isCompleted) {
        const li = document.createElement("li");
        li.innerHTML = ` 
            <input type="checkbox" ${isCompleted ? 'checked' : ''}>
            <label class="task">${taskText}</label>
            <input type="text" class="task" value="${taskText}">
            <button class="edit">Edit</button>
            <button class="delete"><img src="./remove.svg" alt="Delete"></button>
        `;

        const checkbox = li.querySelector("input[type='checkbox']");
        const editButton = li.querySelector(".edit");
        const deleteButton = li.querySelector(".delete");
        const label = li.querySelector(".task");
        const textInput = li.querySelector("input[type='text']");

        editButton.addEventListener("click", () => {
            if (editButton.textContent === "Edit") {
                label.style.display = "none";
                textInput.style.display = "inline-block";
                textInput.focus();
                editButton.textContent = "Save";
            } else {
                label.style.display = "inline-block";
                textInput.style.display = "none";
                label.textContent = textInput.value;
                editButton.textContent = "Edit";
            }
        });

        deleteButton.addEventListener("click", () => {
            li.remove();
        });

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                completedList.appendChild(li);
            } else {
                todoList.appendChild(li);
            }
        });

        if (isCompleted) {
            completedList.appendChild(li);
        } else {
            todoList.appendChild(li);
        }

        return li;
    }

    const sampleTasks = ["Pay Bills", "Go Shopping", "See the Doctor"];
    sampleTasks.forEach(task => {
        const taskItem = createTaskElement(task, false);
        todoList.appendChild(taskItem);
    });
});