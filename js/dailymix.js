// Массив для плейлиста Daily Mix
let mixs = [];
let playlistsHome = []


// Ссылки для плейлистов Daily Mix из spotify
let lenUrl = 0
let links = [{
    url: "https://open.spotify.com/playlist/37i9dQZF1E36Q0yB2GxCUg"
}, {
    url: "https://open.spotify.com/playlist/37i9dQZF1E39MJ9OCofqvQ"
}, {
    url: "https://open.spotify.com/playlist/37i9dQZF1E35xee0yppVyS"
}, {
    url: "https://open.spotify.com/playlist/37i9dQZF1E38xIKalZaneH"
}, {
    url: "https://open.spotify.com/playlist/37i9dQZF1E37P5VtzOlPaX"
}, {
    url: "https://open.spotify.com/playlist/37i9dQZF1E38J5bsO76Py7"
}, {
    url: 'https://open.spotify.com/playlist/37i9dQZEVXbhTg9w8hSHdX'
}, {
    url: "https://open.spotify.com/playlist/37i9dQZEVXcK3dXIqfBEJd"
}, {
    url: "https://open.spotify.com/playlist/37i9dQZF1DX32NsLKyzScr"
}, {
    url: "https://open.spotify.com/playlist/37i9dQZEVXbMDoHDwVN2tF"
}]


// Ссылки для плейлистов Daily Mix из spotify

const clientId = '587ef39d30644f2496f1b79fc46d86dd';
const clientSecret = '86a77f2164eb4000a15bd2334c8e5f41';


// Берём токен c помощью clientId и clientSecret
let accessToken;

const getToken = async () => {
    if (accessToken) {
        return accessToken;
    }
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Accept-Language': 'en-US',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await result.json();
    accessToken = data.access_token;
    return accessToken; // Токен для запросов
};



let playlistLink = `${links[0].url.split('/').pop()}`
const getPlaylist = async () => {
    const accessToken = await getToken(); // Ожидаем ответ от токена
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistLink}`, {
        headers: {
            'Accept-Language': 'en-US',
            'Authorization': 'Bearer ' + accessToken
        }
    });
    const data = await response.json();
    mixs.push(data); // Отправляем ресурс в массив(mixs)
    searchTrackPreview()
};

const searchTrackPreview = async () => {
    if (lenUrl !== 9) {
        playlistLink = links[lenUrl = lenUrl + 1].url.split('/').pop()
        getPlaylist()
    } else {}
};

getPlaylist()


const getPlaylist_show = async () => {
    let janr = `Gaming`
    const accessToken = await getToken(); // Ожидаем ответ от токена

    const response = await fetch(`https://api.spotify.com/v1/search?q=${janr}*&type=playlist&limit=20&offset=0&`, {
        headers: {
            'Accept-Language': 'en-US',
            'Authorization': 'Bearer ' + accessToken
        }
    });

    const data = await response.json();
    playlistsHome.push(data.playlists.items)
    data.playlists.items.janr = 'Gaming'
    data.playlists.items.des = 'Playlist '

};

getPlaylist_show()



const getPlaylist_phonk = async () => {
    let janr = `Phonks`
    const accessToken = await getToken(); // Ожидаем ответ от токена

    const response = await fetch(`https://api.spotify.com/v1/search?q=${janr}*&type=playlist&limit=20&offset=0&`, {
        headers: {
            'Accept-Language': 'en-US',
            'Authorization': 'Bearer ' + accessToken
        }
    });

    const data = await response.json();
    playlistsHome.push(data.playlists.items)
    data.playlists.items.janr = janr
    data.playlists.items.des = 'Your '


};

getPlaylist_phonk()

async function tracksPlaylist(playlistId) {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return data;
}


async function tracksArtist(artistId) {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    const tracks = data.tracks.map(track => track);
    return tracks;
}


async function tracksAlbum(albumId) {
    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    const tracks = data.tracks.items.map(track => track);
    return tracks;
}


setTimeout(() => {
    mixs.des = 'Made For '
    mixs.janr = `AzIzbek RakhImov`
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        mixs.janr = user.name
    }
    playlistsHome.unshift(mixs)
}, 3000);

let start = setTimeout(() => {
    onResize()
}, 4500);