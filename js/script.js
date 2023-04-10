let leftNav = doc.querySelector(".left_Nav")
let navArr = doc.querySelector(".nav-arr")
let logoTextSpotify = doc.querySelector(".imgSpotify")
let logoPc = doc.querySelector(".logo-pc")
let menuContainer = doc.querySelector(".menu_container")
let navPlaylist = doc.querySelector(".nav_playlist")
let downBTN = doc.querySelector('.download_hide')
let contINP = doc.querySelector('.cont_input')
let searchInp = doc.querySelector("#search_inp")
let itemMenuBtn = doc.getElementsByClassName("item_menu")
let rightNav = doc.querySelector(".right_Nav")
let rightNav_hide = doc.querySelector(".right_Nav-hide")
let friendActivity = doc.querySelector(".friendActivity")
let friendContainer = doc.querySelector(".friend_container")
let janres = doc.getElementsByClassName("top_play")
let downBtn = doc.querySelector(".download_app")
let inputSearch = document.querySelector('#search_inp');
let setCont = doc.querySelector(".topCont")
let topSong = doc.querySelector(".topSong")
let sets = doc.getElementsByClassName("sets")
let homeNav = doc.querySelector(".home_Nav");
let header = doc.querySelector("header")
let MyName = doc.querySelector(".MyProfile")
let images = doc.querySelectorAll("img")
let frinedsAuthFalse = doc.querySelector(".friends_authFalse")
let frinedsAuthTrue = doc.querySelector(".friends_authTrue")
let control_authFalse = doc.querySelector(".control_authFalse")
let control_authTrue = doc.querySelector(".control_authTrue")
let MySetting = document.querySelector(".MySetting");
let createPlaylist_btn = doc.querySelector(".createPlaylist")
let bgcStart = doc.querySelector(".bgcLoad")
let recentlyBtn = doc.querySelector("#recentlyBtn")
let newNew = doc.querySelector(".newNew")


setTimeout(() => {
    bgcStart.style.display = "none"
}, 4500);

// Начальная окно плейлистов
const playlists = document.querySelector('.playlists');
playlists.innerHTML = search


// Опции что бы кидать get или post запрос
const options = {
    headers: {
        'Content-Type': 'application/json'
    }
};



// Включатель левого блока
navArr.addEventListener("click", function () {

    if (leftNav.clientWidth !== 95) {
        leftNav.classList.add("nav_resize")
        logoTextSpotify.style.display = "none"
        logoPc.classList.add("active-nav")
        navArr.style.transform = "rotate(180deg)"
        menuContainer.classList.add('menu_container-active')
        navPlaylist.style.display = "none"
        downBTN.style.display = "flex"
        newNew.style.display = "none"

    } else if (leftNav.clientWidth === 95) {
        leftNav.classList.remove("nav_resize")
        logoPc.classList.remove("active-nav")
        logoTextSpotify.style.display = "block"
        navArr.style.transform = "rotate(360deg)"
        menuContainer.classList.remove('menu_container-active')
        navPlaylist.style.display = "block"
        downBTN.style.display = "none"
        newNew.style.display = "block"
    }

    for (let i = 0; i < janres.length; i++) {
        const elem = janres[i]
        elem.classList.remove('item_playlist-active');
        elem.nextElementSibling.style.display = "none"
    }
})


// Скачать spotify
function downloadEXE() {
    let conf = confirm('Вы точно хотите скачать файл SpotifySetub.exe')
    if (conf === true) {
        window.location.href = "https://download.scdn.co/SpotifySetup.exe"
    }
}

