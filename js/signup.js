let doc = document
let form_signUP = doc.forms.signup
let emailReg = doc.querySelector(".email_reg")
let nameReg = doc.querySelector(".name_reg")
let password = doc.querySelector(".pass")
let avaInput = document.getElementById('ava');
let AvatarPrew = document.getElementById('avaBgc');
let male = doc.querySelector("#man")
let female = doc.querySelector("#woman")
let passForm = doc.querySelector(".passForm")
let finalForm = doc.querySelector(".finalForm")
let nextOne = doc.querySelector("#next1")
let nextTwo = doc.querySelector("#next2")
let bgcForm = doc.querySelector(".bgcForm")
let avaSrc = ""


let labels = doc.querySelectorAll(".labels")
for (let item of labels) {
    item.onclick = () => {
        for (let elem of labels) {
            elem.classList.remove("activeMal")
        }
        item.classList.add('activeMal')

    }
}

nextOne.addEventListener("click", function () {
    if (emailReg.checkValidity() && nameReg.checkValidity()) {
        passForm.style.display = "block"
    }
})

nextTwo.addEventListener("click", function () {
    if (emailReg.checkValidity() && nameReg.checkValidity()) {
        finalForm.style.display = "block"
    }
})

avaInput.addEventListener('change', function () {
    let file = avaInput.files[0];
    const formData = new FormData();
    console.log(file);
    formData.append('file', file);
    formData.append('upload_preset', 'qn96wxbq');

    fetch('https://api.cloudinary.com/v1_1/dbn91sn4f/image/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            avaSrc = data.url
            setTimeout(() => {
                AvatarPrew.style.backgroundImage = `url('${data.url}')`
            }, 1000);
            AvatarPrew.classList.add("avaPrew")
        })


});

const options = {
    headers: {
        'Content-Type': 'application/json'
    }
};

signup.addEventListener("submit", function (event) {
    event.preventDefault();


    let userMale
    if (male.checked) {
        userMale = 'Man'
    } else userMale = 'Woman'

    let data = {
        email: emailReg.value.toLowerCase(),
        name: nameReg.value,
        password: password.value,
        male: userMale,
        avatar: avaSrc,
        auth: true
    }

    axios.post(`https://wepro-cca85-default-rtdb.firebaseio.com/users/${emailReg.value.split("@")[0]}.json`, data, options)
    setTimeout(() => {
        alert("Вы успешно зарегистрировались теперь войдите в свой аккаунт!")
        window.location.href = "login.html"
    }, 3000);
})
