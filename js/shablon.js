function createPlaylist(img, container, title, descrip) {
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


    elemItem.addEventListener("mouseover", function () {
        runPlaylist.style.opacity = 1
        runPlaylist.style.top = 108 + "px"
    })

    elemItem.addEventListener("mouseout", function () {
        runPlaylist.style.opacity = 0
        runPlaylist.style.top = 120 + "px"

    })
}



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



let search = `<div class="cont_playlist">
    <div class="loader">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
               </div></div>`



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
        input.value = itemNAME
    }
}

function browse(arr, inp) {
    basic.innerHTML = ""
    backarrStatus = true
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

    backarr.onclick = () => {
        if (backarrStatus === true) {
            basic.innerHTML = home
            onResize()
            backarrStatus = false
        }
    }
}