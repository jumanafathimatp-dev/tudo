function fetchAllTodos() {
  fetch('https://dummyjson.com/todos')
    .then(res => res.json())
    .then(data => {
      todos = data.todos
      renderTodos();
    });
}

function renderTodos() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  todos.forEach((text, index) => {

    let li = document.createElement("li");
    li.className =
      "flex justify-between items-center bg-yellow-100 p-3 rounded";

    let div = document.createElement("div");
    div.className = "flex items-center gap-2 w-full";

    // checkbx
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = text.completed;

    let span = document.createElement("span");
    span.innerText = text.todo;

    if (text.completed) {
      span.classList.add("line-through");
    }

    checkbox.onclick = function () {
      span.classList.toggle("line-through");
     
    };

    div.appendChild(checkbox);
    div.appendChild(span);






    // editttt



    
    let editBtn = document.createElement("button");
    editBtn.innerText = "✏️";

    editBtn.onclick = function () {
      let input = document.createElement("input");
      input.value = text.todo;
      input.className = "border px-2";

      div.replaceChild(input, span);
      input.focus();

      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          text.todo = input.value;
          span.innerText = input.value;
          div.replaceChild(span, input);

          
          fetch(`https://dummyjson.com/todos/${text.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              todo: input.value,
            }),
          })
          .then(res => res.json())
          .then(console.log);
        }
      });
    };





    // delete 
    let delBtn = document.createElement("button");
    delBtn.innerText = "❌";

    delBtn.onclick = function () {
      todos.splice(index, 1);
      renderTodos();

      
      fetch(`https://dummyjson.com/todos/${text.id}`, {
        method: "DELETE",
      })
      .then(res => res.json())
      .then(console.log);
    };

    li.appendChild(div);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}


fetchAllTodos();
