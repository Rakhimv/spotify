const doc = document
const url_liked = `https://wepro-cca85-default-rtdb.firebaseio.com/`; // RealTime DataBase

let isRepeat = false
let isRandom = false
// Функция создать плейлист
function createPlaylist(img, container, title, descrip, arr, index) {

    let elemItem = document.createElement("div")
    let elemImg = doc.createElement("img")
    let elemDiv = doc.createElement("div")
    let elemP = doc.createElement("p")
    let elemSpan = doc.createElement("span")

    elemItem.classList.add("elem_item")
    elemImg.style.backgroundColor = `#${Math.random().toString(16).slice(2, 8)}`
    elemImg.src = img
    elemP.innerHTML = title
    elemSpan.innerHTML = descrip

    container.appendChild(elemItem)
    elemItem.appendChild(elemImg)
    elemItem.insertAdjacentElement("beforeend", elemDiv)
    elemDiv.appendChild(elemP)
    elemDiv.appendChild(elemSpan)

    let runPlaylist = doc.createElement("div")
    runPlaylist.classList.add("runPlaylist")
    runPlaylist.innerHTML = `<img src="./icons/playmus.svg">`
    elemItem.appendChild(runPlaylist)

    if (!Array.isArray(arr)) {
        runPlaylist.remove()
    }

    runPlaylist.addEventListener("click", async function () {
        if (auth.auth === false) {
            alert('Please Sign Up 🎵')
        } else {
            let runPlaylists = doc.getElementsByClassName("runPlaylist");
            for (let item of runPlaylists) {
                if (item !== runPlaylist || item !== runPlaylist && item.classList.contains("playing")) {
                    item.classList.remove("playing");
                    msout(item);
                    item.firstElementChild.src = "./icons/playmus.svg";
                } else if (!runPlaylist.classList.contains("playing")) {
                    runPlaylist.classList.add("playing");
                    if (descrip === 'Artist') {
                        let dta
                        if (!Array.isArray(arr)) {
                            dta = await tracksArtist(arr[index].id)
                        } else {
                            dta = await tracksArtist(arr[index].id)
                        }
                        nowPlaying(dta, 0);
                    } else {
                        let dta = await tracksPlaylist(arr[index].id);
                        let tracks = await dta.items.map((item) => item.track);
                        nowPlaying(tracks, 0);
                    }

                    play_pause.click();
                    setInterval(() => {
                        if (nowAudio.paused) {
                            runPlaylist.firstElementChild.src = "./icons/playmus.svg";
                        } else if (runPlaylist.classList.contains("playing")) {
                            runPlaylist.firstElementChild.src = "./icons/nowing.svg";
                        }
                    }, 10);
                } else if (runPlaylist.classList.contains('playing')) {
                    play_pause.click();
                }
            }
        }
    });

    // Если альбом то убираем кнопка плей
    if (descrip === "Album" || descrip.includes("•")) {
        runPlaylist.remove()
    }

    // Появление кнопки при наведении
    elemItem.addEventListener("mouseover", function () {
        runPlaylist.style.opacity = 1
        runPlaylist.style.top = 108 + "px"
    })

    // Убираем кнопки при наведении
    elemItem.addEventListener("mouseout", function () {
        msout(runPlaylist)
    })

    // Функция наведения
    function msout(runPlaylist) {
        if (!runPlaylist.classList.contains("playing")) {
            runPlaylist.style.opacity = 0
            runPlaylist.style.top = 120 + "px"
        }
    }

    // Если это Atist то скругляем границу
    if (descrip === "Artist") {
        elemImg.classList.add("artistImg")
    }

    // Клик на элемента
    elemItem.addEventListener("click", (e) => {
        if (auth.auth === false) {
            prewAuth(img)
        } else {
            if (e.target !== runPlaylist && e.target !== runPlaylist.firstElementChild) {
                basic.innerHTML = search
                if (descrip === "Artist") {
                    basic.innerHTML = search
                    listArtist(arr, img, title, descrip, index)
                } else if (descrip === "Album" || descrip.includes("•")) {
                    basic.innerHTML = search
                    listAlbum(arr, img, title, descrip, index)
                } else {
                    basic.innerHTML = search
                    listPlaylist(arr, img, title, descrip, index)
                }
                backar.status = true
            }
        }
    })
}


// Шаблон home
let home = `<div class="basic">
<div class="my_category">
    <div class="liked_cat">
        <span class="bgc1">
            <img src="icons/Line=fill, Name=like.svg" alt="">
        </span>
        <p>Liked Songs</p>
    </div>
    <div class="recently_cat">
        <span class="bgc2">
            <img src="icons/Line=fill, Name=music.svg" alt="">
        </span>
        <p>Recently Played</p>
    </div>
    <div class="friends_cat">
        <span class="bgc3">
            <img src="icons/Line=fill, Name=friends.svg" alt="">
        </span>
        <p>Friends Played</p>
    </div>
</div>

<div class="cont_playlist"><div class="loader">
<div class="dot"></div>
<div class="dot"></div>
<div class="dot"></div>
</div></div>`


// Шаблон поиска
let search = `<div class="cont_playlist">
    <div class="loader">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
</div></div>`


// Категории из страницы поиска
function createBrowse(itemIMG, cont, itemNAME, itemBGC, input) {
    let elemSan = document.createElement("div")
    let elemBgc = doc.createElement("img")
    let elemTitle = doc.createElement("p")

    elemSan.classList.add('browse_item')
    elemSan.style.backgroundColor = itemBGC
    elemBgc.src = itemIMG
    elemTitle.innerHTML = itemNAME
    elemSan.style.height = `${elemSan.clientWidth}px`

    cont.appendChild(elemSan)
    elemSan.appendChild(elemTitle)
    elemSan.appendChild(elemBgc)

    elemSan.onclick = () => {
        basic.innerHTML = search
        input.value = itemNAME
        loadData(itemNAME, searchInner)
        document.querySelector(".home_Nav").scroll(0, 0)
    }
}

// Функция создать категории поиска
function browse(arr, inp) {
    basic.innerHTML = ""
    let seeCont = doc.createElement("div")
    seeCont.classList.add("search_container")
    basic.appendChild(seeCont)
    let h1 = doc.createElement("h1")
    h1.innerHTML = `Browse All`
    basic.insertAdjacentElement("afterbegin", h1)
    for (let item of arr.items) {
        item = item.data.data.cardRepresentation
        let itemIMG = item.artwork.sources[0].url
        let itemNAME = item.title.transformedLabel
        let itemBGC = item.backgroundColor.hex
        createBrowse(itemIMG, seeCont, itemNAME, itemBGC, inp)
    }
}


// Если пользователь не зареган то выскакивает модалка
function pleaseAuth(item) {
    let cat = item.innerHTML.split("<p>")[1].split("</p>")[0]
    let authFal = doc.querySelector(".navAuth")
    let authFal_span = doc.querySelector(".cates")
    let authFal_span2 = doc.querySelector(".cates2")
    let currentButton = null;
    authFal.style.display = "block"
    currentButton = item;
    let abtfdd = document.querySelector(".navAuth a")
    abtfdd.addEventListener("click", function () {
        authFal.style.display = "none";
        currentButton = null;
    })

    authFal_span.innerHTML = `Enjoy Your ${cat}`
    authFal_span2.innerHTML = cat
    authFal.style.top = (item.offsetTop - 20) + "px"
    authFal.style.left = (item.clientWidth + 20) + "px"

    // Если клик был вне блока и кнопки, то скрываем блок
    document.addEventListener("click", function (event) {
        var target = event.target;
        if (target != authFal && currentButton && !currentButton.contains(target)) {
            authFal.style.display = "none";
            currentButton = null;
        }
    });
}


// Если пользователь не зареган то выскакивает модалка картинки
function prewAuth(imeg) {
    let prewievCont = document.querySelector(".prewievCont")
    let razmit = document.querySelector(".razmit")
    let prewievElem = document.querySelector(".prewievElem")
    let prewievElem_img = document.querySelector(".prewievElem img")

    let close = document.querySelector(".close")
    prewievCont.style.display = "block"
    razmit.style.backgroundImage = `url("${imeg}")`
    prewievElem_img.src = imeg
    prewievCont.addEventListener("click", () => {
        if (event.target === prewievCont) {
            prewievCont.style.display = "none";
        }
    });

    close.onclick = () => {
        prewievCont.style.display = "none";
    }
}


// Если пользователь не зареган то выскакивает картинку категория
function category(set, num) {
    let prewievCont = document.querySelector(".prewievCont")
    let razmit = document.querySelector(".razmit")
    let prewievElem_img = document.querySelector(".prewievElem img")
    razmit.style.backgroundImage = "none"
    let close = document.querySelector(".close")
    prewievCont.style.display = "block"
    prewievElem_img.src = set
    prewievElem_img.style.border = "none"

    razmit.classList.remove(`bgc1`)
    razmit.classList.remove(`bgc2`)
    razmit.classList.remove(`bgc3`)

    razmit.style.backgroundImage = ""
    razmit.classList.add(`bgc${num}`)
    prewievCont.addEventListener("click", () => {
        if (event.target === prewievCont) {
            prewievCont.style.display = "none";
        }
    });
    close.onclick = () => {
        prewievCont.style.display = "none";
    }
}