let nbm1 = null
let nbm2 = null
// Взять жанры из спотифай
function getJanres() {
    axios.get(`${url_liked}janres/-NQsqWEQgtB6wjjsIdBd.json`)
        .then(response => {
            playlists.innerHTML = ""
            let iis = []
            for (i in response.data) {
                iis.push(i)
            };
            let dta = Object.values(response.data);

            for (let item of dta) {
                if (item !== null) {
                    let playlist = document.createElement('div');
                    playlist.classList.add('item_playlist');

                    let topPlay = document.createElement('div');
                    topPlay.classList.add('top_play');
                    playlist.appendChild(topPlay);

                    let genreHeading = document.createElement('p');
                    genreHeading.textContent = item.folder;
                    topPlay.appendChild(genreHeading);


                    let loadedIcon = document.createElement('img');
                    loadedIcon.src = 'icons/array.svg';
                    loadedIcon.alt = '';
                    loadedIcon.classList.add('loaded');
                    topPlay.appendChild(loadedIcon);
                    let janresContainer = document.createElement('div');
                    janresContainer.classList.add('janr');
                    playlist.appendChild(janresContainer);


                    if (item.janres) {
                        for (let itemJanr of item.janres) {
                            if (itemJanr) {
                                let janreElement = document.createElement('div');
                                janreElement.classList.add('item_janres');
                                let janreHeading = document.createElement('p');
                                janreHeading.textContent = itemJanr.title;
                                janreElement.appendChild(janreHeading);
                                janreElement.onclick = async () => {
                                    removeMenu()
                                    let otherItems = doc.getElementsByClassName("item_janres")
                                    for (let elem of otherItems) {
                                        elem.classList.remove("activeJanr")
                                    }
                                    janreElement.classList.add("activeJanr")
                                    if (itemJanr.arr === "client") {
                                        let tracki = await mytracks(item.janres.indexOf(itemJanr), iis[dta.indexOf(item)])
                                        nbm2 = item.janres.indexOf(itemJanr)
                                        listMy(itemJanr.arr, itemJanr.src, itemJanr.title, itemJanr.des, tracki, janreElement)
                                    } else {
                                        listPlaylist(itemJanr.arr, itemJanr.src, itemJanr.title, itemJanr.des, itemJanr.index)
                                    }
                                }
                                if (itemJanr.arr === "client") {
                                    nbm2 = item.janres.indexOf(itemJanr)
                                    nbm1 = iis[dta.indexOf(item)]
                                }
                                janresContainer.appendChild(janreElement);
                            }
                        }
                    }
                    playlist.oncontextmenu = (e) => {
                        if (!item.type) {
                            e.preventDefault()
                            let delFolder = confirm(`Удалить папку ${item.folder}?`)
                            if (delFolder === true) {
                                playlists.innerHTML = search
                                axios.delete(`${url_liked}janres/-NQsqWEQgtB6wjjsIdBd/${iis[dta.indexOf(item)]}.json`)
                                setTimeout(() => {
                                    getJanres()
                                }, 1000);
                            }
                        }
                    }
                    playlists.appendChild(playlist);
                }
            }


            //Открытие и закртытие папок левого блока
            for (let i = 0; i < janres.length; i++) {
                const item = janres[i];
                item.addEventListener('click', () => {
                    if (auth.auth === false) {
                        alert('Please Sign Up 🎵')
                    } else {
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
                    }
                });
            }
        })
}
getJanres()





// Открытие правого блока
rightNav_hide.addEventListener("click", function () {
    friendsWindow()
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
})



// Активные кнопки меню
function removeMenu() {
    for (let i = 0; i < itemMenuBtn.length; i++) {
        const elem = itemMenuBtn[i];
        elem.classList.remove("item_menu-active")
    }
    closeAi()
    inputSearch.value = ""
    setCont.style.display = "none"
    topSong.style.display = "none"
    let otherItems = doc.getElementsByClassName("item_janres")
    for (let item of otherItems) {
        item.classList.remove("activeJanr")
    }
}


let intervalId;
let downloading = false;

for (let i = 0; i < itemMenuBtn.length; i++) {
    const btn = itemMenuBtn[i];
    btn.onclick = () => {
        closeLyric()
        seeall_status = false
        clearTimeout(start)
        homeNav.scroll(0, 0)
        if (i === 0) {
            basic.innerHTML = home
            contINP.style.display = "none"
            onResize()
            removeMenu()
            backarrStatus = false
            btn.classList.add("item_menu-active")
        }

        if (i === 1) {
            basic.innerHTML = search
            searching()
            removeMenu()
            searchInp.focus()
            btn.classList.add("item_menu-active")
            backar.status = true
        }

        if (i === 2) {
            if (auth.auth === false) {
                setTimeout(() => {
                    pleaseAuth(btn)
                }, 300);

            } else {
                removeMenu()
                btn.classList.add("item_menu-active")
                library()
            }
        }

        if (i === 3) {
            if (auth.auth === false) {
                setTimeout(() => {
                    pleaseAuth(btn)
                }, 300);
            } else {
                removeMenu()
                btn.classList.add("item_menu-active")
                itemsLiked()
            }
        }

        if (i === 4) {
            if (auth.auth === false) {
                setTimeout(() => {
                    pleaseAuth(btn)
                }, 300);
            } else {
                removeMenu()
                btn.classList.add("item_menu-active")
                if (intervalId) {
                    console.log(intervalId);
                    if (!downloading) {
                        clearInterval(intervalId);
                        windowDownload();
                    }
                } else {
                    windowDownload();
                }
            }
        }
    }
}



let mb_kanres = null
//  Жанры из страницы поиск
async function searching() {
    contINP.style.display = "flex"
    fetch('https://rakhimv.github.io/spotify/server/janres.json')
        .then(response => response.json())
        .then(data => {
            mb_kanres = data
            browse(data, searchInp)
        });
}




// Клик на верхние категории
function catClick() {
    let myCategories = doc.querySelectorAll(".my_category div")
    for (let i = 0; i < myCategories.length; i++) {
        const elem = myCategories[i];
        let background = window.getComputedStyle(elem, null).getPropertyValue("background");
        let elemSrc = elem.firstElementChild.firstElementChild.src
        elem.onclick = () => {
            if (auth.auth === false) {
                category(elemSrc, i + 1)
            } else {
                backarr.status = true
                if (i === 0) {
                    itemMenuBtn[3].click()
                } else if (i === 1) {
                    listRecently()
                } else if (i === 2) {
                    listPlaylist("37i9dQZEVXbMDoHDwVN2tF", "./img/friends.png", "Friends Played", My_name, 0)
                }
            }
        }
    }
}



