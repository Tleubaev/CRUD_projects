document.getElementById('addTodo').addEventListener('click', async () => {
    const input = document.getElementById('todoText');
    const title = input.value

    if (title) {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({title, completed: false}),
            }
        );
        const todo = await res.json();
        console.log(todo);
        todosToHtml(todo);
        input.value = "";
    }
})

async function getAllTodos() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/?_limit=10')
        .then(res => res.json());
    
    console.log(res);
    res.forEach(item => {
        todosToHtml(item);
    })
}

document.onload = getAllTodos();


function todosToHtml({id, title, completed}) {
    const todoList = document.getElementById('todos');

    todoList.insertAdjacentHTML('beforeend', `
        <div class="form-check" id="todo${id}">
            <label class="form-check-label">
                <input onclick="toggleCompleteTodo(${id})" id="todoText" type="checkbox" class="form-check-input" ${completed && 'checked'}>
                ${title}
            </label>
            <button onclick="deleteTodos(${id})" class="btn btn-close" aria-label="Close"></button>
        </div>
    `);
}

async function deleteTodos(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
    console.log(res);

    if (res) {
        document.getElementById(`todo${id}`).remove();
    }
}

async function toggleCompleteTodo(id) {

    const completed = document.querySelector(`#todo${id} input`).checked;

    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({completed: completed})
    }).then(res => res.json())
    console.log(res);
}