// Поиск главная страница
async function searchInner(arr) {
    let playlist = arr.playlists
    let albums = arr.albums
    let artists = arr.artists
    let tracks = arr.tracks

    let parTop = doc.createElement("div")
    parTop.classList.add("parTop")

    let topResult = doc.createElement("div")
    topResult.classList.add("topResult")


    // Топовая песня
    topResult.innerHTML = `
        <div class="topResult_tit">
        <p>Top result</p></div>
        <div class="topResultCont">
        <img src="${tracks.items[0].album.images[1].url}">
        <p>${tracks.items[0].name}</p>
        <div><span>By ${tracks.items[0].artists[0].name}</span>
        <div class="typeTop">Songs</div></div></div>
    `

    // Первые топовые 4 песни

    // Длительность первых топовых 4 песен
    let s41 = duration(tracks.items[0].duration_ms);
    let s42 = duration(tracks.items[1].duration_ms);
    let s43 = duration(tracks.items[2].duration_ms);
    let s44 = duration(tracks.items[3].duration_ms);

    // Контейнер 4 песни
    let song4 = doc.createElement("div")
    song4.classList.add("song4")

    let topResultTit = document.createElement('div');
    topResultTit.classList.add('topResult_tit');

    let p = document.createElement('p');
    p.textContent = 'Songs';
    topResultTit.appendChild(p);

    let song4Cont = document.createElement('div');
    song4Cont.classList.add('song4_cont');
    let items = await likedSongsList()
    basic.innerHTML = ""
    basic.appendChild(parTop)


    for (let i = 0; i < 4; i++) {
        let song4Item = document.createElement('div');
        song4Item.classList.add('song4_item');
        let s4Left = document.createElement('div');
        s4Left.classList.add('s4_left');
        let img = document.createElement('img');
        img.setAttribute('src', tracks.items[i].album.images[1].url);
        let s4Info = document.createElement('div');
        s4Info.classList.add('s4_info');
        let songName = document.createElement('p');
        songName.classList.add("sgname4")
        songName.innerHTML = tracks.items[i].name;
        let artistName = document.createElement('span');
        artistName.textContent = tracks.items[i].artists[0].name;

        s4Info.appendChild(songName);
        s4Info.appendChild(artistName);
        s4Left.appendChild(img);
        s4Left.appendChild(s4Info);

        let duration = document.createElement('div');
        duration.classList.add('duration');
        duration.textContent = eval('s4' + (i + 1));

        song4Item.onclick = (e) => {
            if (auth.auth !== false) {
                if (e.target !== lkbtn) {
                    nowPlaying(tracks.items, i)
                    changeBackground_song4(i)
                    topResultCont.classList.remove("playing")
                    runPlaylist.firstElementChild.src = './icons/playmus.svg'
                    tprout()
                }
            } else {
                prewAuth(tracks.items[i].album.images[0].url)
            }
        }

        let lkbtn = document.createElement("img");
        lkbtn.classList.add("lkbtn");
        lkbtn.src = './icons/Line=empty, Name=like.svg';
        lkbtn.style.right = "17%"


        // Кнопка лайка
        if (auth.auth !== false) {
            lkbtn.onclick = () => {
                if (lkbtn.src.includes("imlike")) {
                    lkbtn.src = './icons/Line=empty, Name=like.svg';
                    axios.delete(url_liked + `likedSongs/${tracks.items[i].id}.json`)
                    song4Item.onmouseout = () => {
                        lkbtn.style.opacity = 0
                    }
                } else {
                    lkbtn.src = './icons/imlike.svg'
                    added_at(tracks.items[i])
                    axios.post(url_liked + `likedSongs/${tracks.items[i].id}.json`, tracks.items[i], options)
                    song4Item.onmouseout = () => {
                        lkbtn.style.opacity = 1
                    }
                }
            }
        }


        song4Item.onmouseout = () => {
            lkbtn.style.opacity = 0
        }

        song4Item.onmouseover = () => {
            lkbtn.style.opacity = 1
        }

        song4Item.appendChild(s4Left);
        song4Item.appendChild(lkbtn);
        song4Item.appendChild(duration);
        song4Cont.appendChild(song4Item);

        // Проверяем статус лайка
        ifliked_arr(tracks.items[i], lkbtn, song4Item, items)
    }

    song4.appendChild(topResultTit);
    song4.appendChild(song4Cont);
    parTop.appendChild(topResult)
    topResult.insertAdjacentElement("afterend", song4)

    // Нижние контейнеры
    let contArtists = doc.createElement("div")
    contArtists.classList.add("contArtists")
    song4.insertAdjacentElement("afterend", contArtists)

    let contAlbums = doc.createElement("div")
    contAlbums.classList.add("contAlbums")
    contArtists.insertAdjacentElement("beforebegin", contAlbums)

    let artisty = doc.createElement("div");
    artisty.classList.add("artistsCont")
    let resLen = Math.floor(parTop.clientWidth / 170)

    for (let item of artists.items.slice(0, resLen + 3)) {
        let itemIndex = arr[item]
        if (item.images && item.images[0]) {
            createPlaylist(item.images[0].url, artisty, item.name, 'Artist', arr, itemIndex)
        }
    }

    contArtists.innerHTML = `
      <div class="topResult_tit">
        <p>Artists</p>
      </div>
     ${artisty.outerHTML}
    `;


    let albumses = doc.createElement("div");
    albumses.classList.add("albumsCont")

    for (let item of albums.items.slice(0, resLen + 3)) {
        let itemIndex = albums.items.indexOf(item)
        if (item.images && item.images[0]) {
            createPlaylist(item.images[0].url, albumses, item.name, `${item.release_date.substr(0, 4)}  •  ${item.artists[0].name}`, arr, itemIndex)
        }
    }

    album_artist()
    contAlbums.innerHTML = `
      <div class="topResult_tit">
        <p>Albums</p>
      </div>
     ${albumses.outerHTML}
    `;


    let runPlaylist = doc.createElement("div")
    runPlaylist.classList.add("runPlaylist")
    runPlaylist.innerHTML = `<img src="./icons/playmus.svg">`


    let topResultCont = doc.querySelector(".topResultCont")
    topResultCont.appendChild(runPlaylist)
    topResultCont.addEventListener("mouseover", function () {
        runPlaylist.style.opacity = 1
        runPlaylist.style.top = 222 + "px"
    })

    topResultCont.addEventListener("mouseout", function () {
        tprout()
    })

    function tprout() {
        if (!topResultCont.classList.contains('playing')) {
            runPlaylist.style.opacity = 0
            runPlaylist.style.top = 200 + "px"
        }
    }

    topResultCont.onclick = () => {
        if (auth.auth === false) {
            prewAuth(topResultCont.firstElementChild.src)
        } else {
            nowPlaying(tracks.items, 0)
            changeBackground_song4(0)
            if (!topResultCont.classList.contains('playing')) {
                topResultCont.classList.add("playing")
                runPlaylist.innerHTML = `<img src="./icons/nowing.svg">`
            } else {
                play_pause.click()
            }
            setInterval(() => {
                if (nowAudio.paused || nowName.innerHTML !== tracks.items[0].name) {
                    runPlaylist.firstElementChild.src = './icons/playmus.svg'
                } else runPlaylist.firstElementChild.src = "./icons/nowing.svg"
            }, 100);
        }
    }

    if (doc.querySelector(".parTop")) {
        backarr.onclick = () => {
            itemMenuBtn[1].click()
        }
    }
}


// Функция длительность песни
function duration(ms) {
    let duration = ms;
    const seconds = Math.round(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Функция переобразовать номера в дату
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    };
    return date.toLocaleDateString('en-EN', options).replace(/(\d+)\s(\S+)\s(\d+)/, '$1 $2. $3');
}

// Текущий плейлисты
let playlistNow = []


// Окно поиск песен
async function searchSongs(arr) {
    let items = await likedSongsList()
    playlistNow = arr.tracks.items
    let tracks = arr.tracks.items
    let numMuz = 0
    let songs = doc.createElement("div")
    songs.classList.add("songsSearch")
    basic.innerHTML = ""
    basic.appendChild(songs)
    tekushiy()
    for (let item of tracks) {
        let index = tracks.indexOf(item);
        let songItem = doc.createElement("div")
        songItem.classList.add('songItem')

        let songLen = doc.createElement("div")
        songLen.classList.add('songLen')
        songLen.innerHTML = `<span>${numMuz = numMuz + 1}</span>`

        let songCont = doc.createElement("div")
        songCont.classList.add('songCont')
        songCont.innerHTML = `
            <img src="${item.album.images[0].url}">
            <div>
                <p class="sgname">${item.name}</p>
                <span>${item.artists[0].name}</span>
            </div>
        `

        let songAlbum = doc.createElement("div")
        songAlbum.classList.add('songAlbum')
        songAlbum.innerHTML = item.album.name
        let drms = duration(item.duration_ms)
        let lkbtn = document.createElement("img");
        lkbtn.classList.add("lkbtn");
        lkbtn.src = './icons/Line=empty, Name=like.svg';
        lkbtn.style.right = "13%"

        lkbtn.onclick = () => {
            if (auth.auth === false) {
                prewAuth(item.album.images[0].url)
            } else {
                if (lkbtn.src.includes("imlike")) {
                    lkbtn.src = './icons/Line=empty, Name=like.svg';
                    axios.delete(url_liked + `likedSongs/${item.id}.json`)
                    songItem.onmouseout = () => {
                        lkbtn.style.opacity = 0
                    }
                } else {
                    lkbtn.src = './icons/imlike.svg'
                    added_at(item)
                    axios.post(url_liked + `likedSongs/${item.id}.json`, item, options)
                    songItem.onmouseout = () => {
                        lkbtn.style.opacity = 1
                    }
                }
            }
        }

        songItem.onmouseout = () => {
            lkbtn.style.opacity = 0
        }

        songItem.onmouseover = () => {
            lkbtn.style.opacity = 1
        }

        let durationItem = doc.createElement("div")
        durationItem.classList.add('duration')
        durationItem.innerHTML = `${drms}`


        songItem.onclick = (e) => {
            if (auth.auth === false) {
                prewAuth(item.album.images[0].url)
            } else {
                if (e.target !== lkbtn) {
                    nowPlaying(playlistNow, index)
                }
            }
        }

        songs.appendChild(songItem)
        songItem.appendChild(songLen)
        songItem.appendChild(songCont)
        songItem.appendChild(songAlbum)
        songItem.appendChild(lkbtn)
        songItem.appendChild(durationItem)

        // Проверяем статус лайка
        ifliked_arr(item, lkbtn, songItem, items)
    }
}

// Поиск альбомов
function searchAlbum(arr) {
    let album = arr.albums.items
    let albumCont = doc.createElement('div')
    albumCont.classList.add("albumCont")

    basic.innerHTML = ''
    basic.appendChild(albumCont)

    for (let item of album) {
        let typeimg = item.images[0].url
        let typename = item.name
        let typdescrip = 'Album'
        let i = album.indexOf(item)
        createPlaylist(typeimg, albumCont, typename, typdescrip, album, i)
    }
}

// Поиск артистов
function searchArtist(arr) {
    let artist = arr.artists.items
    let artistCont = doc.createElement('div')
    artistCont.classList.add("artistCont")

    basic.innerHTML = ''
    basic.appendChild(artistCont)

    for (let item of artist) {
        let typeimg = item.images[0].url
        let typename = item.name
        let typdescrip = 'Artist'
        let i = artist.indexOf(item)
        createPlaylist(typeimg, artistCont, typename, typdescrip, artist, i)
    }
}

// Поиск плейлистов
function searchPlaylist(arr) {
    let playlist = arr.playlists.items
    let playlistCont = doc.createElement('div')
    playlistCont.classList.add("playlistCont")
    basic.innerHTML = ''
    basic.appendChild(playlistCont)
    for (let item of playlist) {
        let typeimg = item.images[0].url
        let typename = item.name
        let typdescrip = item.description
        let itemIndex = playlist.indexOf(item)
        createPlaylist(typeimg, playlistCont, typename, typdescrip, playlist, itemIndex)
    }
}