window.addEventListener("click", function () {
    catClick()
    setsContains()
})


// Функция выбора категорий
function setsContains() {
    if (!sets[1].classList.contains('setsActive')) {
        topSong.style.display = 'none'
    }
    if (setCont.style.display === "none") {
        for (let i = 0; i < sets.length; i++) {
            const items = sets[i];
            items.classList.remove("setsActive")
        }
        sets[0].classList.add('setsActive')
    }
}

// Поиск запрос
async function loadData(inpv, func) {
    setCont.style.display = "flex"
    try {
        const accessToken = await getToken();
        const response = await fetch(`https://api.spotify.com/v1/search?q=${inpv}*&type=album,artist,playlist,track&limit=50&offset=0`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (inputSearch.value === "") {
            itemMenuBtn[1].click()
            setCont.style.display = "none"
        } else {
            func(data)
        }

       

    } catch (error) {

    }
}


// Поиск в MyPlaylist 
async function prostoPoisk(inpv, func) {
    const accessToken = await getToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${inpv}*&type=track&limit=10&offset=0`, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    func(data)
}

// Поле ввода поиска
let zaderjka;
inputSearch.addEventListener('input', () => {
    basic.innerHTML = search
    homeNav.scroll(0, 0)
    if (inputSearch.value !== "") {
        loadData(inputSearch.value, searchInner);
        if (!sets[0].classList.contains('setsActive')) {
            sets[0].click()
        }
    } else {
        itemMenuBtn[1].click()
        setCont.style.display = "none"
        topSong.style.display = "none"
    }

});






// События нажатия на кнопки поиска категории
for (let i = 0; i < sets.length; i++) {
    const element = sets[i];
    element.onclick = () => {
        for (let i = 0; i < sets.length; i++) {
            const items = sets[i];
            items.classList.remove("setsActive")
        }
        homeNav.scroll(0, 0)
        element.classList.add('setsActive')

        if (i === 0) {
            basic.innerHTML = search
            loadData(inputSearch.value, searchInner);
        }
        if (i === 1) {
            basic.innerHTML = search
            loadData(inputSearch.value, searchSongs);
            topSong.style.display = 'grid'
        }
        if (i === 2) {
            basic.innerHTML = search
            loadData(inputSearch.value, searchAlbum);
        }
        if (i === 3) {
            basic.innerHTML = search
            loadData(inputSearch.value, searchArtist);
        }
        if (i === 4) {
            basic.innerHTML = search
            loadData(inputSearch.value, searchPlaylist);
        }
    }
}


// Изменение цвета скролла в зависимости от цвета плейлиста
let headerScrollColor = '#070707'
let plhname = ""
let playlistHname = doc.querySelector(".playlist_hname")

homeNav.addEventListener("scroll", function () {
    if (homeNav.scrollTop > 99) {
        if (doc.querySelector(".home_Cont")) {
            header.style.background = headerScrollColor
            playlistHname.style.display = "block"
            playlistHname.innerHTML = plhname
        } else {
            header.style.background = "#070707"
            playlistHname.style.display = "none"
        }
        setCont.style.backgroundColor = "#302E2E"
        topSong.style.backgroundColor = "#4B4A4A"

    } else if (homeNav.scrollTop < 99) {
        header.style.background = "#00000038"
        setCont.style.backgroundColor = "#0000004a"
        topSong.style.backgroundColor = "#0000004a"
        playlistHname.style.display = "none"
    }
})





// Убрать блок если клик был вне блока
document.addEventListener("click", function (event) {
    var target = event.target;

    if (
        target !== MyProfile &&
        target !== MyProfile.firstElementChild &&
        target !== MyProfile.lastElementChild
    ) {
        MySetting.style.display = "none";
    }

    if (target !== playlistsDot) {
        createSets.classList.remove("block")
    }
});

MyProfile.addEventListener("click", function () {
    if (MySetting.style.display === "none") {
        MySetting.style.display = "flex";
    } else {
        MySetting.style.display = "none";
    }
});



// Профиль
let setProfile = doc.getElementById("setProfile")
let logout = doc.getElementById("logout")
let backBgc = doc.querySelector(".backBgc")
let editProfile = doc.querySelector(".editProfile")
let editCont = doc.querySelector(".editCont")
let reavaInp = doc.querySelector(".reava label")
let nameInp = doc.getElementById("nameInp")
let userInfo = doc.querySelector(".userInfo")
let saveBtn = doc.getElementById("saveBtn")
let reaveInput = doc.querySelector("#refile")
let addImgPro = doc.querySelector(".bx-image-add")
let reava = doc.querySelector(".reava")

setProfile.onclick = () => {
    editProfile.style.display = "block"
    let userDataJ = localStorage.getItem('currentUser')
    let userData = JSON.parse(userDataJ)
    reavaInp.style.backgroundImage = `url("${userData.avatar}")`
    nameInp.value = userData.name
    userInfo.innerHTML = `
    <span>E-mail: <span class="mono">${userData.email}</span></span>
    <span>Male: <span class="mono">${userData.male}</span></span>
    <span>Password: <span class="mono">${userData.password}</span></span>
    `
}
let dataUrl = ""
reaveInput.addEventListener("change", function () {
    const FDATA = new FormData();
    let imgFile = reaveInput.files[0]
    FDATA.append('file', imgFile);
    FDATA.append('upload_preset', 'qn96wxbq');

    fetch('https://api.cloudinary.com/v1_1/dbn91sn4f/image/upload', {
        method: 'POST',
        body: FDATA
    })
        .then(response => response.json())
        .then(data => {
            reavaInp.style.backgroundImage = `url("${data.url}")`
            dataUrl = data.url
        })
})



// Сохранить изменения
saveBtn.onclick = () => {
    let userDataJ = localStorage.getItem('currentUser')
    let userData = JSON.parse(userDataJ)

    if (dataUrl === "") {
        dataUrl = userData.avatar
    }

    let data = {
        email: userData.email,
        name: nameInp.value,
        password: userData.password,
        male: userData.male,
        avatar: dataUrl,
        auth: 'true'
    }

    localStorage.clear()
    axios.get(`https://wepro-cca85-default-rtdb.firebaseio.com/users/${userData.email.split("@")[0]}.json`)
        .then(res => {
            console.log(res.data);
            let i
            for (e in res.data) {
                i = e
            }
            axios.put(`https://wepro-cca85-default-rtdb.firebaseio.com/users/${userData.email.split("@")[0]}/${i}.json`, data)
                .then(response => {
                    console.log(response);
                    localStorage.setItem('currentUser', JSON.stringify(response.data));
                    window.location.reload()
                })

        })
}

addImgPro.onclick = () => {
    reavaInp.click()
}

// Убрать paceholder при наведении
reava.addEventListener('mouseover', function (event) {
    if (event.target === reavaInp || event.target === addImgPro) {
        reavaInp.style.opacity = 0.2;
        addImgPro.style.display = 'block';
    }
});
reava.addEventListener('mouseout', function (event) {
    if (event.target === reavaInp || event.target === addImgPro) {
        reavaInp.style.opacity = 1;
        addImgPro.style.display = 'none';
    }
});


// Очистить локальное хранилице при выхода из аккаунта
logout.onclick = () => {
    localStorage.clear()
    setTimeout(() => {
        location.reload()
    }, 1000);
}

// Убрать модалку при клике на его фон
backBgc.onclick = () => {
    editProfile.style.display = "none"
}


// Ползунок конроллера
let range = document.getElementById("range");
let progress = document.getElementById("progress");
let audio = document.getElementById("nowAudio");
let dstart = doc.querySelector(".dur_start")
let dend = doc.querySelector(".dur_end")
let nowProgress = doc.querySelector(".nowProgress")

range.addEventListener("mousedown", function (e) {
    let offsetX = e.clientX - range.getBoundingClientRect().left;
    let width = range.offsetWidth;
    let value = (offsetX / width) * 100;
    value = Math.min(100, Math.max(0, value));
    progress.style.width = value + "%";
    nowProgress.style.width = value + "%";
    mobileC2.style.width = value + "%";
    input_range.value = value;
    audio.currentTime = audio.duration * (value / 100);

    function move(e) {
        let offsetX = e.clientX - range.getBoundingClientRect().left;
        let width = range.offsetWidth;
        let value = (offsetX / width) * 100;
        value = Math.min(100, Math.max(0, value));
        progress.style.width = value + "%";
        nowProgress.style.width = value + "%";
        mobileC2.style.width = value + "%";
        input_range.value = value;
        audio.currentTime = audio.duration * (value / 100);
    }

    function up(e) {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
    }

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
});


audio.addEventListener("timeupdate", function () {
    if (audio.readyState === 4) {
        var value = (audio.currentTime / audio.duration) * 100;
        progress.style.width = value + "%";
        nowProgress.style.width = value + "%";
        mobileC2.style.width = value + "%";
        input_range.value = value;
        dstart.innerHTML = formatTime(audio.currentTime)
        dend.innerHTML = formatTime(audio.duration);
        upc1.innerHTML = dstart.innerHTML
        upc2.innerHTML = dend.innerHTML
    }
});

progress.addEventListener("click", function (e) {
    var offsetX = e.clientX - range.getBoundingClientRect().left;
    var width = range.offsetWidth;
    var value = (offsetX / width) * 100;
    value = Math.min(100, Math.max(0, value));
    progress.style.width = value + "%";
    nowProgress.style.width = value + "%";
    mobileC2.style.width = value + "%";
    input_range.value = value;
    audio.currentTime = audio.duration * (value / 100);
});



// Вычисляем длительность музыки
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}


