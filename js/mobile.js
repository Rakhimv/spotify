let mbBtns = doc.querySelector(".mb-sets").children;
let masic = doc.querySelector(".masic")
let awaitBox = doc.querySelector(".await-box")
let awaitSpinner = `<div class="awaitLoad"><img src="./img/await.gif"></div>`

let mbController = doc.querySelector(".mb-controller")
let nowMbImg = doc.querySelector(".nowMbImg")
let nowMbName = doc.querySelector(".nowMbName")
let nowMbArtist = doc.querySelector(".nowMbArtist")
let hidePlayer = doc.querySelector(".hidePlayer")
let arrBottom = doc.querySelector(".arrBottom")
let imgBoxHide = doc.querySelector(".imgBoxHide")

awaitBox.innerHTML = awaitSpinner

for (let i = 0; i < mbBtns.length; i++) {
    const item = mbBtns[i];
    console.log(item);
    item.onclick = () => {
        clearTimeout(startMb)
        if (!item.classList.contains("mb-active")) {
            itemSrc = item.firstElementChild.src;
            for (let elem of mbBtns) {
                elem.classList.remove("mb-active");
                elem.firstElementChild.src = elem.firstElementChild.src.replace("-active", "");
            }
            item.classList.add("mb-active");
            if (!itemSrc.includes("-active")) {
                item.firstElementChild.src = itemSrc.split(".svg")[0] + "-active.svg";
            }
        }

        if (i === 0) {
            mb_home()
        } else if (i === 1) {
            mb_search()
        } else if (i === 2) {
            mb_likedSongs()
        } else if (i === 3) {
            mb_download()
        }
    };

}

let pls1, pls2, pls3, pls4, pls5, pls6;



let startMb = setTimeout(() => {
    mbBtns[0].click()
    mb_home()
}, 5000);




function mb_home() {
    pls1 = mixs[7]
    pls2 = mixs[9]
    pls3 = mixs[0]
    pls4 = mixs[8]
    pls5 = mixs[6]
    pls6 = mixs[3]
    mb_homeStart()
    setTimeout(() => {
        let awaitBox = doc.querySelector(".await-box")
        awaitBox.style.height = 'auto'
        const container = document.createElement('div');
        container.classList.add('mb-topFlex');

        let tpfItem1 = document.createElement('div');
        tpfItem1.classList.add('tpf-item');

        let tpfItem2 = document.createElement('div');
        tpfItem2.classList.add('tpf-item');

        let playlist1 = document.createElement('div');
        let playlist1Image = document.createElement('img');
        playlist1Image.src = `${pls1.images[0].url}`;
        let playlist1Name = document.createElement('p');
        playlist1Name.textContent = `${pls1.name}`;
        playlist1.appendChild(playlist1Image);
        playlist1.appendChild(playlist1Name);
        playlist1.onclick = () => {
            mbPlaylist(pls1)
        }

        let playlist2 = document.createElement('div');
        let playlist2Image = document.createElement('img');
        playlist2Image.src = `${pls2.images[0].url}`;
        let playlist2Name = document.createElement('p');
        playlist2Name.textContent = `${pls2.name}`;
        playlist2.appendChild(playlist2Image);
        playlist2.appendChild(playlist2Name);
        playlist2.onclick = () => {
            mbPlaylist(pls2)
        }

        let playlist3 = document.createElement('div');
        let playlist3Image = document.createElement('img');
        playlist3Image.src = `${pls3.images[0].url}`;
        let playlist3Name = document.createElement('p');
        playlist3Name.textContent = `${pls3.name}`;
        playlist3.appendChild(playlist3Image);
        playlist3.appendChild(playlist3Name);
        playlist3.onclick = () => {
            mbPlaylist(pls3)
        }

        let playlist4 = document.createElement('div');
        let playlist4Image = document.createElement('img');
        playlist4Image.src = `${pls4.images[0].url}`;
        let playlist4Name = document.createElement('p');
        playlist4Name.textContent = `${pls4.name}`;
        playlist4.appendChild(playlist4Image);
        playlist4.appendChild(playlist4Name);
        playlist4.onclick = () => {
            mbPlaylist(pls4)
        }

        let playlist5 = document.createElement('div');
        let playlist5Image = document.createElement('img');
        playlist5Image.src = `${pls5.images[0].url}`;
        let playlist5Name = document.createElement('p');
        playlist5Name.textContent = `${pls5.name}`;
        playlist5.appendChild(playlist5Image);
        playlist5.appendChild(playlist5Name);
        playlist5.onclick = () => {
            mbPlaylist(pls5)
        }

        let playlist6 = document.createElement('div');
        let playlist6Image = document.createElement('img');
        playlist6Image.src = `${pls6.images[0].url}`;
        let playlist6Name = document.createElement('p');
        playlist6Name.textContent = `${pls6.name}`;
        playlist6.appendChild(playlist6Image);
        playlist6.appendChild(playlist6Name);
        playlist6.onclick = () => {
            mbPlaylist(pls6)
        }

        tpfItem1.appendChild(playlist1);
        tpfItem1.appendChild(playlist2);
        tpfItem1.appendChild(playlist3);
        tpfItem2.appendChild(playlist4);
        tpfItem2.appendChild(playlist5);
        tpfItem2.appendChild(playlist6);

        container.appendChild(tpfItem1);
        container.appendChild(tpfItem2);

        awaitBox.appendChild(container);


        console.log(pls1);
        scrollItems(awaitBox)
    }, 1000);
}


