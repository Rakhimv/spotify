const doc = document
let auth = false

let leftNav = doc.querySelector(".left_Nav")
let navArr = doc.querySelector(".nav-arr")
let logoTextSpotify = doc.querySelector(".imgSpotify")
let logoPc = doc.querySelector(".logo-pc")
let menuContainer = doc.querySelector(".menu_container")
let navPlaylist = doc.querySelector(".nav_playlist")
let downBTN = doc.querySelector('.download_hide')
let contINP = doc.querySelector('.cont_input')

// Переключение левого блока
navArr.addEventListener("click", function () {

    if (leftNav.clientWidth !== 95) {
        leftNav.classList.add("nav_resize")
        logoTextSpotify.style.display = "none"
        logoPc.classList.add("active-nav")
        navArr.style.transform = "rotate(180deg)"
        menuContainer.classList.add('menu_container-active')
        navPlaylist.style.display = "none"
        downBTN.style.display = "flex"

    } else if (leftNav.clientWidth === 95) {
        leftNav.classList.remove("nav_resize")
        logoPc.classList.remove("active-nav")
        logoTextSpotify.style.display = "block"
        navArr.style.transform = "rotate(360deg)"
        menuContainer.classList.remove('menu_container-active')
        navPlaylist.style.display = "block"
        downBTN.style.display = "none"
    }

    for (let i = 0; i < janres.length; i++) {
        const elem = janres[i]
        elem.classList.remove('item_playlist-active');
        elem.nextElementSibling.style.display = "none"

    }
})


//Открытие и закртытие плейлиста левого блока
let janres = doc.getElementsByClassName("top_play")

for (let i = 0; i < janres.length; i++) {
    const item = janres[i];
    item.addEventListener('click', () => {

        for (let i = 0; i < janres.length; i++) {
            const elem = janres[i]
            if (elem !== item) {
                elem.classList.remove('item_playlist-active');
                elem.nextElementSibling.style.display = "none"
            }
        }

        if (item.classList.contains('item_playlist-active')) {
            item.classList.remove('item_playlist-active');
            item.nextElementSibling.style.display = "none"
        } else {
            item.classList.add('item_playlist-active');
            item.nextElementSibling.style.display = "block"
        }
    });
}



// Скачать spotify
let downBtn = doc.querySelector(".download_app")

function downloadEXE() {
    let conf = confirm('Вы точно хотите скачать файл SpotifySetub.exe')
    if (conf === true) {
        window.location.href = "https://download.scdn.co/SpotifySetup.exe"
    }
}


// Открытие правого блока
let rightNav = doc.querySelector(".right_Nav")
let rightNav_hide = doc.querySelector(".right_Nav-hide")
let friendActivity = doc.querySelector(".friendActivity")
let friendContainer = doc.querySelector(".friend_container")

rightNav_hide.addEventListener("click", function () {

    let rightNav_w = rightNav.clientWidth

    if (rightNav_w === 40) {
        rightNav.classList.add("right_Nav-active")
        friendActivity.style.display = "flex"
        friendContainer.style.display = "block"
    } else {
        rightNav.classList.remove("right_Nav-active")
        friendActivity.style.display = "none"
        friendContainer.style.display = "none"
    }

    console.log(friendContainer);

})



// Активные кнопки меню
let searchInp = doc.querySelector("#search_inp")
let itemMenuBtn = doc.getElementsByClassName("item_menu")

for (let i = 0; i < itemMenuBtn.length; i++) {
    const btn = itemMenuBtn[i];



    btn.onclick = () => {
        for (let i = 0; i < itemMenuBtn.length; i++) {
            const elem = itemMenuBtn[i];
            elem.classList.remove("item_menu-active")
        }
        btn.classList.add("item_menu-active")

        if (i === 0) {
            basic.innerHTML = home
            contINP.style.display = "none"
            onResize()
            backarrStatus = false
        }

        if (i === 1) {
            basic.innerHTML = search
            searching()
            searchInp.focus()
        }
    }
}

function searching() {
    contINP.style.display = "flex"
    fetch('../server/janres.json')
    .then(response => response.json())
    .then(data => {
        browse(data, searchInp)
    });

}