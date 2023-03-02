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
    url: "https://open.spotify.com/playlist/37i9dQZF1E357sa1fCmEXd"
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
}]


// Ссылки для плейлистов Daily Mix из spotify

const clientId = '587ef39d30644f2496f1b79fc46d86dd';
const clientSecret = '86a77f2164eb4000a15bd2334c8e5f41';


// Берём токен c помощью clientId и clientSecret
const getToken = async () => {
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
    return data.access_token; // Токен для запросов
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
    if (lenUrl !== 7) {
        playlistLink = links[lenUrl = lenUrl + 1].url.split('/').pop()
        getPlaylist()
    } else {
        console.log('Загрузка завершена');
    }
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
    console.log(data.playlists);
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
    console.log(data.playlists);
    playlistsHome.push(data.playlists.items)
    data.playlists.items.janr = janr
    data.playlists.items.des = 'Your '


};

getPlaylist_phonk()








setTimeout(() => {
    mixs.des = 'Made For '
    mixs.janr = `AzIzbek RakhImov`
    playlistsHome.unshift(mixs)
}, 3000);

setTimeout(() => {
    adaptive()
    console.log(playlistsHome);
}, 6000);