function mb_homeStart() {
    masic.innerHTML = ` <div class="topBar">
    <div class="hello">Good morning</div>
    <div class="mb-burger-btn">
        <img src="mb-icons/mb-recently.svg" alt="">
        <img src="mb-icons/mb-settings.svg" alt="">
    </div>
</div>


<div class="await-box">

</div>`
}



function scrollItems(cont) {
    for (let item of playlistsHome) {
        const div = document.createElement('div');
        div.classList.add('recom_parent');

        const span = document.createElement('span');
        span.textContent = 'Are we listening further?';
        div.appendChild(span);

        const scrollDiv = document.createElement('div');
        scrollDiv.classList.add('recom_scroll');

        for (let elem of item) {
            const childDiv = document.createElement('div');
            childDiv.innerHTML = `<img src="${elem.images[0].url}"><span>${elem.name}</span>`
            scrollDiv.appendChild(childDiv);

            childDiv.onclick = () => {
                console.log(elem);
                mbPlaylist(elem)
            }
        }

        // add the scrollDiv to the outermost div
        div.appendChild(scrollDiv);
        cont.appendChild(div);
    }
}


async function mb_search() {
    masic.innerHTML = ``
    let cont = doc.createElement("div")
    cont.classList.add("mb-search-cont")

    let box_search_inp = doc.createElement("div")
    box_search_inp.classList.add("mb-search-box")
    box_search_inp.innerHTML = `<i class="bx bx-search"></i>`

    let input = doc.createElement("input")
    input.type = "text"
    input.classList.add("mb-search-input")
    input.placeholder = "What would you like to listen to?"

    let mb_search_title = doc.createElement("p")
    mb_search_title.classList.add("mb-search-title")
    mb_search_title.textContent = "Search"

    let janresMb = doc.createElement("div")
    janresMb.classList.add("mb-janres")


    let contS_mb = doc.createElement("div")
    contS_mb.classList.add("search_mb_cont")
    contS_mb.style.display = "none"

    input.addEventListener("input", () => {
        if (input.value !== "") {
            janresMb.style.display = 'none'
            loadDataMob(input.value, searchAll_mob, contS_mb);
            masic.scroll(0, 0)
            contS_mb.style.display = "block"
        } else {
            janresMb.style.display = 'grid'
            contS_mb.style.display = "none"
        }
    })





    searching()
    setTimeout(() => {
        console.log(mb_kanres);
        for (let item of mb_kanres.items) {
            let catCont = doc.createElement("div")
            catCont.classList.add("mb-cat-cont")
            catCont.style.backgroundColor = item.data.data.cardRepresentation.backgroundColor.hex
            catCont.onclick = () => {
                input.value = item.data.data.cardRepresentation.title.transformedLabel
                janresMb.style.display = 'none'
                loadDataMob(input.value, searchAll_mob, contS_mb);
                masic.scroll(0, 0)
                contS_mb.style.display = "block"
            }
            catCont.innerHTML = `<span>${item.data.data.cardRepresentation.title.transformedLabel}</span>
            <img src="${item.data.data.cardRepresentation.artwork.sources[0].url}">`
            janresMb.appendChild(catCont)
        }
    }, 1000);


    box_search_inp.appendChild(input)
    cont.appendChild(mb_search_title)
    cont.appendChild(box_search_inp)
    masic.appendChild(cont)
    masic.appendChild(janresMb)
    masic.appendChild(contS_mb)

    setTimeout(() => {
        input.focus()
    }, 1000);
}