// Ползунок громкости
let range_sound = document.getElementById("range_sound");
let progress_sound = document.getElementById("progress_sound");

range_sound.addEventListener("mousedown", function (e) {
    let offsetX = e.clientX - range_sound.getBoundingClientRect().left;
    let width = range_sound.offsetWidth;
    let value = (offsetX / width) * 100;
    value = Math.min(100, Math.max(0, value));
    progress_sound.style.width = value + "%";
    audio.volume = `${value / 100}`
    progress_sound.style.backgroundColor = '#fff'

    function move(e) {
        let offsetX = e.clientX - range_sound.getBoundingClientRect().left;
        let width = range_sound.offsetWidth;
        let value = (offsetX / width) * 100;
        value = Math.min(100, Math.max(0, value));
        progress_sound.style.width = value + "%";
        audio.volume = `${value / 100}`
        progress_sound.style.backgroundColor = '#fff'
    }

    function up(e) {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        progress_sound.style.backgroundColor = '#b3b3b3';
    }

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
});


// При клике на паузу
let play_pause = doc.querySelector(".play_pause")
play_pause.addEventListener("click", function () {
    playPause()
})


// Функция паузы
function playPause() {
    let pl_status = play_pause.firstElementChild
    if (pl_status.src.includes("icons/Play.svg") && audio.paused === true) {
        pl_status.src = 'icons/Pause.svg'
        audio.play()
    } else if (audio.paused === false) {
        audio.pause()
        pl_status.src = "icons/Play.svg"
    }
}