// Нижние контейнеры
async function album_artist() {
    if (doc && doc.querySelector(".albumsCont")) {
        let albumsCont_item = doc.querySelector(".albumsCont").children
        let artistsCont_item = doc.querySelector(".artistsCont").children

        for (let i = 0; i < albumsCont_item.length; i++) {
            const element = albumsCont_item[i];
            element.onclick = () => {
                if (auth.auth === false) {
                    prewAuth(element.firstChild.src)
                } else {
                    sets[2].click()
                }
            }
        }
        for (let i = 0; i < artistsCont_item.length; i++) {
            const element = artistsCont_item[i];
            element.onclick = () => {
                if (auth.auth === false) {
                    prewAuth(element.firstChild.src)
                } else {
                    sets[3].click()
                }
            }
        }
    } else {
        setTimeout(() => {
            album_artist()
        }, 2000);
    }
}

// Профиль
function profile(img, name, cont, elem) {
    if (img !== "") {
        elem.src = img
    }
    let MyName = doc.createElement("p")
    MyName.innerHTML = name
    cont.appendChild(MyName)
}


// Элементы плейлиста
let nowAudio = document.getElementById("nowAudio");
let nowImg = document.getElementById("control_img");
let nowName = document.querySelector(".control_names p");
let nowArtist = document.querySelector(".control_names span");
let plStatus = document.querySelector(".play_pause img");
let backMuz = document.querySelector(".back_muz")
let nextMuz = document.querySelector(".next_muz")
let title = doc.getElementById("title")
let basket = []