async function mbPlaylist(pls) {
    masic.innerHTML = ``
    let mb_pl_contTop = doc.createElement("div")
    mb_pl_contTop.classList.add("mb-pl-cont-top")

    let mb_pl_shadow = doc.createElement("div")
    mb_pl_shadow.classList.add("mb-pl-cont-shadow")

    let mb_pl_image = doc.createElement("img")
    mb_pl_image.classList.add("mb-pl-image")
    mb_pl_image.src = pls.images[0].url

    let backMb = doc.createElement("div")
    backMb.innerHTML = `<img src="../icons/back-arr.svg">`
    backMb.classList.add("back-mb")

    backMb.onclick = () => {
        mbBtns[0].click()
    }

    let mb_info_pl = doc.createElement("div")
    mb_info_pl.classList.add("mb-info-pl")
    mb_info_pl.innerHTML = `<span class="pl-name-mb">${pls.name}</span><br>
    <span class="pl-des-mb">${pls.description}</span>
    `

    let mb_pl_muzs = doc.createElement("div")
    mb_pl_muzs.classList.add("mb-pl-muzs")


    if (pls.tracks.items) {
        mb_createPl(pls.tracks.items)
    } else {
        console.log(pls);
        let plsId = await tracksPlaylist(pls.id)
        mb_createPl(plsId.items)
        console.log(plsId)
    }

    function mb_createPl(arr) {

        RGBaster.colors(pls.images[0].url, {
            exclude: ['rgb(255,255,255)', 'rgb(255, 255, 254)', 'rgb(0, 0, 0)', 'rgba(0, 0, 0, 0.4039215686)'],
            success: function (palette) {
                console.log(mb_pl_shadow);
                mb_pl_shadow.style.background = `linear-gradient(${palette.dominant}  0%, #00000000 100%)`;

            }
        });


        for (let item of arr) {
            let mb_pl_muz = doc.createElement("div")
            mb_pl_muz.classList.add("mb-pl-muz")

            console.log(item);

            let mb_itemImg = doc.createElement("div")
            mb_itemImg.style.backgroundColor = `#${Math.random().toString(16).slice(2, 8)}`
            mb_itemImg.style.backgroundImage = `url("${item.track.album.images[0].url}")`
            mb_itemImg.classList.add("mb-itemImg")

            let mb_itemFlex = doc.createElement("div")
            mb_itemFlex.classList.add("mb-itemFlex")

            let mb_itemName = doc.createElement("p")
            mb_itemName.innerHTML = item.track.name
            mb_itemName.classList.add("mb-itemName")


            let mb_itemDes = doc.createElement("p")
            mb_itemDes.innerHTML = item.track.artists[0].name
            mb_itemDes.classList.add("mb-itemDes")

            let mb_dots = doc.createElement("div")
            mb_dots.classList.add("mb-dots")

            mb_pl_muz.appendChild(mb_itemImg)
            mb_pl_muz.appendChild(mb_itemFlex)
            mb_pl_muzs.appendChild(mb_pl_muz)
            mb_pl_muz.appendChild(mb_dots)
            mb_itemFlex.append(mb_itemName, mb_itemDes)

            mb_pl_muz.onclick = () => {
                let trackArray = arr.map(item => item.track);
                let i = arr.indexOf(item)
                nowPlayingMob(trackArray, i)
            }
        }

        mb_pl_contTop.appendChild(mb_pl_image)
        masic.appendChild(backMb)
        masic.appendChild(mb_pl_shadow)
        masic.appendChild(mb_pl_contTop)
        masic.appendChild(mb_info_pl)
        masic.appendChild(mb_pl_muzs)
    }
}

let hide_c_title = doc.querySelector(".hide-c-title")
let hide_c_artist = doc.querySelector(".hide-c-artist")
let mobileC2 = doc.querySelector(".prg_now")
let input_range = doc.querySelector(".mb-range")
let upc1 = doc.querySelector(".upc1")
let upc2 = doc.querySelector(".upc2")
let lyrics_mbCont = doc.querySelector(".mb-lyrics-cont")
let lyrics_mbContent = doc.querySelector(".mb-lyrics-content")
let lyr_title = doc.querySelector(".lyr_title")
let like_hide = doc.querySelector(".like-hide")
let down_hide = doc.querySelector(".down-hide")

let uncover = doc.querySelector(".uncover")

input_range.addEventListener("input", function (e) {
    console.log(input_range.value);
    let value = input_range.value
    mobileC2.style.width = value + "%";
    audio.currentTime = audio.duration * (value / 100);
})



uncover.onclick = () => {
    console.log(uncover.innerHTML.includes("plus"));
    if (uncover.innerHTML.includes("plus")) {
        uncover.innerHTML = `<i class='bx bx-list-minus'></i>`
        lyrics_mbCont.style.height = "auto"
    } else {
        uncover.innerHTML = `<i class='bx bx-list-plus'></i>`
        lyrics_mbCont.style.height = "300px"
    }
}

