
async function download(id) {
    let downRaz = false
    const trackInfo = await axios.get(`https://api.soundloaders.com/spotify/track?url=https://open.spotify.com/track/${id}`, {
        headers: {
            "accept": "application/json, text/plain, */*",
            "authorization": "Basic bjZfLUg3eDJuc2VVcUhOcG9DY2FNS2dmOk5oVVA0NyFRc0NKeUhzSnhUblZtLkJWaw=="
        },
    });
    //console.log(trackInfo.data);
    const downloadResponse = await axios.post('https://api.soundloaders.com/download/track', {
        downloader: "spotify",
        metadata: trackInfo.data
    }, {
        headers: {
            "accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "authorization": "Basic bjZfLUg3eDJuc2VVcUhOcG9DY2FNS2dmOk5oVVA0NyFRc0NKeUhzSnhUblZtLkJWaw=="
        },
    });


    let izbranyItem
    let checkInterval = setInterval(async () => {

        let checkResponse = await axios.get(`https://api.soundloaders.com/download/check/${downloadResponse.data.id}?type=track`, {
            headers: {
                "accept": "application/json, text/plain, */*",
                "authorization": "Basic bjZfLUg3eDJuc2VVcUhOcG9DY2FNS2dmOk5oVVA0NyFRc0NKeUhzSnhUblZtLkJWaw=="
            },
        });


        let items = await downloadSongsList()
        if (items !== null) {
            for (let item of items) {
                if (item.name === checkResponse.data.data.metadata.name) {
                    izbranyItem = item
                    item.down_position = checkResponse.data.position;
                    axios.get(`${url_liked}downloads/${item.id}.json`, options)
                        .then(response => {
                            const existingItem = response.data;
                            const firstKey = Object.keys(response.data)[0];
                            const Position = response.data[firstKey];
                            downRaz = true
                            Position.down_position = checkResponse.data.position;
                            Position.DelD = false
                            axios.put(`${url_liked}downloads/${item.id}.json`, existingItem, options)
                        })
                        .catch(error => {
                            downRaz = false
                        });
                }
            }
        }


        let path = checkResponse.data.data.path;

        if (path !== undefined) {
            console.log(path);
            clearInterval(checkInterval);
            clear()
            clearInterval(checkInterval);
            let response = await axios.get(path, {
                responseType: 'blob',
            });
           if(downRaz) {
            downloadMusic(response.data, trackInfo.data.name, path)
           }
        } else if (path === undefined) {
            //console.log("bigzod aka bl*");
        }
    }, 2000);

    function clear() {
        clearInterval(checkInterval);
    }

    async function downloadMusic(dataurl, name, fullurl) {
        clearInterval(checkInterval);
        const url = window.URL.createObjectURL(dataurl);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Wepro ${name}`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        delete a;
        window.URL.revokeObjectURL(url);
        let items = await downloadSongsList()
        alert(`Песня ${izbranyItem.name} успешно скачалось! ✔️`)
        getDownTrue(items, izbranyItem, fullurl)
       
    }
}



let positions = {}

async function windowDownload() {
    downloading = true;
    let items = await downloadSongsList()
    basic.innerHTML = ""
    plhname = "Downloads"
    setCont.style.display = "none"
    contINP.style.display = "none"
    let playlistTracks = doc.createElement("div")
    playlistTracks.classList.add('home_Cont')
    let top_Cont = doc.createElement("div")
    top_Cont.classList.add('top_Cont')
    let muz_Cont = doc.createElement("div")
    muz_Cont.classList.add('muz_Cont')

    let trackslength
    if (items !== null) {
        trackslength = items.length
    } else {
        trackslength = 0
    }


    top_Cont.innerHTML = `
    <div class="top_Cont-info">
    <div class="top_Cont-info_img">
    <img class="typesList" style="background: linear-gradient(90deg, #1DB954 0%, #4DD4AC 100%);" src="icons/downloads.svg">
    </div>
    <div class="top_Cont-bottom">
    <span class="top_Cont-info-type">SONGS</span>
    <p>Downloads</p>
    <span class="top_Cont-info-info"><span class="tp">${MyName.lastElementChild.innerHTML} • ${trackslength} songs</span><span>
    </div></div>
    `



    if (items !== null) {
        let millisecond = 0
        for (let item of items) {
            millisecond = millisecond + item.duration_ms
        }

        let muzSettings = document.createElement('div');
        muzSettings.classList.add('muzSettings');
        muz_Cont.appendChild(muzSettings);

        let muzItems = doc.createElement("div")
        muzItems.classList.add("muzItems")
        muzItems.style.marginTop = "-30px"

        let itemMuz = doc.createElement("div")
        itemMuz.classList.add('itemMuz')
        itemMuz.style.paddingLeft = "54px"


        intervalId = setInterval(async () => {
            let items = await downloadSongsList()
            if (items !== null) {
                crtItem(items)
                itemMuz.innerHTML = ""
            } else {
                let muzInfos = document.createElement('div');
                muzInfos.classList.add('muzInfos_none');
                muzInfos.innerHTML = `
                Tracks you download will appear here
                `
                muz_Cont.innerHTML = ""
                muz_Cont.appendChild(muzInfos)
            }
        }, 2000);

        crtItem(items)
        async function crtItem(filtArr) {
            for (let item of filtArr) {

                let itemMuzCont = document.createElement("div");
                itemMuzCont.classList.add("itemMuz-cont");

                let songItemPlay = document.createElement("div");
                songItemPlay.classList.add("songItem_play");

                let songCont = document.createElement("div");
                songCont.classList.add("songCont");

                let songImage = document.createElement("img");
                if (item.album) {
                    songImage.src = item.album.images[2].url;
                } else {
                    songImage.src = "./img/downloadIcon.png";
                }
                songImage.style.animation = "none"

                let songDetails = document.createElement("div");

                let songName = document.createElement("p");
                songName.classList.add("sgname")
                songName.innerHTML = item.name;

                let songArtist = document.createElement("span");
                songArtist.innerHTML = item.artists[0].name;

                songDetails.append(songName, songArtist);
                songCont.append(songImage, songDetails);

                let progressDown = doc.createElement("div")
                progressDown.classList.add("down_result")



                if (!positions[item.id]) {
                    positions[item.id] = posItem(item)
                }


                let ps = posItem(item)
                let protentDown = positions[item.id]
                let protent = ((parseFloat(protentDown) - parseFloat(ps)) / parseFloat(protentDown)) * 100;
                // update addedBy value every 2 seconds
                if (!item.fullMuz) {
                    progressDown.style.width = protent + "%"
                    progressDown.style.backgroundColor = "white"
                } else {
                    console.log(protent);
                    if(!item.fullMuz) {
                    progressDown.style.width = protent + "%"
                    } else {progressDown.style.width = "100%"}
                    progressDown.style.backgroundColor = "#1DB954"
                }


                let songAlbum = document.createElement("div");
                songAlbum.classList.add("songDown_pos");
                songAlbum.innerHTML = `<div class="pos_num">${posItem(item)}</div><div class="down_progress">${progressDown.outerHTML}</div>`;

                // console.log(protent);
                //console.log(positions);
                let addedByElem = document.createElement("div");
                addedByElem.classList.add("addedBy");
                addedByElem.classList.add("addedBy_p0")
                // set initial addedBy value
                let awaitProsto = await posItem(item);
                console.log(awaitProsto);


                let setDownFlex = doc.createElement("div")
                setDownFlex.classList.add("setDownFlex")

                let playD = doc.createElement("img")
                playD.classList.add("playD")
                setDownFlex.appendChild(playD)
                // playD.src = './icons/Play.svg'


                let delD = doc.createElement("div")
                delD.classList.add("delD")
                setDownFlex.appendChild(delD)
                delD.innerHTML = "x"

                delD.onclick = () => {
                    itemMuzCont.remove()
                    axios.delete(url_liked + `downloads/` + item.id + `.json`)
                }

                if(nowName.innerHTML === item.name) {
                    playD.src = './icons/Pause.svg'
                } else {
                    playD.src = './icons/Play.svg'
                }

                let current
                if (item.fullMuz) {
                    progressDown.style.width = "100%"
                    item.preview_url = item.fullMuz
                    delD.style.opacity = 1
                    playD.onclick = () => {
                        item.preview_url = item.fullMuz
                        if(nowName.innerHTML !== item.name) {
                            nowPlaying(filtArr, filtArr.indexOf(item))
                            playPause()
                        } else {
                            playPause()
                        }
                    }
                   
                    progressDown.style.backgroundColor = "#1DB954"
                } else {
                    playD.style.opacity = 0.5
                }

                setInterval(() => {
                    if(nowAudio.paused === false && nowName.innerHTML === item.name) {
                        playD.src = './icons/Pause.svg'
                    } else {
                        playD.src = './icons/Play.svg'
                    }
                }, 100);

                addedByElem.appendChild(setDownFlex)

                let durationMuz = document.createElement("div");
                durationMuz.classList.add("duration");
                durationMuz.innerHTML = `${duration(item.duration_ms)}`;

                songItemPlay.append(songCont, songAlbum, addedByElem, durationMuz);
                itemMuzCont.append(songItemPlay);
                itemMuz.appendChild(itemMuzCont);


            }
        }


        let muzInfos = document.createElement('div');
        muzInfos.classList.add('muzInfos');
        muzInfos.innerHTML = `<div>
    <p>Title</p>
    <p>Position</p>
    <p>Settings</p>
    <p><i class="bx bx-time"></i></p>
    </div>`


        muzItems.appendChild(muzInfos)
        muzItems.appendChild(itemMuz)

        muz_Cont.appendChild(muzItems)

        homeNav.addEventListener("scroll", function () {
            if (muzInfos.offsetTop > 356) {
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
        Tracks you download will appear here
        `
        muz_Cont.appendChild(muzInfos)
    }

    playlistTracks.appendChild(top_Cont)
    playlistTracks.appendChild(muz_Cont)
    basic.appendChild(playlistTracks)
    playlistTracks.style.background = "url('img/down.jpg')";
    playlistTracks.style.backgroundSize = "120% 120%";
    headerScrollColor = "#fff"
    playlistHname.style.color = '#000';


    function posItem(item) {
        if (item.down_position) {
            return item.down_position
        } else return 0
    }
    downloading = false;
}



async function getDownTrue(items, izb, dataurl) {
    console.log(izb);
    if (items !== null) {
        for (let item of items) {
            if (item.name === izb.name) {
                console.log("wf,wwwwwwwwwwwwww" + item)
                axios.get(`${url_liked}downloads/${item.id}.json`, options)
                    .then(response => {
                        const existingItem = response.data;
                        console.log(dataurl);
                        const firstKey = Object.keys(response.data)[0];
                        const Position = response.data[firstKey];
                        Position.fullMuz = dataurl;
                        Position.PlayD = true;
                        Position.DelD = true;
                        axios.put(`${url_liked}downloads/${item.id}.json`, existingItem, options)
                            .then(response => {
                                console.log("Response from server:", response);
                            })
                            .catch(error => {
                                console.error(`Error updating item: ${error}`);
                            });
                    })
                    .catch(error => {
                        console.error(`Error getting item: ${error}`);
                    });
            }
        }
    }

}