// Кнопка повтор
let repeatBtn = doc.querySelector('.repeat-m');
let repeatImg = doc.querySelector('.repeat-m img');
repeatBtn.addEventListener('click', () => {
    if (repeatImg.src.includes('icons/Repeat.svg')) {
        repeatImg.src = 'icons/Random-active.svg';
        isRepeat = true
    } else {
        repeatImg.src = 'icons/Repeat.svg'
        isRepeat = false
    }
});


// Полноэкранный режим
let fullscreenBtn = doc.getElementById("fullscreen")

function fullscreen() {
    var elem = document.documentElement;
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => { });
        fullscreenBtn.src = 'icons/normscreen.png'
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            fullscreenBtn.src = 'icons/Full Screen.svg'
        }
    }
}


// Кнопка рандом
let randomBtn = doc.querySelector('.random-m');
let randomImg = doc.querySelector('.random-m img');
randomBtn.addEventListener('click', () => {
    if (randomImg.src.includes('icons/Shuffle.svg')) {
        randomImg.src = 'icons/Shuffle-active.svg';
        isRandom = true
    } else {
        randomImg.src = 'icons/Shuffle.svg'
        isRandom = false
    }
});


// Субтитры песни (lyrics)
let lyricsBtn = doc.getElementById("lyricsBtn")
let lyricsCont = doc.querySelector(".lyrics_container")
let lyricsInfo = doc.querySelector(".lyricsTitle span")
let lyricsText = doc.getElementById("lyricsText")
let lyricsClose = doc.querySelector(".lyrics_close")


lyricsBtn.addEventListener("click", lyricsOpen)
lyricsClose.addEventListener("click", closeLyric)

// Выйти из окна субтитры
function closeLyric() {
    lyricsCont.style.display = "none"
    homeNav.style.overflowY = 'scroll'
}


function lyricsOpen() {
    homeNav.scroll(0, 0)
    homeNav.style.overflowY = 'hidden'
    lyricsCont.scroll(0, 0)
    lyricsCont.style.display = "flex"
    lyricsCont.style.backgroundImage = `url('${nowImg.src}')`
    lyricsInfo.innerHTML = `${nowArtist.innerHTML} - ${nowName.innerHTML}`

    let trackName = nowName.innerHTML
    let artistName = nowArtist.innerHTML

    // Взять субтитры песни с помощью его id
    $.ajax({
        type: "GET",
        data: {
            apikey: "51790af03028d227937414b4eb458c89",
            q_artist: artistName,
            q_track: trackName,
            format: "jsonp",
            callback: "jsonp_callback"
        },
        url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get",
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        contentType: 'application/json',
        success: function (data) {
            lyricsText.innerHTML = search
            setTimeout(() => {
                if (data.message.body.lyrics && data.message.body.lyrics.lyrics_body) {
                    let vou = data.message.body.lyrics.lyrics_body;
                    vou = vou.replace(/\n/g, "<br>");
                    let lines = vou.split("<br>");
                    let spans = lines.map(line => `<span>${line}</span>`);
                    lyricsText.innerHTML = spans.join("").split("****")[0];
                    let spansLyr = lyricsText.querySelectorAll("span");
                    for (let i = 0; i < spansLyr.length; i++) {
                        if (spans[i].innerHTML === "") {
                            spans[i].remove()
                        }
                    }
                    setTimeout(() => {
                        lyricsAnim();

                    }, 1000);
                } else {
                    lyricsText.innerHTML = "<span class='nullLyrics'>Null Lyrics</span>";
                }
            }, 1000);
        }
    });

}