function mb_control() {
    hidePlayer.style.backgroundColor = `#000000`;
    mbPlay.innerHTML = `<img src="./icons/Pause.svg" alt="">`
    lyrics_mbCont.style.display = "none"
    mbController.style.display = "block"
    nowMbImg.style.backgroundImage = `url("${nowSongItem.album.images[0].url}")`
    imgBoxHide.style.backgroundImage = `url("${nowSongItem.album.images[0].url}")`
    nowMbName.innerHTML = nowSongItem.name
    hide_c_title.innerHTML = `${nowSongItem.name}`
    nowMbArtist.innerHTML = nowSongItem.artists[0].name
    hide_c_artist.innerHTML = nowSongItem.artists[0].name



    setInterval(() => {
        upc1.innerHTML = dstart.innerHTML
        upc2.innerHTML = dend.innerHTML
    }, 1000);


    $.ajax({
        type: "GET",
        data: {
            apikey: "51790af03028d227937414b4eb458c89",
            q_artist: nowSongItem.name,
            q_track: nowSongItem.artists[0].name,
            format: "jsonp",
            callback: "jsonp_callback"
        },
        url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get",
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        contentType: 'application/json',
        success: function (data) {

            lyricsText.innerHTML = search
            if (data.message.body.lyrics && data.message.body.lyrics.lyrics_body) {
                lyrics_mbCont.style.display = "block"
                let vou = data.message.body.lyrics.lyrics_body;
                vou = vou.replace(/\n/g, "<br>");
                let lines = vou.split("<br>");
                let spans = lines.map(line => `<span>${line}</span>`);
                lyrics_mbContent.innerHTML = spans.join("").split("****")[0];
                // let spansLyr = lyrics_mbContent.querySelectorAll("span");
                // for (let i = 0; i < spansLyr.length; i++) {
                //     if (spans[i].innerHTML === "") {
                //         spans[i].remove()
                //     }
                // }

                setTimeout(() => {
                    const songDuration = audio.duration;
                    const spanCount = lyrics_mbContent.querySelectorAll("span").length;
                    const spanDuration = songDuration / spanCount;

                    function highlightLyrics() {
                        const currentTime = audio.currentTime;
                        const currentSpanIndex = Math.floor(currentTime / spanDuration);
                        const spans = lyrics_mbContent.querySelectorAll("span");
                        for (let i = 0; i < spans.length; i++) {
                            spans[i].classList.remove("activeLyric-mb");
                        }

                        if (currentSpanIndex < spans.length) {
                            for (let i = 0; i <= currentSpanIndex; i++) {
                                spans[i].classList.add("activeLyric-mb");
                            }
                        }

                        let activeSpans = document.getElementsByClassName("activeLyric-mb")
                        if (activeSpans.length > 0) {
                            let spansLast = activeSpans[activeSpans.length - 1]
                            let topLScrol = spansLast.offsetTop - 200
                            lyrics_mbContent.scroll(0, topLScrol + 150)
                        }
                    }
                    audio.addEventListener("timeupdate", highlightLyrics);
                }, 2000);

            } else {
                lyrics_mbCont.style.display = "none"
            }
        }
    });




    proverkaPlaying()





    RGBaster.colors(nowSongItem.album.images[0].url, {
        exclude: ['rgb(255,255,255)', 'rgb(255, 255, 254)', 'rgb(0, 0, 0)', 'rgba(0, 0, 0, 0.4039215686)'],
        success: function (palette) {
            hidePlayer.style.background = `linear-gradient(${palette.dominant}  0%, #121212 100%)`;
            mbController.style.backgroundColor = palette.dominant;
            lyrics_mbCont.style.backgroundColor = palette.dominant

            const rgb = palette.dominant.match(/\d+/g);
            const relativeLuminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
            const isDarkColor = relativeLuminance < 128;
            if (isDarkColor) {
                lyrics_mbContent.style.color = '#ffffff'; // белый цвет
                lyr_title.style.color = '#ffffff';
            } else {
                lyrics_mbContent.style.color = '#000000'; // черный цвет
                lyr_title.style.color = '#000000';
            }
        }
    });

    like_hide.onclick = () => {
        if (like_hide.src.includes("imlike")) {
            like_hide.src = './icons/Line=empty, Name=like.svg';
            axios.delete(url_liked + `likedSongs/${nowSongItem.id}.json`)
        } else {
            like_hide.src = './icons/imlike.svg'
            added_at(nowSongItem)
            axios.post(url_liked + `likedSongs/${nowSongItem.id}.json`, nowSongItem, options)
        }

        if (doc.querySelector(".mb-search-lik")) {
            setTimeout(() => {
                mb_likedSongs()
            }, 1000);
        }
    }

}


mbController.addEventListener("click", () => {
    hidePlayer.style.transition = "0.5s"
    hidePlayer.style.top = "0%"
    setTimeout(() => {
        hidePlayer.style.transition = "none"
    }, 500);
    ifliked_mb(nowSongItem)
    ifdown_mb(nowSongItem)
})


arrBottom.onclick = () => {
    hidePlayer.style.transition = "0.5s"
    hidePlayer.style.top = "200%"
    setTimeout(() => {
        hidePlayer.style.transition = "none"
    }, 500);
}


let mbPlay = doc.querySelector(".mb-play")
let mbNext = doc.querySelector(".mb-nextBtn")
let mbBack = doc.querySelector(".mb-backBtn")

let mbRandom = doc.querySelector(".mb-random")
let mbRepeat = doc.querySelector(".mb-repeat")

mbRandom.onclick = () => {
    let childThis = mbRandom.firstElementChild
    if (childThis.src.includes('icons/Shuffle.svg')) {
        childThis.src = 'icons/Shuffle-active.svg';
        isRandom = true
    } else {
        childThis.src = 'icons/Shuffle.svg'
        isRandom = false
    }
}


