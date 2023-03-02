let backarr = doc.querySelector(".backarr")
let nextarr = doc.querySelector(".nextarr")

let backarrStatus = false
let nextarrStatus = false


function addPlaylist(arr, title, playlistName) {
    let paren = doc.querySelector(".cont_playlist")

    let elemPlaylist = doc.createElement('div')
    elemPlaylist.classList.add('elem_playlist')
    paren.appendChild(elemPlaylist)

    let elemPlaylist_title = doc.createElement('div')
    elemPlaylist_title.classList.add('elem_playlist-title')
    elemPlaylist.appendChild(elemPlaylist_title)

    let elemPlaylist_p = doc.createElement("p")
    elemPlaylist_p.innerHTML = title
    elemPlaylist_title.appendChild(elemPlaylist_p)

    let elemPlaylist_span = doc.createElement("span")
    elemPlaylist_span.innerHTML = playlistName
    elemPlaylist_p.appendChild(elemPlaylist_span)

    let elemPlaylist_a = doc.createElement("a")
    elemPlaylist_a.innerHTML = 'See All'
    elemPlaylist_title.insertAdjacentElement('beforeend', elemPlaylist_a)


    let elemContainer = doc.createElement('div')
    elemContainer.classList.add('elem_container')
    elemPlaylist.insertAdjacentElement('beforeend', elemContainer)

    let elems = doc.createElement("div")
    elems.classList.add('elems')
    elemContainer.appendChild(elems)

    let btnControl_playlist = doc.createElement('div')
    btnControl_playlist.classList.add('btns_control-playlist')
    elemContainer.insertAdjacentElement('beforeend', btnControl_playlist)

    let elemButton_next = doc.createElement("div")
    elemButton_next.classList.add('elem_button-next')
    elemButton_next.innerHTML = '<div><img src="icons/next.svg" alt=""></div>'
    btnControl_playlist.appendChild(elemButton_next)

    let elemButton_prev = doc.createElement("div")
    elemButton_prev.classList.add('elem_button-prev')
    elemButton_prev.innerHTML = '<div><img src="icons/next.svg" alt=""></div>'
    btnControl_playlist.insertAdjacentElement('beforeend', elemButton_prev)




    let currentIndex = 0
    let seeAll = elemPlaylist_a
    let nextBTN = elemButton_next
    let prevBTN = elemButton_prev

    let elemsWidth = elems.clientWidth
    let blocksLen = Math.floor(elemsWidth / 170)
    elems.innerHTML = ''

    for (let item of arr.slice(currentIndex, currentIndex + blocksLen)) {
        let itemIMG = item.images[0].url;
        let itemNAME = item.name
        let itemDESCRIP = item.description


        createPlaylist(itemIMG, elems, itemNAME, itemDESCRIP)
    }

    if (blocksLen >= arr.length) {
        seeAll.style.display = "none";
        nextBTN.style.display = "none";
    } else if (blocksLen < arr.length) {
        seeAll.style.display = "flex";
        nextBTN.style.display = "flex";
    }

    nextBTN.onclick = () => {
        currentIndex += blocksLen;

        if (currentIndex >= arr.length) {
            currentIndex = 0;
        }

        elems.innerHTML = "";
        for (let item of arr.slice(currentIndex, currentIndex + blocksLen)) {
            let itemIMG = item.images[0].url;
            let itemNAME = item.name
            let itemDESCRIP = item.description

            createPlaylist(itemIMG, elems, itemNAME, itemDESCRIP)
        }

        if (currentIndex + blocksLen >= arr.length) {
            seeAll.style.display = "none";
            nextBTN.style.display = "none";
        } else {

            nextBTN.style.display = "flex";
        }
        prevBTN.style.display = "flex";
        seeAll.style.display = "flex";
    }


    prevBTN.onclick = () => {
        currentIndex -= blocksLen;

        if (currentIndex < 0) {
            currentIndex = arr.length - blocksLen;
        }

        elems.innerHTML = "";
        for (let item of arr.slice(currentIndex, currentIndex + blocksLen)) {
            let itemIMG = item.images[0].url;
            let itemNAME = item.name
            let itemDESCRIP = item.description


            createPlaylist(itemIMG, elems, itemNAME, itemDESCRIP)
        }

        if (currentIndex === 0) {
            prevBTN.style.display = "none";
        }

        seeAll.style.display = "flex";
        nextBTN.style.display = "flex";
    }



    let basic = doc.querySelector(".basic")


    elemPlaylist_a.onclick = () => {
        basic.innerHTML = ""
        backarrStatus = true
        let seeCont = doc.createElement("div")
        seeCont.classList.add("seeAll_cont")
        basic.appendChild(seeCont)

        let h1 = doc.createElement("h1")
        h1.innerHTML = `${title} <span>${playlistName}</span>`

        basic.insertAdjacentElement("afterbegin", h1)
        for (let item of arr) {
            let itemIMG = item.images[0].url;
            let itemNAME = item.name
            let itemDESCRIP = item.description


            createPlaylist(itemIMG, seeCont, itemNAME, itemDESCRIP)
        }

        backarr.onclick = () => {
           
            if (backarrStatus === true) {
                basic.innerHTML = home
                
                onResize()
                backarrStatus = false

            }
        }
    }

}

setInterval(() => {
    if (backarrStatus === true) {
        backarr.classList.add('activeStatus')
    } else {
        backarr.classList.remove('activeStatus')
        for (let i = 0; i < itemMenuBtn.length; i++) {
            const elem = itemMenuBtn[i];
            elem.classList.remove("item_menu-active")
        }
        itemMenuBtn[0].classList.add("item_menu-active")
        contINP.style.display = "none"
    }
}, 500);

let contPlaylist = doc.querySelector(".cont_playlist")
let throttleTimeout;
let loader = doc.querySelector(".loader")




function onResize() {
    if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
            throttleTimeout = null;
            contPlaylist.style.display = ""
            adaptive()
        }, 1000);
    }
}


function onResize2() {
    if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
            throttleTimeout = null;
            searching()
        }, 1000);
    }
}



setTimeout(() => {




    const element = document.querySelector(".home_Nav");
    const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
            const {
                target,
                contentRect
            } = entry;

            if (itemMenuBtn[0].classList.contains('item_menu-active')) {
                basic.innerHTML = home
                
                onResize();
            } else if(itemMenuBtn[1].classList.contains('item_menu-active')) {
                basic.innerHTML = search
                onResize2();
            }

        }
    });

    observer.observe(element);

}, 6000);
let basic = doc.querySelector(".basic")

function adaptive() {
    doc.querySelector(".cont_playlist").innerHTML = ""
    for (let i = 0; i < playlistsHome.length; i++) {
        const element = playlistsHome[i];
        addPlaylist(element, element.des, element.janr)
    }
}