// Скроллим субтитры в зависимости от ползунка
function lyricsAnim() {
    const songDuration = audio.duration;
    const spanCount = lyricsText.querySelectorAll("span").length;
    const spanDuration = songDuration / spanCount;

    function highlightLyrics() {
        const currentTime = audio.currentTime;
        const currentSpanIndex = Math.floor(currentTime / spanDuration);
        const spans = lyricsText.querySelectorAll("span");
        for (let i = 0; i < spans.length; i++) {
            spans[i].classList.remove("activeLyric");
        }

        if (currentSpanIndex < spans.length) {
            for (let i = 0; i <= currentSpanIndex; i++) {
                spans[i].classList.add("activeLyric");
            }
        }

        let activeSpans = document.getElementsByClassName("activeLyric")
        if (activeSpans.length > 0) {
            let spansLast = activeSpans[activeSpans.length - 1]
            let topLScrol = spansLast.offsetTop - 200
            lyricsCont.scroll(0, topLScrol)
        }
    }
    audio.addEventListener("timeupdate", highlightLyrics);
}




// Кнопка лайка
let addLikedBnt = doc.getElementById("addLikedBtn")
addLikedBnt.addEventListener("click", function (event) {
    event.preventDefault()

    if (addLikedBnt.src.includes("imlike")) {
        addLikedBnt.src = './icons/Line=empty, Name=like.svg';
        axios.delete(url_liked + `likedSongs/${nowSongItem.id}.json`)
    } else {
        console.log(nowSongItem);
        added_at(nowSongItem)
        axios.post(url_liked + `likedSongs/${nowSongItem.id}.json`, nowSongItem, options)
            .then(response => console.log(response.data))
            .catch(error => console.error('Error:', error));
    }
})


// Кнопка скачать песню
let downloadMuz = doc.getElementById("downloadmuz")
downloadMuz.onclick = () => {
    if (!downloadMuz.src.includes("gif")) {
        download(nowSongItem.id)
        alert(`Не перезагружайте страницу! Идет скачивание песни ${nowName.innerHTML} 📥`)
        downloadMuz.src = "icons/down.gif"
        axios.post(url_liked + `downloads/${nowSongItem.id}.json`, nowSongItem, options)
            .then(response => console.log(response.data))
            .catch(error => console.error('Error:', error));
    }
}


// Создать папку или плейлист
let playlistsDot = doc.querySelector(".title img")
let createSets = doc.querySelector(".createSets")
playlistsDot.addEventListener("click", () => {
    createSets.classList.toggle("block")
})


// Создать папку
let createFolder_btn = doc.querySelector(".createFolder")
createFolder_btn.addEventListener("click", function () {
    if (auth.auth === false) {
        alert('Please Sign Up 🎵')
    } else {
        function folderName() {
            let nameFolder = prompt("Введите название папки! 📁")
            if (nameFolder === "") {
                folderName()
            } else {
                axios.get(`${url_liked}janres/-NQsqWEQgtB6wjjsIdBd.json`)
                    .then(response => {
                        let folder = {
                            folder: nameFolder
                        }
                        const data = Object.values(response.data); // преобразуем объект в массив
                        data.unshift(folder);
                        axios.put(`${url_liked}janres/-NQsqWEQgtB6wjjsIdBd.json`, data).then((response) => {
                            getJanres()
                        })
                    })
            }
        }
        folderName()
    }
})



// Создать плейлист
let setProfile2 = doc.getElementById("setProfile2")
let logout2 = doc.getElementById("logout2")
let backBgc2 = doc.querySelector(".backBgc2")
let editProfile2 = doc.querySelector(".editProfile2")
let editCont2 = doc.querySelector(".editCont2")
let reavaInp2 = doc.querySelector(".reava2 label")
let nameInp2 = doc.getElementById("nameInp2")
let nameInp3 = doc.getElementById("nameInp3")
let selectFolder = doc.getElementById("selectFolder")
let saveBtn2 = doc.getElementById("saveBtn2")
let reaveInput2 = doc.querySelector("#refile2")
let reava2 = doc.querySelector(".reava2")
let createForm = doc.getElementById("createForm")

let playlistSrcUrl = "null-img"
let playObj

createPlaylist_btn.addEventListener("click", function () {
    if (auth.auth === false) {
        alert('Please Sign Up 🎵')
    } else {
        editProfile2.style.display = "block"
        axios.get(`${url_liked}janres/-NQsqWEQgtB6wjjsIdBd.json`)
            .then(response => {
                selectFolder.innerHTML = ""
                playObj = response.data
                let dta = Object.values(response.data)
                console.log(dta, response);
                for (let item of dta) {
                    if (item !== null) {
                        let option = doc.createElement("option")
                        option.innerHTML = item.folder
                        option.selected = true
                        selectFolder.appendChild(option)
                    }
                }
            })
    }
})