mbRepeat.onclick = () => {
    let childThis = mbRepeat.firstElementChild
    if (childThis.src.includes('icons/Repeat.svg')) {
        childThis.src = 'icons/Random-active.svg';
        isRepeat = true
    } else {
        childThis.src = 'icons/Repeat.svg'
        isRepeat = false
    }
}

let downIcon = doc.createElement("div")
downIcon.style.backgroundImage = 'url("../icons/Play.svg")'
mbPlay.onclick = () => {
    if (nowAudio.paused) {
        nowAudio.play()
        mbPlay.innerHTML = `<img src="./icons/Pause.svg" alt="">`
    } else {
        nowAudio.pause()
        mbPlay.innerHTML = `<img src="./icons/Play.svg" alt="">`
    }
}




let mbs_items = [
    {
        name: "Best Match",
        id: 0
    },
    {
        name: "Songs",
        id: 1
    },
    {
        name: "Playlists",
        id: 2
    },
    {
        name: "Artists",
        id: 3
    },
    {
        name: "Albums",
        id: 4
    }
]




async function searchAll_mob(arr, cont) {
    cont.innerHTML = ``
    let smb_categories = doc.createElement("div")
    smb_categories.classList.add("scroll_catsMobile")


    let res_cont = doc.createElement("div")
    res_cont.classList.add("res_contMobile")

    let resID = 0

    for (let item of mbs_items) {
        let mb_category = doc.createElement("div")
        mb_category.classList.add("mb-category-item")
        if (item.id === 0) {
            mb_category.classList.add('active_cat_mob')
        }

        mb_category.onclick = () => {
            let cts = doc.getElementsByClassName("mb-category-item")
            for (let ii of cts) {
                ii.classList.remove('active_cat_mob')
            }
            mb_category.classList.add('active_cat_mob')
            smb_categories.scroll(mb_category.offsetLeft - 15, 0)
            resID = item.id
            changeTypeSearch()
            setTimeout(() => {
                proverkaPlaying()
            }, 2000);
        }
        mb_category.innerHTML = item.name
        smb_categories.appendChild(mb_category)
    }


    function changeTypeSearch() {
        res_cont.classList.add("avtive_res")
        res_cont.innerHTML = `<img src="./img/await.gif">`
        setTimeout(() => {
            res_cont.classList.remove("avtive_res")
            if (resID === 0 || resID === 1) {
                songsMob(arr.tracks, res_cont)
            } else if (resID === 2) {
                playlistsMob(arr.playlists, res_cont)
            } else if (resID === 3) {
                artistsMob(arr.artists, res_cont)
            } else if (resID === 4) {
                albumsMob(arr.albums, res_cont)
            }
        }, 1000);
    }

    changeTypeSearch()
    // let hideScrollS = doc.createElement("span")
    // hideScrollS.classList.add("hide_scrollS")

    // smb_categories.appendChild(hideScrollS)
    cont.appendChild(smb_categories)
    cont.appendChild(res_cont)

    proverkaPlaying()
}



async function songsMob(arr, cont) {
    cont.innerHTML = ``

    let songsConts = doc.createElement("div")
    songsConts.classList.add('songs_conts')

    cont.appendChild(songsConts)

    for (let item of arr.items) {
        console.log(item);

        let mb_pl_muz = doc.createElement("div")
        mb_pl_muz.classList.add("mb-pl-muz")

        console.log(item);

        let mb_itemImg = doc.createElement("div")
        mb_itemImg.style.backgroundColor = `#${Math.random().toString(16).slice(2, 8)}`
        mb_itemImg.style.backgroundImage = `url("${item.album.images[0].url}")`
        mb_itemImg.classList.add("mb-itemImg")

        let mb_itemFlex = doc.createElement("div")
        mb_itemFlex.classList.add("mb-itemFlex")

        let mb_itemName = doc.createElement("p")
        mb_itemName.innerHTML = item.name
        mb_itemName.classList.add("mb-itemName")


        let mb_itemDes = doc.createElement("p")
        mb_itemDes.innerHTML = item.artists[0].name
        mb_itemDes.classList.add("mb-itemDes")


        mb_pl_muz.appendChild(mb_itemImg)
        mb_pl_muz.appendChild(mb_itemFlex)
        songsConts.appendChild(mb_pl_muz)
        mb_itemFlex.append(mb_itemName, mb_itemDes)

        mb_pl_muz.onclick = () => {
            let i = arr.items.indexOf(item)
            nowPlayingMob(arr.items, i)
        }
    }
}



