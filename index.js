var todoList = [];
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var allTodos = document.getElementById("all-todos");

// Event listener for adding a task
addButton.addEventListener("click", add);

// Event listener for "Enter" key
todoInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        add();
    }
});

// Event listener for completing and deleting tasks
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("complete") || e.target.classList.contains("ci")) {
        completeTodo(e);
    }
    if (e.target.classList.contains("delete") || e.target.classList.contains("di")) {
        deleteTodo(e);
    }
});

// Adds a new task to the list
function add() {
    var value = todoInput.value.trim();
    if (value === "") {
        alert("😮 Task cannot be empty");
        return;
    }

    todoList.push({
        task: value,
        id: Date.now().toString(),
        complete: false,
    });

    todoInput.value = "";
    addinmain();
}

// Renders the task list
function addinmain() {
    allTodos.innerHTML = "";
    todoList.forEach((element) => {
        var x = `<li id="${element.id}" class="todo-item">
                    <p id="task">${element.complete ? `<strike>${element.task}</strike>` : element.task}</p>
                    <div class="todo-actions">
                        <button class="complete btn btn-success">
                            <i class="ci bx bx-check bx-sm"></i>
                        </button>
                        <button class="delete btn btn-error">
                            <i class="di bx bx-trash bx-sm"></i>
                        </button>
                    </div>
                </li>`;
        allTodos.innerHTML += x;
    });
}

// Deletes a single task
function deleteTodo(e) {
    var deletedId = e.target.closest("li").getAttribute("id");
    todoList = todoList.filter((ele) => ele.id !== deletedId);
    addinmain();
}

// Marks a task as completed
function completeTodo(e) {
    var completedId = e.target.closest("li").getAttribute("id");
    todoList.forEach((obj) => {
        if (obj.id === completedId) {
            obj.complete = !obj.complete;
        }
    });
    addinmain();
}