// Преобразуем фото плейлиста в url
reaveInput2.addEventListener("change", function () {
    const FDATA = new FormData();
    let imgFile = reaveInput2.files[0]
    FDATA.append('file', imgFile);
    FDATA.append('upload_preset', 'qn96wxbq');
    fetch('https://api.cloudinary.com/v1_1/dbn91sn4f/image/upload', {
        method: 'POST',
        body: FDATA
    })
        .then(response => response.json())
        .then(data => {
            reavaInp2.style.backgroundImage = `url("${data.url}")`
            playlistSrcUrl = data.url
        })
})

// Отправка плейлиста в json
createForm.onsubmit = (e) => {
    e.preventDefault()
    editProfile2.style.display = "none"
    let i = findKeyByValue(playObj, selectFolder.value)
    let janres = {
        arr: 'client',
        des: nameInp3.value,
        index: i,
        src: playlistSrcUrl,
        title: nameInp2.value,
        fold: selectFolder.value,
    }

    let nullJanres = {
        janres: [janres]
    }

    axios.get(`${url_liked}janres/-NQsqWEQgtB6wjjsIdBd/${i}/janres.json`)
        .then((response) => {
            let data = response.data
            if (data === null) {
                axios.get(`${url_liked}janres/-NQsqWEQgtB6wjjsIdBd/${i}.json`)
                    .then((response2) => {
                        let data2 = response2.data
                        console.log(data2);
                        axios.put(`${url_liked}janres/-NQsqWEQgtB6wjjsIdBd/${i}.json`, {
                            ...data2,
                            ...nullJanres
                        }, options)
                    })
            } else {
                data.unshift(janres)
                axios.put(`${url_liked}janres/-NQsqWEQgtB6wjjsIdBd/${i}/janres.json`, data, options)
            }
            playlistSrcUrl = "null-img"
            createForm.reset()
        })

    setTimeout(() => {
        getJanres()
    }, 1000);
}

reava2.addEventListener('mouseover', function () {
    if (playlistSrcUrl === "null-img") {
        reavaInp2.style.backgroundImage = `url("../icons/choose.svg")`
    }
});

reava2.addEventListener('mouseout', function () {
    if (playlistSrcUrl === "null-img") {
        reavaInp2.style.backgroundImage = `url("../icons/playlistAdd.svg")`
    }
});

backBgc2.onclick = () => {
    editProfile2.style.display = "none"
}


leftNav.style.transition = "none"
rightNav.style.transition = "none"

// Берем элементы для работы с Ai
let aiCont = doc.querySelector(".ai_container")
let aiClose = doc.querySelector(".ai_close")
let aiProfile = doc.querySelector(".friendProfile")
let aiImg = doc.querySelector(".friendAva")
let aifriendName = doc.querySelector(".friendName")
let aiLastSeen = doc.querySelector(".lastSeen")
let inpAi = doc.getElementById("inpAi")
let sendSms = doc.querySelector(".aiSend")
let chat = doc.querySelector(".friendsChat")
let clearChat = doc.querySelector("#deletechat")
let apiSet = doc.querySelector("#apiSet")

let itemG;
let aiModel = "1" // Модель AI

// Открываем окно друзей
async function friendsWindow() {
    frinedsAuthTrue.innerHTML = ""
    if (auth.auth) {
        frinedsAuthFalse.style.display = "none"
        frinedsAuthTrue.style.display = "flex"
        let friendsArr = await axios.get(`${url_liked}frineds.json`)
            .then(response => {
                console.log(response.data);
                return Object.values(response.data)
            })

        for (let item of await friendsArr[0]) {
            let frCont = doc.createElement("div")
            frCont.classList.add('frCont')
            let frImg = doc.createElement("div")
            frImg.classList.add("frImg")
            frImg.style.backgroundImage = `url('${item.faceUrl}')`
            let frFlex = doc.createElement("div")
            frFlex.classList.add("frFlex")
            let franim = doc.createElement("div")
            franim.classList.add("franim")
            frFlex.innerHTML = `
                <p class="frName">${item.firstName} ${item.lastName}</p>
                <p class="frInfo">${item.currentSong} • ${item.artist}</p>
                <div class="frplay"><img src="./icons/fr.svg"> <span> ${item.playlist[0]}</span></div>
            `

            // Изменяем глобальную переменную на item
            setInterval(() => {
                if (aifriendName.innerHTML.includes(item.firstName)) {
                    itemG = item
                    itemG.index = friendsArr[0].indexOf(item)
                }
            }, 1000);


            item.index = friendsArr[0].indexOf(item)
            frCont.addEventListener("click", () => {
                setTimeout(() => {
                    chat.scrollTo(0, chat.scrollHeight)
                }, 1000);
                itemG = item
                chat.innerHTML = ""
                let frs = doc.getElementsByClassName("frCont")
                for (let elem of frs) {
                    elem.classList.remove("activeFr")
                }
                frCont.classList.add("activeFr")
                aiOpen(item)
                getSms()
                inpAi.focus()
            })
            frCont.appendChild(frImg)
            frCont.appendChild(frFlex)
            frCont.appendChild(franim)
            frinedsAuthTrue.appendChild(frCont)
        }

        // Отправка запроса на Ai при нажатии на Send
        sendSms.onclick = () => {
            let i = friendsArr[0].indexOf(itemG)
            console.log(itemG);
            sending(itemG)
        }

        // Отправка sms при нажатии на enter
        window.onkeydown = (e) => {
            if (e.code === "Enter" && aiCont.style.display !== "none" && !e.shiftKey) {
                e.preventDefault()
                sending(itemG)
                inpAi.value = ""
                inpAi.style.height = "35px"
            }
        }

    } else {
        frinedsAuthFalse.style.display = "flex"
        frinedsAuthTrue.style.display = "none"
    }
}