// Если песня нулевая ищем первую песню из 20 у которого есть prewiew_url
async function nullSearch(tname, tartis, gifka) {
    let nullResult = await fetch(`https://api.spotify.com/v1/search?q=${tname + tartis}*&type=track&limit=20`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
    const res = await nullResult.json();
    const track = res.tracks.items.find((item) => item.preview_url !== null);
    return track.preview_url;
}

// Текущая песня
let nowSongItem

// Плеер
async function nowPlaying(songs, index, src) {

    // Кнопка назад
    backMuz.onclick = () => {
        if (index > 0) {
            nowPlaying(songs, index - 1, src)
            if (lyricsCont.style.display === "flex") {
                lyricsOpen()
            }
        }
    }

    // Кнопка вперед
    nextMuz.onclick = () => {
        if (index < songs.length) {
            nowPlaying(songs, index + 1, src)
            if (lyricsCont.style.display === "flex") {
                lyricsOpen()
            }
        }
    }

    // Если это альбом то ставим картиинку альбома а не песни 
    if (songs[index].album) {
        songs[index].album.available_markets = undefined;
    }

    // Удаляем маркет песни что бы отправить его на сервер
    songs[index].available_markets = undefined
    nowSongItem = songs[index]
    nowSongItem.ind = index
    let item = songs[index];

    // Задаем стили для текущей песни
    if (document.getElementsByClassName("sgname4").length) {
        changeBackground_song4(index)
    }


    // Если при нажатии играет таже песня нечего не делаем
    if (nowAudio.src !== item.preview_url) {
        addLikedBnt.src = './icons/Line=empty, Name=like.svg';
        if (document && document.getElementsByClassName("songLen").length && document.getElementsByClassName("sgname").length) {
            changeBackground(index);
        }
        plStatus.src = 'icons/Play.svg';
        nowAudio.src = item.preview_url;
        if (src) {
            nowImg.src = src
            addLikedBnt.style.display = "none"
        } else {
            nowImg.src = item.album.images[0].url;
            addLikedBnt.style.display = "block"
        }
        nowName.innerHTML = item.name;
        nowArtist.innerHTML = item.artists[0].name;
        if (item.preview_url === null || item.preview_url === undefined) {
            nowAudio.src = await nullSearch(item.name, item.artists[0].name);
            item.preview_url = await nullSearch(item.name, item.artists[0].name);
        }
        if (nowAudio.paused) {
            nowAudio.addEventListener('loadedmetadata', () => {
                nowAudio.play();
            });
        }
        plStatus.src = 'icons/Pause.svg';
        downloadMuz.src = "icons/downloads.svg"
        ifliked_item(songs, index)

    }

    // Если песня заканчивается
    nowAudio.onended = () => {
        // Повтор включен
        if (isRepeat === true) {
            nowAudio.currentTime = 0;
            nowAudio.play();
        } else if (isRandom === true && isRepeat === false) { // Рандом
            let randomizer = Math.floor(Math.random() * songs.length);
            nowPlaying(songs, randomizer, src);
        } else if (isRandom === false && isRepeat === false) { // Если нечего не включено то продолжаем
            index = (index + 1) % songs.length;
            nowPlaying(songs, index, src);
        }
        if (lyricsCont.style.display === "flex") {
            lyricsOpen()
        }
    }
    title.innerHTML = `Spotify - ${item.name}`


    added_atr(nowSongItem)
    axios.get(`${url_liked}recently.json`)
        .then((response) => {
            if (response.data !== null) {
                let data = Object.values(response.data)
                let pois = data.find((item) => item.id === nowSongItem.id)
                if (pois === undefined) {
                    axios.post(`${url_liked}recently.json`, nowSongItem, options)
                }
            } else if (response.data === null || response.data === undefined) {
                axios.post(`${url_liked}recently.json`, nowSongItem, options)
            }
        })
    checkList()
}


// Проверять статус массива если он больше 50
function checkList() {
    axios.get(`${url_liked}recently.json`)
        .then((response) => {
            if (response.data !== null) {
                let data = Object.values(response.data)
                console.log(data);
                if (data.length > 49) {
                    let ind = Object.keys(response.data)[0]
                    console.log(ind);
                    axios.delete(`${url_liked}recently/${ind}.json`)
                }
            }
        })
}


// Стандартные функции 
function clearFace() {
    homeNav.scroll(0, 0)
    setCont.style.display = "none"
    basic.innerHTML = ""
    contINP.style.display = "none"
    backar.status = true
    tekushiy()
}

function tekushiy() {
    if (nowSongItem) {
        setTimeout(() => {
            console.log(nowSongItem.ind);
            changeBackground(nowSongItem.ind)
        }, 500);
    }
}

async function listPlaylist(arr, src, title, des, index) {
    clearFace()

    let dta
    if (!Array.isArray(arr)) {
        dta = await tracksPlaylist(arr)
    } else {
        dta = await tracksPlaylist(arr[index].id)
    }

    plhname = title.split(" ").slice(0, 3).join(" ")
    let tracks = await dta.items.map(item => item.track);
    let addets = await dta.items.map(item => item.added_at);

    // Если не удалось загрузить плейлист
    if (dta.items[0].track === null) {
        alert(`Не удалось загрузить данные о ${title}`)
        itemMenuBtn[0].click()
    }

    // Собираем в одну кучу миллисекунды что бы узнать примернове время всех песен
    let millisecond = 0
    for (let item of tracks) {
        millisecond = millisecond + await item.duration_ms
    }

    let playlistTracks = doc.createElement("div")
    playlistTracks.classList.add('home_Cont')
    let top_Cont = doc.createElement("div")
    top_Cont.classList.add('top_Cont')
    let muz_Cont = doc.createElement("div")
    muz_Cont.classList.add('muz_Cont')


    top_Cont.innerHTML = `
    <div class="top_Cont-info">
    <div class="top_Cont-info_img">
    <img src="${src}">
    </div>
    <div class="top_Cont-bottom">
    <span class="top_Cont-info-type">PLAYLIST</span>
    <p>${title}</p>
    <span class="top_Cont-info-info">
    The hits of tomorrow are on Spotify today.
    <br>Made for <span>${des.split(" ").slice(0, 4).join(" ") + "..."}</span> • 
    ${tracks.length} songs, ${milliseconds(millisecond)}<span>
    </div></div>
    `

    let muzSettings = document.createElement('div');
    muzSettings.classList.add('muzSettings');
    muz_Cont.appendChild(muzSettings);

    let left = document.createElement('div');
    left.classList.add('left');
    muzSettings.appendChild(left);

    let goPlaylist = document.createElement('div');
    goPlaylist.classList.add('goPlaylist');
    left.appendChild(goPlaylist);

    let goPlaylistImg = document.createElement('img');
    goPlaylistImg.src = './icons/playmus.svg';
    goPlaylist.appendChild(goPlaylistImg);

    let sets3 = document.createElement('div');
    sets3.classList.add('sets3');
    left.appendChild(sets3);

    let likeImg = document.createElement('img');
    likeImg.src = './icons/Line=empty, Name=like.svg';
    sets3.appendChild(likeImg);
    if (!Array.isArray(arr)) {
        likeImg.src = './icons/imlike.svg'
    }

    goPlaylist.onclick = () => {
        nowPlaying(tracks, 0)
        play_pause.click()
        setInterval(() => {
            if (nowAudio.paused) {
                goPlaylistImg.src = './icons/playmus.svg'
            } else goPlaylistImg.src = "./icons/nowing.svg"
        }, 100);
    }

    // Лайк
    likeImg.onclick = () => {
        if (!Array.isArray(arr)) {
            if (!likeImg.src.includes('imlike')) {
                likeImg.src = './icons/imlike.svg'

                let data = {
                    arr: arr,
                    src: src,
                    title: title,
                    des: des,
                    index: index
                }

                axios.post(`${url_liked}library/${arr}.json`, data, options)
            } else {
                likeImg.src = './icons/Line=empty, Name=like.svg';
                axios.delete(`${url_liked}library/${arr}.json`)
            }
        } else {
            if (!likeImg.src.includes('imlike')) {
                likeImg.src = './icons/imlike.svg'

                let data = {
                    arr: arr[index].id,
                    src: src,
                    title: title,
                    des: des,
                    index: index
                }

                axios.post(`${url_liked}library/${arr[index].id}.json`, data, options)
            } else {
                likeImg.src = './icons/Line=empty, Name=like.svg';
                axios.delete(`${url_liked}library/${arr[index].id}.json`)
            }
        }
    }


    let dotsImg = document.createElement('img');
    dotsImg.src = './icons/Line=empty, Name=dots.svg';
    sets3.appendChild(dotsImg);
    let playInp = document.createElement('div');
    playInp.classList.add('playInp');
    muzSettings.appendChild(playInp);
    let searchIcon = document.createElement('i');
    searchIcon.classList.add('bx', 'bx-search');
    playInp.appendChild(searchIcon);
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Artists, songs, or podcasts';
    playInp.appendChild(input);
    let muzItems = doc.createElement("div")
    muzItems.classList.add("muzItems")
    let itemMuz = doc.createElement("div")
    itemMuz.classList.add('itemMuz')
    let items = await likedSongsList()


    // Input поиск
    crtItem(tracks);
    input.addEventListener("input", function () {
        const searchText = input.value.toLowerCase();
        const filteredTracks = tracks.filter(track =>
            track.name.toLowerCase().includes(searchText) ||
            track.artists[0].name.toLowerCase().includes(searchText) ||
            track.album.name.toLowerCase().includes(searchText)
        );
        itemMuz.innerHTML = "";
        crtItem(filteredTracks);
    });

    // Фильтр поиск
    function crtItem(filtArr) {
        for (let item of filtArr) {
            tekushiy()
            item.added_at = addets[tracks.indexOf(item)]

            let itemMuzCont = document.createElement("div");
            itemMuzCont.classList.add("itemMuz-cont");

            let songLen = document.createElement("div");
            songLen.classList.add("songLen");
            songLen.innerHTML = `<span>${tracks.indexOf(item)+1}</span>`;

            let songItemPlay = document.createElement("div");
            songItemPlay.classList.add("songItem_play");

            let songCont = document.createElement("div");
            songCont.classList.add("songCont");

            let songImage = document.createElement("img");
            songImage.src = item.album.images[2].url;

            let songDetails = document.createElement("div");

            let songName = document.createElement("p");
            songName.classList.add("sgname")
            songName.innerHTML = item.name;

            let songArtist = document.createElement("span");
            songArtist.innerHTML = item.artists[0].name;

            songDetails.append(songName, songArtist);
            songCont.append(songImage, songDetails);

            let songAlbum = document.createElement("div");
            songAlbum.classList.add("songAlbum");
            songAlbum.innerHTML = item.album.name;

            let addedBy = document.createElement("div");
            addedBy.classList.add("addedBy");
            addedBy.innerHTML = formatDate(item.added_at);

            let durationMuz = document.createElement("div");
            durationMuz.classList.add("duration");
            durationMuz.innerHTML = `${duration(item.duration_ms)}`;

            itemMuzCont.onclick = (e) => {
                if (e.target !== lkbtn) {
                    let i = filtArr.indexOf(item);
                    nowPlaying(filtArr, i);
                }
            };




            itemMuzCont.oncontextmenu = (e) => {
                e.preventDefault()
                if (nbm1 !== null && nbm2 !== null) {
                    let conf = confirm(`Добавить песню ${item.name} в свой плейлист?`)
                    if (conf === true) {
                        axios.post(`${url_liked}janres/-NQsqWEQgtB6wjjsIdBd/${nbm1}/janres/${nbm2}/tracki/${item.id}.json`, item, options)
                    }
                }
            }


            let lkbtn = document.createElement("img");
            lkbtn.classList.add("lkbtn");
            lkbtn.src = './icons/Line=empty, Name=like.svg';
            lkbtn.style.right = "10%"

            lkbtn.onclick = () => {
                if (lkbtn.src.includes("imlike")) {
                    lkbtn.src = './icons/Line=empty, Name=like.svg';
                    axios.delete(url_liked + `likedSongs/${item.id}.json`)
                    itemMuzCont.onmouseout = () => {
                        lkbtn.style.opacity = 0
                    }
                } else {
                    lkbtn.src = './icons/imlike.svg'
                    added_at(item)
                    axios.post(url_liked + `likedSongs/${item.id}.json`, item, options)
                    itemMuzCont.onmouseout = () => {
                        lkbtn.style.opacity = 1
                    }
                }
            }
            itemMuzCont.onmouseout = () => {
                lkbtn.style.opacity = 0
            }

            itemMuzCont.onmouseover = () => {
                lkbtn.style.opacity = 1
            }
            songItemPlay.append(songCont, songAlbum, addedBy, lkbtn, durationMuz);
            itemMuzCont.append(songLen, songItemPlay);
            itemMuz.appendChild(itemMuzCont);

            ifliked_arr(item, lkbtn, itemMuzCont, items)
        }
    }


    let muzInfos = document.createElement('div');
    muzInfos.classList.add('muzInfos');
    muzInfos.innerHTML = `<div>
    <p>Title</p>
    <p>Album</p>
    <p>Date added</p>
    <p><i class="bx bx-time"></i></p>
    </div>`

    muzItems.appendChild(muzInfos)
    muzItems.appendChild(itemMuz)

    homeNav.addEventListener("scroll", function () {
        if (muzInfos.offsetTop > 426) {
            muzInfos.style.backgroundColor = "#181818"
            muzInfos.style.borderBottom = '0.5px solid #777777'
        } else {
            muzInfos.style.backgroundColor = "rgba(0, 0, 0, 0)"
            muzInfos.style.borderBottom = 'none'
        }
    })

    muz_Cont.appendChild(muzItems)
    playlistTracks.appendChild(top_Cont)
    playlistTracks.appendChild(muz_Cont)
    basic.appendChild(playlistTracks)

    RGBaster.colors(src, {
        exclude: ['rgb(255,255,255)', 'rgb(255, 255, 254)', 'rgb(0, 0, 0)', 'rgba(0, 0, 0, 0.4039215686)'],
        success: function (palette) {
            playlistTracks.style.background = palette.dominant;
            headerScrollColor = palette.dominant

            const rgb = palette.dominant.match(/\d+/g);
            const relativeLuminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
            const isDarkColor = relativeLuminance < 128;
            if (isDarkColor) {
                playlistHname.style.color = '#ffffff'; // белый цвет
            } else {
                playlistHname.style.color = '#000000'; // черный цвет
            }
        }
    });

    ifliked_list(arr, index, likeImg)
}

async function listArtist(arr, src, title, des, index) {
    clearFace()

    let dta
    if (!Array.isArray(arr)) {
        dta = await tracksArtist(arr)
    } else {
        dta = await tracksArtist(arr[index].id)
    }
    plhname = title.split(" ").slice(0, 3).join(" ")
    let tracks = dta

    let millisecond = 0
    for (let item of tracks) {
        millisecond = millisecond + await item.duration_ms
    }

    let items = await likedSongsList()

    let playlistTracks = doc.createElement("div")
    playlistTracks.classList.add('home_Cont')

    let top_Cont = doc.createElement("div")
    top_Cont.classList.add('top_Cont')
    top_Cont.classList.add('top_Cont-ar')

    let muz_Cont = doc.createElement("div")
    muz_Cont.classList.add('muz_Cont')

    top_Cont.innerHTML = `
    <div class="top_Cont-info top_Cont-info-ar">
    <div class="top_Cont-bottom"><div class="flexes">
    <img src="icons/verifed.png"><span class="top_Cont-info-type">Verified artist</span></div>
    <p class="pFlex">${title}<img src="icons/artist.svg"></p>
    <span class="top_Cont-info-info">Made for <span>
    ${des.split(" ").slice(0, 4).join(" ") + "..."}</span> • ${tracks.length} songs, ${milliseconds(millisecond)}<span>
    </div></div>

    <div class="grd"></div>
    `

    let muzSettings = document.createElement('div');
    muzSettings.classList.add('muzSettings');
    muz_Cont.appendChild(muzSettings);

    let left = document.createElement('div');
    left.classList.add('left');
    muzSettings.appendChild(left);

    let goPlaylist = document.createElement('div');
    goPlaylist.classList.add('goPlaylist');
    left.appendChild(goPlaylist);

    let goPlaylistImg = document.createElement('img');
    goPlaylistImg.src = './icons/playmus.svg';
    goPlaylist.appendChild(goPlaylistImg);

    let sets3 = document.createElement('div');
    sets3.classList.add('sets3');
    left.appendChild(sets3);

    let followArtist = document.createElement('div');
    followArtist.innerHTML = "follow"
    followArtist.classList.add("followArtist")


    if (!Array.isArray(arr)) {
        followArtist.innerHTML = 'following'
        followArtist.classList.add("following")
    } else {
        ifliked_artist(arr, index, followArtist)
    }
    followArtist.onclick = () => {
        if (!Array.isArray(arr)) {
            if (!followArtist.innerHTML.includes('following')) {
                followArtist.innerHTML = 'following'
                followArtist.classList.add("following")
                let data = {
                    arr: arr[index].id,
                    src: src,
                    title: title,
                    des: des,
                    index: index
                }

                axios.post(`${url_liked}library/${arr}.json`, data, options)
            } else {
                followArtist.classList.remove("following")
                followArtist.innerHTML = 'follow'
                axios.delete(`${url_liked}library/${arr}.json`)
            }
        } else {
            if (!followArtist.innerHTML.includes('following')) {
                followArtist.innerHTML = 'following'
                followArtist.classList.add("following")
                let data = {
                    arr: arr[index].id,
                    src: src,
                    title: title,
                    des: des,
                    index: index
                }

                axios.post(`${url_liked}library/${arr[index].id}.json`, data, options)
            } else {
                followArtist.innerHTML = 'follow'
                followArtist.classList.remove("following")
                axios.delete(`${url_liked}library/${arr[index].id}.json`)
            }
        }
    }

    sets3.appendChild(followArtist);

    goPlaylist.onclick = () => {
        nowPlaying(tracks, 0, src)
        play_pause.click()
        setInterval(() => {
            if (nowAudio.paused) {
                goPlaylistImg.src = './icons/playmus.svg'
            } else goPlaylistImg.src = "./icons/nowing.svg"
        }, 100);
    }

    let dotsImg = document.createElement('img');
    dotsImg.src = './icons/Line=empty, Name=dots.svg';
    sets3.appendChild(dotsImg);
    let playInp = document.createElement('div');
    playInp.classList.add('playInp');
    muzSettings.appendChild(playInp);
    let searchIcon = document.createElement('i');
    searchIcon.classList.add('bx', 'bx-search');
    playInp.appendChild(searchIcon);
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Artists, songs, or podcasts';
    playInp.appendChild(input);
    let muzItems = doc.createElement("div")
    muzItems.classList.add("muzItems")
    let itemMuz = doc.createElement("div")
    itemMuz.classList.add('itemMuz')
    itemMuz.classList.add("itemMuz-ar")

    crtItem(tracks);
    input.addEventListener("input", function () {
        const searchText = input.value.toLowerCase();
        const filteredTracks = tracks.filter(track =>
            track.name.toLowerCase().includes(searchText) ||
            track.artists[0].name.toLowerCase().includes(searchText) ||
            track.album.name.toLowerCase().includes(searchText)
        );
        itemMuz.innerHTML = "";
        crtItem(filteredTracks);
    });

    function crtItem(filtArr) {
        for (let item of filtArr) {
            tekushiy()
            let itemMuzCont = document.createElement("div");
            itemMuzCont.classList.add("itemMuz-cont");
            let songLen = document.createElement("div");
            songLen.classList.add("songLen");
            songLen.innerHTML = `<span>${tracks.indexOf(item)+1}</span>`;
            let songItemPlay = document.createElement("div");
            songItemPlay.classList.add("songItem_play");
            songItemPlay.classList.add("songItem_play-ar")
            let songCont = document.createElement("div");
            songCont.classList.add("songCont");
            let songImage = document.createElement("img");
            songImage.src = item.album.images[2].url;
            let songDetails = document.createElement("div");
            let songName = document.createElement("p");
            songName.classList.add("sgname")
            songName.innerHTML = item.name;
            songDetails.append(songName);
            songCont.append(songImage, songDetails);
            let songAlbum = document.createElement("div");
            songAlbum.classList.add("songAlbum");
            songAlbum.innerHTML = `popularity ${item.popularity}`;
            let durationMuz = document.createElement("div");
            durationMuz.classList.add("duration");
            durationMuz.innerHTML = `${duration(item.duration_ms)}`;

            itemMuzCont.onclick = (e) => {
                if (e.target !== lkbtn) {
                    let i = filtArr.indexOf(item);
                    nowPlaying(filtArr, i);
                }
            };

            let lkbtn = document.createElement("img");
            lkbtn.classList.add("lkbtn");
            lkbtn.src = './icons/Line=empty, Name=like.svg';
            lkbtn.style.right = "10%"

            lkbtn.onclick = () => {
                if (lkbtn.src.includes("imlike")) {
                    lkbtn.src = './icons/Line=empty, Name=like.svg';
                    axios.delete(url_liked + `likedSongs/${item.id}.json`)
                    itemMuzCont.onmouseout = () => {
                        lkbtn.style.opacity = 0
                    }
                } else {
                    lkbtn.src = './icons/imlike.svg'
                    added_at(item)
                    axios.post(url_liked + `likedSongs/${item.id}.json`, item, options)
                    itemMuzCont.onmouseout = () => {
                        lkbtn.style.opacity = 1
                    }
                }
            }

            itemMuzCont.onmouseout = () => {
                lkbtn.style.opacity = 0
            }

            itemMuzCont.onmouseover = () => {
                lkbtn.style.opacity = 1
            }


            songItemPlay.append(songCont, songAlbum, lkbtn, durationMuz);
            itemMuzCont.append(songLen, songItemPlay);
            itemMuz.appendChild(itemMuzCont);

            ifliked_arr(item, lkbtn, itemMuzCont, items)
        }
    }

    let popularityText = doc.createElement("p")
    popularityText.innerHTML = "Popular"
    popularityText.classList.add("popularityText")

    muzItems.append(popularityText, itemMuz)
    muz_Cont.appendChild(muzItems)
    playlistTracks.appendChild(top_Cont)
    playlistTracks.appendChild(muz_Cont)
    basic.appendChild(playlistTracks)
    playlistTracks.style.backgroundImage = `url("${src}")`;
    playlistTracks.classList.add("bgc-item-img")
    headerScrollColor = "#000"
    playlistHname.style.color = '#ffffff'; // белый цвет

}

async function listAlbum(arr, src, title, des, index) {
    clearFace()
    plhname = title.split(" ").slice(0, 3).join(" ")
    let dta
    if (!Array.isArray(arr)) {
        dta = await tracksAlbum(arr)
    } else {
        dta = await tracksAlbum(arr[index].id)
    }
    let tracks = dta


    let millisecond = 0
    for (let item of tracks) {
        millisecond = millisecond + await item.duration_ms
    }

    let playlistTracks = doc.createElement("div")
    playlistTracks.classList.add('home_Cont')

    let top_Cont = doc.createElement("div")
    top_Cont.classList.add('top_Cont')

    let muz_Cont = doc.createElement("div")
    muz_Cont.classList.add('muz_Cont')

    top_Cont.innerHTML = `
    <div class="top_Cont-info">
    <div class="top_Cont-info_img">
    <img src="${src}">
    </div>
    <div class="top_Cont-bottom">
    <span class="top_Cont-info-type">ALBUM</span>
    <p>${title}</p>
    <span class="top_Cont-info-info">The hits of tomorrow are on Spotify today.<br>Made for <span>${des.split(" ").slice(0, 4).join(" ") + "..."}</span> • ${tracks.length} songs, ${milliseconds(millisecond)}<span>
    </div></div>
    `



    let muzSettings = document.createElement('div');
    muzSettings.classList.add('muzSettings');
    muz_Cont.appendChild(muzSettings);
    let left = document.createElement('div');
    left.classList.add('left')
    muzSettings.appendChild(left);
    let goPlaylist = document.createElement('div');
    goPlaylist.classList.add('goPlaylist');
    left.appendChild(goPlaylist);
    let goPlaylistImg = document.createElement('img');
    goPlaylistImg.src = './icons/playmus.svg';
    goPlaylist.appendChild(goPlaylistImg);
    let sets3 = document.createElement('div');
    sets3.classList.add('sets3');
    left.appendChild(sets3);
    let likeImg = document.createElement('img');
    likeImg.src = './icons/Line=empty, Name=like.svg';
    sets3.appendChild(likeImg);

    goPlaylist.onclick = () => {
        nowPlaying(tracks, 0, src)
        play_pause.click()
        setInterval(() => {
            if (nowAudio.paused) {
                goPlaylistImg.src = './icons/playmus.svg'
            } else goPlaylistImg.src = "./icons/nowing.svg"
        }, 100);
    }

    if (!Array.isArray(arr)) {
        likeImg.src = './icons/imlike.svg'
    }

    likeImg.onclick = () => {
        if (!Array.isArray(arr)) {
            if (!likeImg.src.includes('imlike')) {
                likeImg.src = './icons/imlike.svg'

                let data = {
                    arr: arr[index].id,
                    src: src,
                    title: title,
                    des: des,
                    index: index
                }

                axios.post(`${url_liked}library/${arr}.json`, data, options)
            } else {
                likeImg.src = './icons/Line=empty, Name=like.svg';
                axios.delete(`${url_liked}library/${arr}.json`)
            }
        } else {
            if (!likeImg.src.includes('imlike')) {
                likeImg.src = './icons/imlike.svg'

                let data = {
                    arr: arr[index].id,
                    src: src,
                    title: title,
                    des: des,
                    index: index
                }

                axios.post(`${url_liked}library/${arr[index].id}.json`, data, options)
            } else {
                likeImg.src = './icons/Line=empty, Name=like.svg';
                axios.delete(`${url_liked}library/${arr[index].id}.json`)
            }
        }
    }

    let dotsImg = document.createElement('img');
    dotsImg.src = './icons/Line=empty, Name=dots.svg';
    sets3.appendChild(dotsImg);
    let playInp = document.createElement('div');
    playInp.classList.add('playInp');
    muzSettings.appendChild(playInp);
    let searchIcon = document.createElement('i');
    searchIcon.classList.add('bx', 'bx-search');
    playInp.appendChild(searchIcon);
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Artists, songs, or podcasts';
    playInp.appendChild(input);
    let muzItems = doc.createElement("div")
    muzItems.classList.add("muzItems")
    let itemMuz = doc.createElement("div")
    itemMuz.classList.add('itemMuz')
    itemMuz.classList.add("itemMuz-ab")
    crtItem(tracks);
    input.addEventListener("input", function () {
        const searchText = input.value.toLowerCase();
        const filteredTracks = tracks.filter(track =>
            track.name.toLowerCase().includes(searchText) ||
            track.artists[0].name.toLowerCase().includes(searchText)
        );
        itemMuz.innerHTML = "";
        crtItem(filteredTracks);
    });

    function crtItem(filtArr) {
        for (let item of filtArr) {
            tekushiy()
            let itemMuzCont = document.createElement("div");
            itemMuzCont.classList.add("itemMuz-cont");

            let songLen = document.createElement("div");
            songLen.classList.add("songLen");
            songLen.innerHTML = `<span>${tracks.indexOf(item)+1}</span>`;

            let songItemPlay = document.createElement("div");
            songItemPlay.classList.add("songItem_play");
            songItemPlay.classList.add("songItem_play-ab")

            let songCont = document.createElement("div");
            songCont.classList.add("songCont");

            let songDetails = document.createElement("div");

            let songName = document.createElement("p");
            songName.classList.add("sgname")
            songName.innerHTML = item.name;

            let songArtist = document.createElement("span");
            songArtist.innerHTML = item.artists[0].name;

            songDetails.append(songName, songArtist);
            songCont.append(songDetails);


            let addedBy = document.createElement("div");
            addedBy.classList.add("addedBy");
            addedBy.innerHTML = formatDate(item.added_at);

            let durationMuz = document.createElement("div");
            durationMuz.classList.add("duration");
            durationMuz.innerHTML = `${duration(item.duration_ms)}`;

            itemMuzCont.onclick = () => {
                let i = filtArr.indexOf(item);
                nowPlaying(filtArr, i, src);
            };

            songItemPlay.append(songCont, durationMuz);
            itemMuzCont.append(songLen, songItemPlay);
            itemMuz.appendChild(itemMuzCont);
        }
    }


    let muzInfos = document.createElement('div');
    muzInfos.classList.add('muzInfos');
    muzInfos.innerHTML = `<div class="infos-ab">
    <p>#</p>
    <p>Title</p>
    <p><i class="bx bx-time"></i></p>
    </div>`


    muzItems.appendChild(muzInfos)
    muzItems.appendChild(itemMuz)

    homeNav.addEventListener("scroll", function () {
        if (muzInfos.offsetTop > 426) {
            muzInfos.style.backgroundColor = "#181818"
            muzInfos.style.borderBottom = '0.5px solid #777777'
        } else {
            muzInfos.style.backgroundColor = "rgba(0, 0, 0, 0)"
            muzInfos.style.borderBottom = 'none'
        }
    })


    muz_Cont.appendChild(muzItems)
    playlistTracks.appendChild(top_Cont)
    playlistTracks.appendChild(muz_Cont)
    basic.appendChild(playlistTracks)


    RGBaster.colors(src, {
        exclude: ['rgb(255,255,255)', 'rgb(255, 255, 254)', 'rgb(0, 0, 0)', 'rgba(0, 0, 0, 0.4039215686)'],
        success: function (palette) {
            playlistTracks.style.background = palette.dominant;
            headerScrollColor = palette.dominant

            const rgb = palette.dominant.match(/\d+/g);
            const relativeLuminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
            const isDarkColor = relativeLuminance < 128;
            if (isDarkColor) {
                playlistHname.style.color = '#ffffff'; // белый цвет
            } else {
                playlistHname.style.color = '#000000'; // черный цвет
            }
        }
    });

    ifliked_list(arr, index, likeImg)
}

function changeBackground(index) {
    const songLens = document.getElementsByClassName("songLen");
    const sgName = document.getElementsByClassName("sgname");
    console.log(index);
    for (let item of songLens) {
        item.style.backgroundImage = ``
        item.firstElementChild.style.opacity = 1
    }

    for (let item of sgName) {
        item.style.color = "#fff"
        setTimeout(() => {
            if (nowName.innerHTML === item.innerHTML && item.nextElementSibling.innerHTML === nowArtist.innerHTML) {
                let i = Array.from(sgName).indexOf(item)
                sgName[i].style.color = "#1DB954"
                songLens[i].firstElementChild.style.opacity = 0
                songLens[i].style.backgroundImage = `url('https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif')`
            }
        }, 100);
    }
}




function changeBackground_song4(index) {
    const sgName = document.getElementsByClassName("sgname4");
    if (index < 4) {
        for (let item of sgName) {
            item.style.color = "#fff"
        }
        sgName[index].style.color = "#1DB954"
    } else if (index >= 4) {
        sgName[3].style.color = "#fff"
    }
}

function milliseconds(millisecond) {
    let minutes = Math.floor(millisecond / 60000);
    let remainingMilliseconds = millisecond % 60000;
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    let timeString = `${hours} hr ${remainingMinutes} min`;

    return timeString;
}


// Лист лайкед сонгс
function listLiked(arr, src, title, typed, scroll) {
    plhname = title
    if (!scroll && scroll !== true) {
        homeNav.scroll(0, 0)
    }

    setCont.style.display = "none"
    basic.innerHTML = ""
    contINP.style.display = "none"
    let tracks = arr;



    let playlistTracks = doc.createElement("div")
    playlistTracks.classList.add('home_Cont')

    let top_Cont = doc.createElement("div")
    top_Cont.classList.add('top_Cont')

    let muz_Cont = doc.createElement("div")
    muz_Cont.classList.add('muz_Cont')
    let trackslength
    if (tracks !== null) {
        trackslength = tracks.length
    } else {
        trackslength = 0
    }
    top_Cont.innerHTML = `
    <div class="top_Cont-info">
    <div class="top_Cont-info_img">
    <img class="typesList" style="background: linear-gradient(265deg, #8C68CD, #DE5C9D);" src="${src}">
    </div>
    <div class="top_Cont-bottom">
    <span class="top_Cont-info-type">PLAYLIST</span>
    <p>${title}</p>
    <span class="top_Cont-info-info"><span class="tp">${MyName.lastElementChild.innerHTML} • ${trackslength} songs</span><span>
    </div></div>
    `
    if (arr) {

        let millisecond = 0
        for (let item of arr) {
            millisecond = millisecond + item.duration_ms
        }

        let muzSettings = document.createElement('div');
        muzSettings.classList.add('muzSettings');
        muz_Cont.appendChild(muzSettings);

        let left = document.createElement('div');
        left.classList.add('left');
        muzSettings.appendChild(left);

        let goPlaylist = document.createElement('div');
        goPlaylist.classList.add('goPlaylist');
        left.appendChild(goPlaylist);


        let goPlaylistImg = document.createElement('img');
        goPlaylistImg.src = './icons/playmus.svg';
        goPlaylist.appendChild(goPlaylistImg);

        let sets3 = document.createElement('div');
        sets3.classList.add('sets3');
        left.appendChild(sets3);

        goPlaylist.onclick = () => {
            nowPlaying(tracks, 0)
            play_pause.click()
            setInterval(() => {
                if (nowAudio.paused) {
                    goPlaylistImg.src = './icons/playmus.svg'
                } else goPlaylistImg.src = "./icons/nowing.svg"
            }, 100);
        }


        let playInp = document.createElement('div');
        playInp.classList.add('playInp');
        muzSettings.appendChild(playInp);

        let searchIcon = document.createElement('i');
        searchIcon.classList.add('bx', 'bx-search');
        playInp.appendChild(searchIcon);

        let input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Artists, songs, or podcasts';
        playInp.appendChild(input);

        let muzItems = doc.createElement("div")
        muzItems.classList.add("muzItems")

        let itemMuz = doc.createElement("div")
        itemMuz.classList.add('itemMuz')

        crtItem(tracks);
        input.addEventListener("input", function () {
            const searchText = input.value.toLowerCase();
            const filteredTracks = tracks.filter(track =>
                track.name.toLowerCase().includes(searchText) ||
                track.artists[0].name.toLowerCase().includes(searchText) ||
                track.album.name.toLowerCase().includes(searchText)
            );
            itemMuz.innerHTML = "";
            crtItem(filteredTracks);
        });

        function crtItem(filtArr) {
            for (let item of filtArr) {
                tekushiy()
                let itemMuzCont = document.createElement("div");
                itemMuzCont.classList.add("itemMuz-cont");

                let songLen = document.createElement("div");
                songLen.classList.add("songLen");
                songLen.innerHTML = `<span>${tracks.indexOf(item)+1}</span>`;

                let songItemPlay = document.createElement("div");
                songItemPlay.classList.add("songItem_play");



                let songCont = document.createElement("div");
                songCont.classList.add("songCont");

                let songImage = document.createElement("img");
                songImage.src = item.album.images[2].url;

                let songDetails = document.createElement("div");

                let songName = document.createElement("p");
                songName.classList.add("sgname")
                songName.innerHTML = item.name;

                let songArtist = document.createElement("span");
                songArtist.innerHTML = item.artists[0].name;

                songDetails.append(songName, songArtist);
                songCont.append(songImage, songDetails);

                let songAlbum = document.createElement("div");
                songAlbum.classList.add("songAlbum");
                songAlbum.innerHTML = item.album.name;

                let addedBy = document.createElement("div");
                addedBy.classList.add("addedBy");
                addedBy.innerHTML = item.added_at;

                let durationMuz = document.createElement("div");
                durationMuz.classList.add("duration");
                durationMuz.innerHTML = `${duration(item.duration_ms)}`;

                itemMuzCont.onclick = (e) => {
                    if (e.target !== lkbtn) {
                        let i = filtArr.indexOf(item);
                        nowPlaying(filtArr, i);
                    };
                }


                let lkbtn = document.createElement("img");
                lkbtn.classList.add("lkbtn");
                lkbtn.classList.add("likedbt")

                if (typed === "liked") {
                    lkbtn.src = './icons/imlike.svg'
                    lkbtn.style.opacity = 1
                    lkbtn.onclick = async () => {
                        axios.delete(url_liked + `likedSongs/${item.id}.json`)
                        itemMuzCont.remove()
                        let items = await likedSongsList()

                    }
                } else {
                    lkbtn.onclick = () => {
                        if (lkbtn.src.includes("imlike")) {
                            lkbtn.src = './icons/Line=empty, Name=like.svg';
                        } else {
                            lkbtn.src = './icons/imlike.svg'
                            itemMuzCont.onmouseout = () => {
                                lkbtn.style.opacity = 0
                            }
                            itemMuzCont.onmouseout = () => {
                                lkbtn.style.opacity = 0
                            }

                            itemMuzCont.onmouseover = () => {
                                lkbtn.style.opacity = 1
                            }

                        }
                    }
                }


                songItemPlay.append(songCont, songAlbum, addedBy, lkbtn, durationMuz);
                itemMuzCont.append(songLen, songItemPlay);
                itemMuz.appendChild(itemMuzCont);
            }
        }


        let muzInfos = document.createElement('div');
        muzInfos.classList.add('muzInfos');
        muzInfos.innerHTML = `<div>
    <p>Title</p>
    <p>Album</p>
    <p>Date added</p>
    <p><i class="bx bx-time"></i></p>
    </div>`


        muzItems.appendChild(muzInfos)
        muzItems.appendChild(itemMuz)

        muz_Cont.appendChild(muzItems)

        homeNav.addEventListener("scroll", function () {
            if (muzInfos.offsetTop > 426) {
                muzInfos.style.backgroundColor = "#181818"
                muzInfos.style.borderBottom = '0.5px solid #777777'
            } else {
                muzInfos.style.backgroundColor = "rgba(0, 0, 0, 0)"
                muzInfos.style.borderBottom = 'none'
            }
        })
    } else {
        let muzInfos = document.createElement('div');
        muzInfos.classList.add('muzInfos_none');
        muzInfos.innerHTML = `
        Tracks you like will appear here
        `


        muz_Cont.appendChild(muzInfos)
    }

    playlistTracks.appendChild(top_Cont)
    playlistTracks.appendChild(muz_Cont)
    basic.appendChild(playlistTracks)
    playlistTracks.style.background = "url('img/liked.jpg')";
    playlistTracks.style.backgroundSize = "120% 120%";
    headerScrollColor = "#fff"
    playlistHname.style.color = '#000';
}

// Лист недавние
async function listRecently() {
    topSong.style.display = 'none'
    axios.get(`${url_liked}recently.json`, nowSongItem, options)
        .then((response) => {
            let data = Object.values(response.data)
            createRec(data)
        })


    async function createRec(arr) {
        let items = await likedSongsList()
        let tracks = arr.reverse()
        plhname = "Recently played"
        clearFace()

        let playlistTracks = doc.createElement("div")
        playlistTracks.classList.add('home_Cont')

        let top_Cont = doc.createElement("div")
        top_Cont.classList.add('top_Cont')

        let muz_Cont = doc.createElement("div")
        muz_Cont.classList.add('muz_Cont')
        let trackslength


        if (tracks !== null) {
            trackslength = tracks.length
        } else {
            trackslength = 0
        }
        top_Cont.innerHTML = `
        <div class="top_Cont-info">
        <div class="top_Cont-info_img">
        <img class="typesList" style="background: linear-gradient(90deg, #3DD5F3 0%, #3D8BFD 100%);" src="icons/Line=fill, Name=music.svg">
        </div>
        <div class="top_Cont-bottom">
        <span class="top_Cont-info-type">PLAYLIST</span>
        <p>Recently Played</p>
        <span class="top_Cont-info-info"><span class="tp">${MyName.lastElementChild.innerHTML} • ${trackslength} songs</span><span>
        </div></div>
        `
        if (arr !== null) {
            let millisecond = 0
            for (let item of arr) {
                millisecond = millisecond + item.duration_ms
            }

            let muzSettings = document.createElement('div');
            muzSettings.classList.add('muzSettings');
            muz_Cont.appendChild(muzSettings);

            let left = document.createElement('div');
            left.classList.add('left');
            muzSettings.appendChild(left);

            let goPlaylist = document.createElement('div');
            goPlaylist.classList.add('goPlaylist');
            left.appendChild(goPlaylist);


            let goPlaylistImg = document.createElement('img');
            goPlaylistImg.src = './icons/playmus.svg';
            goPlaylist.appendChild(goPlaylistImg);

            let sets3 = document.createElement('div');
            sets3.classList.add('sets3');
            left.appendChild(sets3);

            goPlaylist.onclick = () => {
                nowPlaying(tracks, 0)
                play_pause.click()
                setInterval(() => {
                    if (nowAudio.paused) {
                        goPlaylistImg.src = './icons/playmus.svg'
                    } else goPlaylistImg.src = "./icons/nowing.svg"
                }, 100);
            }


            let playInp = document.createElement('div');
            playInp.classList.add('playInp');
            muzSettings.appendChild(playInp);

            let searchIcon = document.createElement('i');
            searchIcon.classList.add('bx', 'bx-search');
            playInp.appendChild(searchIcon);

            let input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Artists, songs, or podcasts';
            playInp.appendChild(input);

            let muzItems = doc.createElement("div")
            muzItems.classList.add("muzItems")

            let itemMuz = doc.createElement("div")
            itemMuz.classList.add('itemMuz')

            crtItem(tracks);
            input.addEventListener("input", function () {
                const searchText = input.value.toLowerCase();
                const filteredTracks = tracks.filter(track =>
                    track.name.toLowerCase().includes(searchText) ||
                    track.artists[0].name.toLowerCase().includes(searchText)
                );
                itemMuz.innerHTML = "";
                crtItem(filteredTracks);
            });

            function crtItem(filtArr) {
                for (let item of filtArr) {
                    tekushiy()
                    let itemMuzCont = document.createElement("div");
                    itemMuzCont.classList.add("itemMuz-cont");

                    let songLen = document.createElement("div");
                    songLen.classList.add("songLen");
                    songLen.innerHTML = `<span>${tracks.indexOf(item)+1}</span>`;

                    let songItemPlay = document.createElement("div");
                    songItemPlay.classList.add("songItem_play");

                    let songCont = document.createElement("div");
                    songCont.classList.add("songCont");

                    let songImage = document.createElement("img");
                    if (item.album) {
                        songImage.src = item.album.images[2].url;
                    } else {
                        songImage.src = '../img/nullAlbum.jpg'
                        item.album = {
                            images: [{
                                    url: '../img/nullAlbum.jpg'
                                },
                                {
                                    url: '../img/nullAlbum.jpg'
                                },
                                {
                                    url: '../img/nullAlbum.jpg'
                                }
                            ]
                        }
                    }



                    let songDetails = document.createElement("div");

                    let songName = document.createElement("p");
                    songName.classList.add("sgname")
                    songName.innerHTML = item.name;

                    let songArtist = document.createElement("span");
                    songArtist.innerHTML = item.artists[0].name;

                    songDetails.append(songName, songArtist);
                    songCont.append(songImage, songDetails);

                    let songAlbum = document.createElement("div");
                    songAlbum.classList.add("songAlbum");
                    if (item.album) {
                        songAlbum.innerHTML = item.album.name;
                    } else {
                        songAlbum.innerHTML = "Album Undefined";
                    }

                    let addedBy = document.createElement("div");
                    addedBy.classList.add("addedBy");
                    addedBy.innerHTML = item.added_atr;

                    let durationMuz = document.createElement("div");
                    durationMuz.classList.add("duration");
                    durationMuz.innerHTML = `${duration(item.duration_ms)}`;

                    itemMuzCont.onclick = (e) => {
                        if (e.target !== lkbtn) {
                            let i = filtArr.indexOf(item);
                            nowPlaying(filtArr, i);
                        };
                    }


                    let lkbtn = document.createElement("img");
                    lkbtn.classList.add("lkbtn");
                    lkbtn.classList.add("lkrec");
                    lkbtn.src = './icons/Line=empty, Name=like.svg';
                    lkbtn.onclick = () => {
                        if (lkbtn.src.includes("imlike")) {
                            lkbtn.src = './icons/Line=empty, Name=like.svg';
                            axios.delete(url_liked + `likedSongs/${item.id}.json`)
                            itemMuzCont.onmouseout = () => {
                                lkbtn.style.opacity = 0
                            }
                        } else {
                            lkbtn.src = './icons/imlike.svg'
                            added_at(item)
                            axios.post(url_liked + `likedSongs/${item.id}.json`, item, options)
                            itemMuzCont.onmouseout = () => {
                                lkbtn.style.opacity = 1
                            }
                        }
                    }

                    itemMuzCont.onmouseout = () => {
                        lkbtn.style.opacity = 0
                    }

                    itemMuzCont.onmouseover = () => {
                        lkbtn.style.opacity = 1
                    }

                    songItemPlay.append(songCont, songAlbum, addedBy, lkbtn, durationMuz);
                    itemMuzCont.append(songLen, songItemPlay);
                    itemMuz.appendChild(itemMuzCont);

                    ifliked_arr(item, lkbtn, itemMuzCont, items)
                }
            }


            let muzInfos = document.createElement('div');
            muzInfos.classList.add('muzInfos');
            muzInfos.innerHTML = `<div>
    <p>Title</p>
    <p>Album</p>
    <p>Date added</p>
    <p><i class="bx bx-time"></i></p>
    </div>`


            muzItems.appendChild(muzInfos)
            muzItems.appendChild(itemMuz)

            muz_Cont.appendChild(muzItems)

            homeNav.addEventListener("scroll", function () {
                if (muzInfos.offsetTop > 426) {
                    muzInfos.style.backgroundColor = "#181818"
                    muzInfos.style.borderBottom = '0.5px solid #777777'
                } else {
                    muzInfos.style.backgroundColor = "rgba(0, 0, 0, 0)"
                    muzInfos.style.borderBottom = 'none'
                }
            })
        } else {
            let muzInfos = document.createElement('div');
            muzInfos.classList.add('muzInfos_none');
            muzInfos.innerHTML = `
        Tracks you like will appear here
        `


            muz_Cont.appendChild(muzInfos)
        }

        playlistTracks.appendChild(top_Cont)
        playlistTracks.appendChild(muz_Cont)
        basic.appendChild(playlistTracks)
        playlistTracks.style.background = "url('img/nedavno.jpg')";
        playlistTracks.style.backgroundSize = "120% 120%";
        headerScrollColor = "#fff"
        playlistHname.style.color = '#000';
    }
}



async function likedSongsList() {
    let response = await axios.get(url_liked + 'likedSongs.json')
    if (response.data !== null) {
        const tracks = Object.values(response.data).flatMap(obj => Object.values(obj));
        return tracks
    }
    return null
}


async function likedSongsList() {
    let response = await axios.get(url_liked + 'likedSongs.json')
    if (response.data !== null) {
        const tracks = Object.values(response.data).flatMap(obj => Object.values(obj));
        return tracks
    }
    return null
}


async function downloadSongsList() {
    let response = await axios.get(url_liked + 'downloads.json')
    if (response.data !== null) {
        const tracks = Object.values(response.data).flatMap(obj => Object.values(obj));
        return tracks
    }
    return null
}



async function itemsLiked() {
    let dta = await likedSongsList()
    basic.innerHTML = search
    listLiked(dta, "icons/Line=fill, Name=like.svg", "Liked Songs", "liked")
}

async function itemsRecently() {

}

async function ifliked_item(songs, index) {
    let items = await likedSongsList()
    if (items !== null) {
        let searchLiked = items.find(i => i.id === songs[index].id)
        if (searchLiked !== undefined) {
            addLikedBnt.src = "icons/imlike.svg"
        }
    }
}

async function ifliked_arr(item, lkbtn, cont, items) {
    if (items !== null) {
        let searchLiked = items.find(i => i.id === item.id)
        if (searchLiked !== undefined) {
            lkbtn.src = "icons/imlike.svg"
            lkbtn.style.opacity = 1
            cont.onmouseout = () => {
                lkbtn.style.opacity = 1
            }
        }
    }
}



// Дадобавления лайка
function added_at(item) {
    addLikedBnt.src = './icons/imlike.svg'
    let date = new Date()
    const options = {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    const formattedDate = `${date.toLocaleDateString('en-EN', options)}`;
    item.added_at = formattedDate
}

// Дадобавления лайка
function added_atr(item) {
    let date = new Date()
    const options = {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    const formattedDate = `${date.toLocaleDateString('en-EN', options)}`;
    item.added_atr = formattedDate
}



// Библиотека
async function library() {
    basic.innerHTML = ""
    setCont.style.display = "none"
    contINP.style.display = "none"

    let parentGrid = doc.createElement("div")
    parentGrid.classList.add("seeAll_cont")
    parentGrid.classList.add('seeAll_lib')
    let topTitle = doc.createElement("h1")
    topTitle.innerHTML = `Playlists`
    basic.appendChild(topTitle)
    basic.appendChild(parentGrid)


    let topResult = doc.createElement("div")
    topResult.classList.add("topResult")
    topResult.classList.add("topResult_lib")

    let likedArr = await likedSongsList()
    let llen = 0
    let lart = ''
    if (likedArr !== null) {
        llen = likedArr.length
        lart = `${likedArr[0].name} <span>${likedArr[0].artists[0].name}</span>`
    }
    topResult.innerHTML = `
        <div class="topResultCont TopContlibrary">
                <div class="likedItemOne">${lart}</div>
                <div class="noflex">
                    <p>Liked Songs</p><br>
                    <p class="numLikedLb">${llen} liked songs</p>
                </div>
        </div>
    `
    topResult.onclick = () => {
        itemMenuBtn[3].click()
    }
    parentGrid.appendChild(topResult)

    let items = await likedList()
    if (items !== null) {
        parentGrid.style.gridTemplateColumns = `repeat(${Math.floor(homeNav.clientWidth/190)}, minmax(170px, 1fr))`
        topResult.style.maxWidth = "none"
        topResult.style.height = "100%"

        for (let item of items) {
            createPlaylist(item.src, parentGrid, item.title, item.des, item.arr, item.index)
        }

    }
}


// Кидаем запрос на залайканные песни
async function likedList() {
    let response = await axios.get(url_liked + 'library.json')
    if (response.data !== null) {
        const tracks = Object.values(response.data).flatMap(obj => Object.values(obj));
        return tracks
    }
    return null
}


// Проверяем статус лайка
async function ifliked_list(songs, index, item) {
    let items = await likedList()
    console.log(items);
    if (items !== null) {
        let searchLiked = items.find(i => i.arr === songs[index].id)
        if (searchLiked !== undefined) {
            console.log(item);
            item.src = "icons/imlike.svg"
        }
    }
}


// Проверяем статус лайка
async function ifliked_artist(songs, index, item) {
    let items = await likedList()
    if (items !== null) {
        let searchLiked = items.find(i => i.arr === songs[index].id)
        if (searchLiked !== undefined) {
            console.log(item);
            item.innerHTML = "following"
            item.classList.add("following")
        }
    }
}

// Ищем item внутри объека
function findKeyByValue(obj, value) {
    if (!Array.isArray(obj)) {
        for (let key in obj) {
            if (key !== null) {
                if (obj[key].folder === value) {
                    return key;
                }
            }
        }
    } else {
        for (let item of obj) {
            if (item !== null) {
                if (item.folder === value) {
                    return obj.indexOf(item)
                }
            }
        }
    }
    return null;
}



async function listMy(arr, src, title, des, tracki, elem) {
    plhname = title
    clearFace()
    let tracks = tracki;
    let arrTip = arr

    let playlistTracks = doc.createElement("div")
    playlistTracks.classList.add('home_Cont')

    let top_Cont = doc.createElement("div")
    top_Cont.classList.add('top_Cont')

    let muz_Cont = doc.createElement("div")
    muz_Cont.classList.add('muz_Cont')
    let trackslength
    if (tracks !== null) {
        trackslength = tracks.length
    } else {
        trackslength = 0
    }

    if (src === 'null-img') {
        src = './icons/playlistAdd.svg'
    }

    top_Cont.innerHTML = `
    <div class="top_Cont-info">
    <div class="top_Cont-info_img">
    <img src="${src}">
    </div>
    <div class="top_Cont-bottom">
    <span class="top_Cont-info-type">PLAYLIST</span>
    <p>${title}</p>
    <span class="top_Cont-info-info">The hits of tomorrow are on Spotify today.<br>Made for <span>${des}<span>
    </div></div>
    `


    if (tracki !== null) {
        let muzSettings = document.createElement('div');
        muzSettings.classList.add('muzSettings');
        muz_Cont.appendChild(muzSettings);

        let left = document.createElement('div');
        left.classList.add('left');
        muzSettings.appendChild(left);

        let goPlaylist = document.createElement('div');
        goPlaylist.classList.add('goPlaylist');
        left.appendChild(goPlaylist);


        let goPlaylistImg = document.createElement('img');
        goPlaylistImg.src = './icons/playmus.svg';
        goPlaylist.appendChild(goPlaylistImg);

        let sets3 = document.createElement('div');
        sets3.classList.add('sets3');
        left.appendChild(sets3);


        goPlaylist.onclick = () => {
            nowPlaying(tracks, 0)
            play_pause.click()
            setInterval(() => {
                if (nowAudio.paused) {
                    goPlaylistImg.src = './icons/playmus.svg'
                } else goPlaylistImg.src = "./icons/nowing.svg"
            }, 100);
        }



        let dotsImg = document.createElement('img');
        dotsImg.src = './icons/Line=empty, Name=dots.svg';
        sets3.appendChild(dotsImg);



        let playInp = document.createElement('div');
        playInp.classList.add('playInp');
        muzSettings.appendChild(playInp);

        let searchIcon = document.createElement('i');
        searchIcon.classList.add('bx', 'bx-search');
        playInp.appendChild(searchIcon);

        let input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Artists, songs, or podcasts';
        playInp.appendChild(input);

        let muzItems = doc.createElement("div")
        muzItems.classList.add("muzItems")


        let itemMuz = doc.createElement("div")
        itemMuz.classList.add('itemMuz')
        let items = await likedSongsList()


        crtItem(tracks);
        input.addEventListener("input", function () {
            const searchText = input.value.toLowerCase();
            const filteredTracks = tracks.filter(track =>
                track.name.toLowerCase().includes(searchText) ||
                track.artists[0].name.toLowerCase().includes(searchText) ||
                track.album.name.toLowerCase().includes(searchText)
            );
            itemMuz.innerHTML = "";
            crtItem(filteredTracks);
        });

        function crtItem(filtArr) {
            for (let item of filtArr) {


                let itemMuzCont = document.createElement("div");
                itemMuzCont.classList.add("itemMuz-cont");

                let songLen = document.createElement("div");
                songLen.classList.add("songLen");
                songLen.innerHTML = `<span>${tracks.indexOf(item)+1}</span>`;

                let songItemPlay = document.createElement("div");
                songItemPlay.classList.add("songItem_play");

                let songCont = document.createElement("div");
                songCont.classList.add("songCont");

                let songImage = document.createElement("img");
                songImage.src = item.album.images[2].url;

                let songDetails = document.createElement("div");

                let songName = document.createElement("p");
                songName.classList.add("sgname")
                songName.innerHTML = item.name;

                let songArtist = document.createElement("span");
                songArtist.innerHTML = item.artists[0].name;

                songDetails.append(songName, songArtist);
                songCont.append(songImage, songDetails);

                let songAlbum = document.createElement("div");
                songAlbum.classList.add("songAlbum");
                songAlbum.innerHTML = item.album.name;

                let addedBy = document.createElement("div");
                addedBy.classList.add("addedBy");
                addedBy.innerHTML = formatDate(item.added_at);

                let durationMuz = document.createElement("div");
                durationMuz.classList.add("duration");
                durationMuz.innerHTML = `${duration(item.duration_ms)}`;

                itemMuzCont.onclick = (e) => {
                    if (e.target !== lkbtn) {
                        let i = filtArr.indexOf(item);
                        nowPlaying(filtArr, i);
                    }
                };

                itemMuzCont.oncontextmenu = (e) => {
                    e.preventDefault()
                    let delMyMuz = confirm(`Удалить песню ${item.name}`)
                    if (delMyMuz === true) {
                        axios.delete(`${url_liked}janres/-NQsqWEQgtB6wjjsIdBd/${numObj1}/janres/${numObj2}/tracki/${item.id}.json`)
                        itemMuzCont.remove()
                        setTimeout(() => {
                            elem.click()
                        }, 1000);
                    }
                }

                let lkbtn = document.createElement("img");
                lkbtn.classList.add("lkbtn");
                lkbtn.src = './icons/Line=empty, Name=like.svg';
                lkbtn.style.right = "10%"

                lkbtn.onclick = () => {
                    if (lkbtn.src.includes("imlike")) {
                        lkbtn.src = './icons/Line=empty, Name=like.svg';
                        axios.delete(url_liked + `likedSongs/${item.id}.json`)
                        itemMuzCont.onmouseout = () => {
                            lkbtn.style.opacity = 0
                        }
                    } else {
                        lkbtn.src = './icons/imlike.svg'
                        added_at(item)
                        axios.post(url_liked + `likedSongs/${item.id}.json`, item, options)
                        itemMuzCont.onmouseout = () => {
                            lkbtn.style.opacity = 1
                        }
                    }
                }

                itemMuzCont.onmouseout = () => {
                    lkbtn.style.opacity = 0
                }

                itemMuzCont.onmouseover = () => {
                    lkbtn.style.opacity = 1
                }


                songItemPlay.append(songCont, songAlbum, addedBy, lkbtn, durationMuz);
                itemMuzCont.append(songLen, songItemPlay);
                itemMuz.appendChild(itemMuzCont);

                ifliked_arr(item, lkbtn, itemMuzCont, items)
            }
        }


        let muzInfos = document.createElement('div');
        muzInfos.classList.add('muzInfos');
        muzInfos.innerHTML = `<div>
    <p>Title</p>
    <p>Album</p>
    <p>Date added</p>
    <p><i class="bx bx-time"></i></p>
    </div>`


        muzItems.appendChild(muzInfos)
        muzItems.appendChild(itemMuz)

        muz_Cont.appendChild(muzItems)

        homeNav.addEventListener("scroll", function () {
            if (muzInfos.offsetTop > 426) {
                muzInfos.style.backgroundColor = "#181818"
                muzInfos.style.borderBottom = '0.5px solid #777777'
            } else {
                muzInfos.style.backgroundColor = "rgba(0, 0, 0, 0)"
                muzInfos.style.borderBottom = 'none'
            }
        })
    } else {
        let muzInfos = document.createElement('div');
        muzInfos.classList.add('nonemuzs');

        let nullMySongs = doc.createElement("div")
        nullMySongs.classList.add("nullMySongs")

        let nullMyP = doc.createElement("p")
        nullMyP.innerHTML = "Let's find something for your playlist"

        let nullInput = doc.createElement("input")
        nullInput.id = 'searchMySongs'
        nullInput.type = 'text'
        nullInput.placeholder = 'Search Songs'

        let myTrackCont = doc.createElement("div")
        myTrackCont.classList.add("myTracks")
        nullInput.addEventListener("input", async () => {
            prostoPoisk(nullInput.value, mySearch)

            function mySearch(arr) {
                myTrackCont.innerHTML = ""
                for (let item of arr.tracks.items) {
                    let track = doc.createElement("div")
                    track.classList.add("myTrack")

                    let trackLeft = doc.createElement("div")
                    trackLeft.classList.add("songCont")

                    let trackLeft_text = doc.createElement("div")


                    let trackImg = doc.createElement("img")
                    trackImg.src = item.album.images[2].url
                    let trackName = doc.createElement("p")
                    trackName.innerHTML = item.name
                    trackName.style.fontSize = "14px"
                    trackName.style.lineHeight = "16px"
                    let trackSpan = doc.createElement("span")
                    trackSpan.innerHTML = item.artists[0].name
                    let addMuzon = doc.createElement("div")
                    addMuzon.classList.add("addMuzon")
                    addMuzon.innerHTML = 'Add'

                    addMuzon.addEventListener("click", () => {
                        addMuzon.classList.add("activeAdd")
                        axios.post(`${url_liked}janres/-NQsqWEQgtB6wjjsIdBd/${numObj1}/janres/${numObj2}/tracki/${item.id}.json`, item, options)
                        setTimeout(() => {
                            elem.click()
                        }, 1000);
                    })

                    trackLeft_text.appendChild(trackName)
                    trackLeft_text.appendChild(trackSpan)
                    trackLeft.appendChild(trackImg)
                    trackLeft.appendChild(trackLeft_text)
                    track.appendChild(trackLeft)
                    track.appendChild(addMuzon)
                    myTrackCont.appendChild(track)
                }
            }
        })

        nullMySongs.appendChild(nullMyP)
        nullMySongs.appendChild(nullInput)
        nullMySongs.appendChild(myTrackCont)
        muzInfos.appendChild(nullMySongs)
        muz_Cont.appendChild(muzInfos)
    }





    playlistTracks.appendChild(top_Cont)
    playlistTracks.appendChild(muz_Cont)
    basic.appendChild(playlistTracks)
    RGBaster.colors(src, {
        exclude: ['rgb(255,255,255)', 'rgb(255, 255, 254)', 'rgb(0, 0, 0)', 'rgba(0, 0, 0, 0.4039215686)'],
        success: function (palette) {
            playlistTracks.style.background = palette.dominant;
            headerScrollColor = palette.dominant

            const rgb = palette.dominant.match(/\d+/g);
            const relativeLuminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
            const isDarkColor = relativeLuminance < 128;
            if (isDarkColor) {
                playlistHname.style.color = '#ffffff'; // белый цвет
            } else {
                playlistHname.style.color = '#000000'; // черный цвет
            }
        }
    });
}

let numObj1
let numObj2
async function mytracks(i, i2) {
    let myMuzons = await axios.get(`${url_liked}janres/-NQsqWEQgtB6wjjsIdBd/${i2}/janres/${i}/tracki.json`)
    let data = myMuzons.data
    numObj1 = i2
    numObj2 = i
    if (data !== null) {
        const tracks = Object.values(data).flatMap(obj => Object.values(obj));
        return tracks
    }
    return null
}