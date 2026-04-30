fetchAllTodos();

function markTodoAsChecked() {
  if (checkbox.checked) {
    span.classList.add("line-through");
  } else {
    span.classList.toggle("line-through");
  }
}

function renderTodos(todos) {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  // let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach((text, index) => {
    let li = document.createElement("li");
    li.className =
      "flex justify-between items-center bg-yellow-100 p-3 rounded";

    let div = document.createElement("div");
    div.className = "flex items-center gap-2 w-full";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    let span = document.createElement("span");
    span.innerText = text.todo;

    checkbox.onclick = markTodoAsChecked;

    div.appendChild(checkbox);
    div.appendChild(span);
    li.appendChild(div);

    list.appendChild(li);
  });

  
}
delBtn.onclick = function () {
  todos.splice(index, 1);
  renderTodos(todos);

  // ✅ DELETE API here
  fetch("https://dummyjson.com/todos/1", {
    method: "DELETE",
  })
    .then((res) => res.json())
     .then((data) => {
      deleteTodos(li);

     })  
    
};
  
  // function deleteTodos(todos){
  //    let delBtn = document.createElement("button");
  //   delBtn.innerText = "❌";

  //   delBtn.onclick = function () {
  //     todos.splice(index, 1);
  //     renderTodos();

     
  //     li.appendChild(button);
  //   };
  // }
     

  let edit = document.createElement("button");
  edit.innerText = "✏️";

  edit.onclick = function () {
    let inbox = document.createElement("input");
    inbox.className = "border px-2 py-1 rounded w-full";
    inbox.value = span.innerText;

    div.replaceChild(inbox, span);
    inbox.focus();

    inbox.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        todos[index] = inbox.value;
        // localStorage.setItem("todos", JSON.stringify(todos));
        // render();
      }
    });
  };


function fetchAllTodos() {
  fetch("https://dummyjson.com/todos")
    .then((res) => res.json())
    .then((data) => {
      renderTodos(data.todos);
    });

  
}

function addTask() {
  let input = document.getElementById("taskInput");
  let text = input.value;
  if (text === "") return;

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.push(text.todo);

  // localStorage.setItem("todos", JSON.stringify(todos));

  input.value = "";

  render();
}