// Не увидичивать высоту textarea при нажатии enter
inpAi.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
    }
});

setTimeout(() => {
    friendsWindow()
}, 1000);



// Взять историю переписки из бд
function getSms() {
    chat.innerHTML = ""
    chat.scroll(0, chat.scrollHeight)
    axios.get(`${url_liked}frineds/-NQveaASJXUVUaryvbmn/${itemG.index}/smsbox.json`)
        .then(response => {
            if (response.data !== null) {
                data = Object.values(response.data)
                for (let sms of data) {
                    if (sms.role === "user") {
                        smsHu(sms.content)
                    } else {
                        smsAi(sms.content)
                    }
                }
            }
        })
}

// Звук smsки
let smsAudio = new Audio("../img/sentmessage.mp3")

// Отправка sms человека
function smsHu(value) {
    smsAudio.play()
    let hContainer = doc.createElement("div")
    hContainer.classList.add("hCont-sms")
    let smsHuman = doc.createElement("div")
    smsHuman.classList.add("smsHuman")
    smsHuman.innerHTML = value
    let smsAva = doc.createElement("div")
    smsAva.classList.add("smsAva")
    smsAva.style.backgroundImage = `url('${MyProfileUrl}')`

    hContainer.appendChild(smsAva)
    hContainer.appendChild(smsHuman)
    chat.appendChild(hContainer)
    chat.scroll(0, chat.scrollHeight)
}

// Отправка sms ИИ
function smsAi(value) {
    smsAudio.play()
    let aiContainer = doc.createElement("div")
    aiContainer.classList.add("aiCont-sms")
    let smsAi = doc.createElement("div")
    smsAi.classList.add("smsAi")
    smsAi.innerHTML = value
    let smsAva = doc.createElement("div")
    smsAva.classList.add("smsAva")
    smsAva.style.backgroundImage = `url('${itemG.faceUrl}')`

    aiContainer.appendChild(smsAva)
    aiContainer.appendChild(smsAi)
    chat.appendChild(aiContainer)
    chat.scroll(0, chat.scrollHeight)
}

// Событие выйти из окна если клиент нажал на выйти
aiClose.addEventListener("click", closeAi)

// Отправка sms на ai
async function sending(item) {
    if (inpAi.value !== "") {
        smsHu(inpAi.value)
        chat.scrollTo(0, chat.scrollHeight)

        let roleUser = {
            role: "user",
            content: inpAi.value
        }

        axios.post(`${url_liked}frineds/-NQveaASJXUVUaryvbmn/${item.index}/smsbox.json`, roleUser, options)

        if (aiModel === "1") {
            GPT35(item)
        } else {
            textDavinciAi(inpAi)
        }
        inpAi.value = ""
        inpAi.style.height = "35px"

    }
}




// Очистка истории чата
clearChat.addEventListener("click", () => {
    let deleteQ = confirm(`Вы уверены что хотите удалить историю чата ${itemG.firstName}`)
    if (deleteQ === true) {
        axios.delete(`${url_liked}frineds/-NQveaASJXUVUaryvbmn/${itemG.index}/smsbox.json`)
        setTimeout(() => {
            getSms()
        }, 1000);
    }
})


// Изменить модель Ai
apiSet.addEventListener("click", apiModl)

function apiModl() {
    let apiMod = prompt("Выберите модель AI:\n 1: GPT 3.5\n 2: text-davinci-003")
    console.log(apiMod);
    if (apiMod === "1" || apiMod === "2") {
        aiModel = apiMod
    } else {
        apiModl()
    }
}

// Выйти из чата
function closeAi() {
    aiCont.style.display = "none"
    homeNav.style.overflowY = 'scroll'
    let frs = doc.getElementsByClassName("frCont")
    for (let elem of frs) {
        elem.classList.remove("activeFr")
    }
}

// Поле ввода sms
inpAi.addEventListener("input", () => {
    inpAi.style.height = `${inpAi.scrollHeight}px`
    if (inpAi.value === "") {
        inpAi.style.height = "35px"
    }
})

// Отркрыть чат
function aiOpen(item) {
    homeNav.scroll(0, 0)
    homeNav.style.overflowY = 'hidden'
    aiCont.scroll(0, 0)
    aiCont.style.display = "flex"

    aifriendName.innerHTML = `${item.firstName} ${item.lastName}`
    aiLastSeen.innerHTML = 'last seen recently'
    aiImg.src = item.faceUrl
}


recentlyBtn.onclick = () => {
    listRecently()
}