async function playlistsMob(arr, cont) {
    cont.innerHTML = ``
    let playlistsConts = doc.createElement("div")
    playlistsConts.classList.add('playlists_conts')
    cont.appendChild(playlistsConts)


    for (let item of arr.items) {
        let playlist_mobs = doc.createElement("div")
        playlist_mobs.classList.add('playlist_mobs')

        let playlist_mobs_img = doc.createElement("img")
        playlist_mobs_img.src = item.images[0].url
        playlist_mobs_img.style.backgroundColor = `#${Math.random().toString(16).slice(2, 8)}`

        let playlist_mobs_p = doc.createElement("p")
        playlist_mobs_p.innerHTML = item.name


        playlist_mobs.append(playlist_mobs_img, playlist_mobs_p)

        playlist_mobs.onclick = async () => {
            mbPlaylist(item)
        }

        playlistsConts.appendChild(playlist_mobs)
    }
}


async function artistsMob(arr, cont) {
    cont.innerHTML = ``
    let artistsConts = doc.createElement("div")
    artistsConts.classList.add('artists_conts')
    cont.appendChild(artistsConts)

    console.log(arr.items);
    for (let item of arr.items) {
        let artist_mobs = doc.createElement("div")
        artist_mobs.classList.add('artist_mobs')

        let artist_mobs_img = doc.createElement("img")
        artist_mobs_img.src = item.images[0].url
        artist_mobs_img.style.backgroundColor = `#${Math.random().toString(16).slice(2, 8)}`

        let artist_mobs_p = doc.createElement("p")
        artist_mobs_p.innerHTML = item.name + `<i class='bx bxs-badge-check'></i>`


        artist_mobs.append(artist_mobs_img, artist_mobs_p)

        // artist_mobs.onclick = async () => {
        //     mbartist(item)
        // }

        artistsConts.appendChild(artist_mobs)
    }
}



async function albumsMob(arr, cont) {
    cont.innerHTML = ``
    let albumConts = doc.createElement("div")
    albumConts.classList.add('album_conts')
    cont.appendChild(albumConts)

    console.log(arr.items);
    for (let item of arr.items) {
        let album_mobs = doc.createElement("div")
        album_mobs.classList.add('album_mobs')

        let album_mobs_img = doc.createElement("img")
        album_mobs_img.src = item.images[0].url
        album_mobs_img.style.backgroundColor = `#${Math.random().toString(16).slice(2, 8)}`

        let album_mobs_p = doc.createElement("p")
        album_mobs_p.innerHTML = item.name

        let album_mobs_span = doc.createElement("span")
        album_mobs_span.innerHTML = `${item.release_date.substr(0, 4)}  •  ${item.artists[0].name}`

        album_mobs.append(album_mobs_img, album_mobs_p, album_mobs_span)

        // album_mobs.onclick = async () => {
        //     mbalbum(item)
        // }

        albumConts.appendChild(album_mobs)
    }
}









