let doc = document
let login = doc.forms.login

let email_log = document.getElementById('email');
let password_log = document.getElementById('password');


const options = {
    headers: {
        'Content-Type': 'application/json'
    }
};


login.addEventListener("submit", function (event) {
    event.preventDefault()

    let email = email_log.value.toLowerCase();
    let password = password_log.value

   aziz.get("https://wepro-cca85-default-rtdb.firebaseio.com/users.json")
        .then((response) => {
            console.log(response);
            let users = Object.values(response.data).flatMap(obj => Object.values(obj));;
            console.log(users);
            const currentUser = users.find(user => user.email === email && user.password === password);
            if (currentUser) {
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                window.location.href = 'index.html';
            } else {
                alert('Неправильный email или пароль');
            }
        });
})