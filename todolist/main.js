const buttonAdd = document.querySelector(".icon");
const input = document.querySelector(".input-todo input");
const app = document.querySelector("#app");

// handle
function getValueInput(e) {
    let value = input.value.trim();
    return value;
}

function resetInput(e) {
    input.value = " ";
}

function deleteItem(listToDo) {
    listToDo.forEach((item, index) => {
        item.querySelector(".delete").addEventListener("click", (e) => {
            let child = item;
            child.remove();
        });
    });
}
function addToDo(e) {
    const list = document.querySelector(".list");
    getValueInput();
    let value = getValueInput();
    const li = document.createElement("li");
    li.innerHTML = `
    <input type="checkbox" class="checkbox" />
    <p class="content">${value}</p>
    <button class="delete">
    <i class="fa-sharp fa-solid fa-trash"></i>
    </button>
    `;
    li.setAttribute("class", "item");
    list.appendChild(li);
    deleteItem(updataTodo());
    resetInput();
    input.focus();
}

function updataTodo() {
    let listTodo = document.querySelectorAll(".item");
    return listTodo;
}
//event
buttonAdd.onclick = () => {
    addToDo();
};
app.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addToDo();
    }
});
deleteItem(updataTodo());