async function loadDataMob(inpv, func, cont) {
    const accessToken = await getToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${inpv}*&type=album,artist,playlist,track&limit=50&offset=0`, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    func(data, cont)
}



function proverkaPlaying() {
    if (doc.getElementsByClassName('mb-itemName') && nowSongItem) {
        let playedNames = doc.getElementsByClassName('mb-itemName')
        for (let item of playedNames) {
            item.classList.remove('mb-itemName-played')
            if (item.innerHTML == nowSongItem.name && item.nextElementSibling.innerHTML == nowSongItem.artists[0].name) {
                item.classList.add('mb-itemName-played')
            }
        }
    }
}



async function nowPlayingMob(songs, index) {

    mbBack.onclick = () => {
        if (index > 0) {
            nowPlayingMob(songs, index - 1)
        }
    }

    // Кнопка вперед
    mbNext.onclick = () => {
        if (index < songs.length) {
            nowPlayingMob(songs, index + 1)
        }
    }

    // Удаляем маркет песни что бы отправить его на сервер
    nowSongItem = songs[index]
    nowSongItem.ind = index
    let item = songs[index];


    mb_control()

    // Если при нажатии играет таже песня нечего не делаем
    if (nowAudio.src !== item.preview_url) {
        nowAudio.src = item.preview_url;


        if (item.preview_url === null || item.preview_url === undefined) {
            nowAudio.src = await nullSearch(item.name, item.artists[0].name);
            item.preview_url = await nullSearch(item.name, item.artists[0].name);
        }
        if (nowAudio.paused) {
            nowAudio.addEventListener('loadedmetadata', () => {
                nowAudio.play();
            });
        }
    }

    // Если песня заканчивается
    nowAudio.onended = () => {
        // Повтор включен
        if (isRepeat === true) {
            nowAudio.currentTime = 0;
            nowAudio.play();
        } else if (isRandom === true && isRepeat === false) { // Рандом
            let randomizer = Math.floor(Math.random() * songs.length);
            nowPlayingMob(songs, randomizer);
        } else if (isRandom === false && isRepeat === false) { // Если нечего не включено то продолжаем
            index = (index + 1) % songs.length;
            nowPlayingMob(songs, index);
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
    ifliked_mb(songs[index])
    ifdown_mb(songs[index])
}


async function mb_likedSongs() {
    masic.innerHTML = `<div class="likedGra"></div>`
    let cont = doc.createElement("div")
    cont.classList.add("mb-search-cont")
    cont.classList.add("mb-search-lik")

    let box_search_inp = doc.createElement("div")
    box_search_inp.classList.add("mb-search-box")
    box_search_inp.classList.add("liked-mb-input")
    box_search_inp.innerHTML = `<i class="bx bx-search"></i>`

    let input = doc.createElement("input")
    input.type = "text"
    input.classList.add("mb-search-input")
    input.placeholder = "Search by favorite track"

    let mbSongsLiked = await likedSongsList()
    let songsLen = 0

    if (mbSongsLiked !== null) {
        songsLen = await mbSongsLiked.length
    }
    let mb_search_title = doc.createElement("p")
    mb_search_title.classList.add("mb-search-title")
    mb_search_title.classList.add("mb-search-title-link")
    mb_search_title.innerHTML = `Favorite tracks<br><span>${await songsLen} songs</span>`

    let songsLiked = doc.createElement("div")
    songsLiked.classList.add("mb-likedSongs-item")

    if (mbSongsLiked !== null) {
        input.addEventListener("input", () => {
            if (input.value !== "") {
                const searchText = input.value.toLowerCase();
                const filteredTracks = mbSongsLiked.filter(track =>
                    track.name.toLowerCase().includes(searchText) ||
                    track.artists[0].name.toLowerCase().includes(searchText) ||
                    track.album.name.toLowerCase().includes(searchText)
                );
                songsLiked.innerHTML = "";
                crtLiked(filteredTracks);
            } else {
                crtLiked(mbSongsLiked)
            }
        })


        async function crtLiked(arr) {
            mb_search_title.innerHTML = `Favorite tracks<br><span>${arr.length} songs</span>`
            songsLiked.innerHTML = ``
            for (let item of await arr) {
                let lk_cont = doc.createElement("div")
                lk_cont.classList.add("lk-cont-item")

                let divv = doc.createElement("div")
                divv.classList.add("lk-div-item")

                let lk_img = doc.createElement("img")
                lk_img.classList.add("lk-img-item")
                lk_img.src = item.album.images[0].url

                let lk_title_flex = doc.createElement("div")
                lk_title_flex.classList.add("lk-title-flex")
                lk_title_flex.innerHTML = `<p class="mb-itemName">${item.name}</p><span>${item.artists[0].name}</span>`

                let lk_imgBtn = doc.createElement("img")
                lk_imgBtn.src = './icons/imlike.svg'
                lk_imgBtn.classList.add("lk-imgBtn")

                lk_imgBtn.onclick = () => {
                    setTimeout(() => {
                        lk_cont.remove()
                    }, 800);
                    lk_cont.style.marginLeft = `-200%`
                    mb_search_title.innerHTML = `Favorite tracks<br><span>${arr.length = arr.length - 1} songs</span>`
                    axios.delete(url_liked + `likedSongs/${item.id}.json`)
                    if (arr.length === 0) {
                        setTimeout(() => {
                            mb_likedSongs()
                        }, 700);
                    }
                }

                lk_cont.onclick = (e) => {
                    console.log(e);
                    if (e.target !== lk_imgBtn) {
                        let i = mbSongsLiked.indexOf(item)
                        nowPlayingMob(mbSongsLiked, i)
                    }
                }


                divv.append(lk_img, lk_title_flex)
                lk_cont.appendChild(divv)
                lk_cont.appendChild(lk_imgBtn)
                songsLiked.appendChild(lk_cont)
            }
            proverkaPlaying(nowSongItem)

        }

        crtLiked(mbSongsLiked)
    } else {
        songsLiked.innerHTML = "<span class='yuqMuzon'>The tracks you like<br>will appear here<span>"
    }

    box_search_inp.appendChild(input)
    cont.appendChild(box_search_inp)
    cont.appendChild(mb_search_title)
    masic.appendChild(cont)
    masic.appendChild(songsLiked)

}

async function ifliked_mb(item) {
    let items = await likedSongsList()
    if (items !== null) {
        let searchLiked = items.find(i => i.id === item.id)
        if (searchLiked !== undefined) {
            like_hide.src = "icons/imlike.svg"
        } else {
            like_hide.src = "./icons/Line=empty, Name=like.svg"
        }
    } else {
        like_hide.src = "./icons/Line=empty, Name=like.svg"
    }
}



async function mb_download() {
    masic.innerHTML = `<div class="likedGrad"></div>`
    let cont = doc.createElement("div")
    cont.classList.add("mb-search-cont")
    cont.classList.add("mb-search-lik")

    let box_search_inp = doc.createElement("div")
    box_search_inp.classList.add("mb-search-box")
    box_search_inp.classList.add("liked-mb-input")
    box_search_inp.innerHTML = `<i class="bx bx-search"></i>`

    let input = doc.createElement("input")
    input.type = "text"
    input.classList.add("mb-search-input")
    input.placeholder = "Search by download track"

    let mbSongsLiked = await downloadSongsList()
    let songsLen = 0

    if (mbSongsLiked !== null) {
        songsLen = await mbSongsLiked.length
    }
    let mb_search_title = doc.createElement("p")
    mb_search_title.classList.add("mb-search-title")
    mb_search_title.classList.add("mb-search-title-link")
    mb_search_title.innerHTML = `Download tracks<br><span>${await songsLen} songs</span>`

    let songsLiked = doc.createElement("div")
    songsLiked.classList.add("mb-likedSongs-item")

    if (mbSongsLiked !== null) {
        input.addEventListener("input", () => {
            if (input.value !== "") {
                const searchText = input.value.toLowerCase();
                const filteredTracks = mbSongsLiked.filter(track =>
                    track.name.toLowerCase().includes(searchText) ||
                    track.artists[0].name.toLowerCase().includes(searchText) ||
                    track.album.name.toLowerCase().includes(searchText)
                );
                songsLiked.innerHTML = "";
                crtLiked(filteredTracks);
            } else {
                crtLiked(mbSongsLiked)
            }
        })


        async function crtLiked(arr) {
            mb_search_title.innerHTML = `Download tracks<br><span>${arr.length} songs</span>`
            songsLiked.innerHTML = ``
            for (let item of await arr) {
                let muzInt
                let lk_cont = doc.createElement("div")
                lk_cont.classList.add("lk-cont-item")
                lk_cont.classList.add("lk-cont-del")

                let divv = doc.createElement("div")
                divv.classList.add("lk-div-item")

                let lk_img = doc.createElement("img")
                lk_img.classList.add("lk-img-item")
                lk_img.src = item.album.images[0].url

                let lk_title_flex = doc.createElement("div")
                lk_title_flex.classList.add("lk-title-flex")
                lk_title_flex.innerHTML = `<p class="mb-itemName">${item.name}</p><span>${item.artists[0].name}</span>`
                clearInterval(muzInt)
                let lk_imgBtn = doc.createElement("div")
                let i = arr.indexOf(item)
                lk_imgBtn.classList.add("down_posmb")
                muzInt = setInterval(async () => {
                    let mbSongLiked = await downloadSongsList()
                    if (mbSongLiked[i].down_position === undefined || mbSongLiked[i] === null) {
                        mbSongLiked[i].down_position = 0
                        lk_imgBtn.innerHTML = mbSongLiked[i].down_position
                    } else {
                        lk_imgBtn.innerHTML = mbSongLiked[i].down_position
                    }

                    if(mbSongLiked[i].fullMuz) {
                        clearInterval(muzInt)
                        lk_imgBtn.classList.remove("down_posmb")
                        lk_imgBtn.classList.add("down_posmb-suc")
                        lk_imgBtn.innerHTML = `<i class='bx bxs-check-circle'></i>`
                        item.preview_url = mbSongLiked[i].fullMuz
                    }
                }, 1500);


                lk_cont.onclick = (e) => {
                    console.log(e);
                    if (e.target !== lk_imgBtn) {
                        let i = mbSongsLiked.indexOf(item)
                        nowPlayingMob(mbSongsLiked, i)
                    }
                }
                let timer

                lk_cont.addEventListener('touchstart', function () {
                    timer = setTimeout(function () {
                        lk_cont.remove()
                        axios.delete(url_liked + `downloads/` + item.id + `.json`)
                    }, 2000);
                });

                lk_cont.addEventListener('touchend', function () {
                    clearTimeout(timer);
                });


                divv.append(lk_img, lk_title_flex)
                lk_cont.appendChild(divv)
                lk_cont.appendChild(lk_imgBtn)
                songsLiked.appendChild(lk_cont)
            }
            proverkaPlaying(nowSongItem)

        }

        crtLiked(mbSongsLiked)
    } else {
        songsLiked.innerHTML = "<span class='yuqMuzon'>The tracks you like<br>will appear here<span>"
    }

    box_search_inp.appendChild(input)
    cont.appendChild(box_search_inp)
    cont.appendChild(mb_search_title)
    masic.appendChild(cont)
    masic.appendChild(songsLiked)

}


down_hide.onclick = () => {
    if (!down_hide.src.includes("gif") && !down_hide.src.includes("bll.svg")) {
        download(nowSongItem.id)
        alert(`Не перезагружайте страницу! Идет скачивание песни ${nowSongItem.name} 📥`)
        down_hide.src = "icons/down.gif"
        axios.post(url_liked + `downloads/${nowSongItem.id}.json`, nowSongItem, options)
            .then(response => console.log(response.data))
            .catch(error => console.error('Error:', error));
    }
}



async function ifdown_mb(item) {
    let items = await downloadSongsList()
    if (items !== null) {
        let searchLiked = items.find(i => i.id === item.id)
        if (searchLiked !== undefined) {
            down_hide.src = "./icons/bll.svg"
        } else {
            down_hide.src = "./icons/downloads.svg"
        }
    } else {
        down_hide.src = "./icons/downloads.svg"
    }
}
