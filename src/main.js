render();
function render(){
    let list = document.getElementById("taskList");
  list.innerHTML = ""; 

  let todos = JSON.parse(localStorage.getItem('todos')) || [];
   todos.forEach((text, index) => {

    let li = document.createElement("li");
  li.className = "flex justify-between items-center bg-yellow-100 p-3 rounded";


  let div = document.createElement("div");
  div.className="flex items-center gap-2 w-full";
  // div.classList.add("flex-1");

  let checkbox = document.createElement("input");
  checkbox.type="checkbox";

  let span = document.createElement("span");
  span.innerText =  text;

 checkbox.onclick =function(){
    if (checkbox.checked){
      span.classList.add("line-through");
    
     
    }
    
     else{
      span.classList.remove("line-through");
    
     }
     
         localStorage.setItem("todos", JSON.stringify(todos)); 
  
         
  };
  

  div.appendChild(checkbox);
  div.appendChild(span);
  li.appendChild(div);
 
  
  let button = document.createElement("button");
  button.innerText="❌";
  button.className="ml-2";

  button.onclick = function(){
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    render(); 
  };
  

  li.appendChild(button);

  
  let edit = document.createElement("button");
  edit.innerText="✏️";
  edit.className="ml-2";

  edit.onclick = function(){

    let inbox = document.createElement("input");
    inbox.className="border px-2 py-1 rounded w-full";
    inbox.value=span.innerText;

    div.replaceChild(inbox, span);
    inbox.focus();

    inbox.addEventListener("keydown", function(e){
      if(e.key === "Enter"){
        todos[index] = inbox.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        render(); 
      }
    });

  };

  li.appendChild(edit);

  document.getElementById("taskList").appendChild(li);
})


};

 function delay(){
  return new Promise((resolve) => {
    setTimeout(() => {
    resolve();
    },2000);
    
  });
}


async function addTask(){
  let input = document.getElementById("taskInput");
  let text = input.value; 
  if(text === "") return; 

  let list =document.getElementById("taskList");
  list.innerHTML= "loading";
  
  await delay();

   let todos = JSON.parse(localStorage.getItem('todos')) || [];
  
  todos.push(text);





  localStorage.setItem("todos", JSON.stringify(todos));

  input.value = "";

  render(); 
}

