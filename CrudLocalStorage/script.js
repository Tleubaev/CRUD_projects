function validateForm() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;

    if (name === '') {
        alert('Укажите имя');
        return false;
    }

    if (age === '') {
        alert('Укажите возраст');
        return false;
    } else if (age <= 0) {
        alert('Возраст должен быть больше 0');
        return false;
    }

    if (address === '') {
        alert('Укажите адрес');
        return false;
    }

    if (email === '') {
        alert('Укажите электронный адрес');
        return false;
    } else if (!email.includes('@')) {
        alert('Укажите корректный электронный адрес');
        return false;
    }

    return true;
};

function showData() {
    let peopleList = [];
    if (JSON.parse(localStorage.getItem("peopleList")) === null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    let html = '';
    
    peopleList.forEach((item, index) => {
        html += '<tr>';
        html += '<td>' + item.name + '</td>';
        html += '<td>' + item.age + '</td>';
        html += '<td>' + item.address + '</td>';
        html += '<td>' + item.email + '</td>';
        html += `<td>
                    <button class="btn btn-danger" onclick="deleteData(${index})">Delete</button>
                    <button class="btn btn-warning m-2" onclick="updateData(${index})">Edit</button>        
                </td>`;
    });

    
    document.querySelector('#crudTable tbody').innerHTML = html;
}

document.onload = showData();


function addData() {
    if (validateForm() === true) {
        let name = document.getElementById('name').value;
        let age = document.getElementById('age').value;
        let address = document.getElementById('address').value;
        let email = document.getElementById('email').value;

        
        let peopleList = [];
        if (JSON.parse(localStorage.getItem("peopleList")) === null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }
        
        peopleList.push(
            {
                name: name,
                age: age,
                address: address,
                email: email,
            }
        );
        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById('name').value = "";
        document.getElementById('age').value = "";
        document.getElementById('address').value = "";
        document.getElementById('email').value = "";
    }
}

function deleteData(id) {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
    peopleList.splice(id, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

function updateData(id) {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));

    document.getElementById('submit').style.display = 'none';
    document.getElementById('update').style.display = 'block';

    document.getElementById('name').value = peopleList[id].name;
    document.getElementById('age').value = peopleList[id].age;
    document.getElementById('address').value = peopleList[id].address;
    document.getElementById('email').value = peopleList[id].email;

    document.getElementById('update').onclick = () => {
        if (validateForm() === true) {
            let name = document.getElementById('name').value;
            let age = document.getElementById('age').value;
            let address = document.getElementById('address').value;
            let email = document.getElementById('email').value;
            
            peopleList.splice(id, 1,
                {
                    name: name,
                    age: age,
                    address: address,
                    email: email,
                }
            );
            localStorage.setItem("peopleList", JSON.stringify(peopleList));
            showData();
            document.getElementById('name').value = "";
            document.getElementById('age').value = "";
            document.getElementById('address').value = "";
            document.getElementById('email').value = "";

            document.getElementById('submit').style.display = 'block';
            document.getElementById('update').style.display = 'none';
        }
    }
}