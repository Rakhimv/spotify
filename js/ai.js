// AI модель GPT-3.5 OPENAI
function GPT35(item) {
    // Команда AI
    let cmd = `Помни тебя зовут ${item.firstName} и твоя фамилия ${item.lastName}
    если я спрошу как тебя зовутотвечай по своей имени (${item.firstName}) если я 
    задам другой вопрос не надо упоминать как тебя зовут!!! Итак слушай вопрос: `

    // Отправка запроса AI
    let dta = {
        'content': cmd + inpAi.value + "\n",
        'role': "user"
    }

    // Данные ai
    const apiKey = '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';
    const prompt = inpAi.value
    const model = 'gpt-3.5-turbo';
    const apiUrl = `https://api.openai.com/v1/chat/completions`;
    const seting = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer sess-E2QVkDBBqk85ypzVaKeFF4nHab7lkx6Ov4wZQjKp`
        }
    };



    const data = {
        'frequency_penalty': 0,
        'messages': [dta],
        'max_tokens': 400,
        'model': "gpt-3.5-turbo",
        'presence_penalty': 0.6,
        'stream': true,
        'temperature': 0.9,
        'top_p': 1
    };

    aiLastSeen.classList.add("typed")
    aiLastSeen.innerHTML = "typing"
    let tochki = "."
    let typing = setInterval(() => {
        if (tochki === "...") {
            tochki = ""
        }
        aiLastSeen.innerHTML = `typing${tochki = tochki + "."}`
    }, 500);
    axios.post(apiUrl, data, seting)
        .then(res => {
            const regex = /"content":".+"}/g;
            let psk = res.data.match(regex)
            let text2 = psk.map(item => item.match(/"content":"(.+?)"/)[1]).join('');
            let text = text2.replace(/\n/g, "<br>").replace(/\\/g, "");
            smsAi(text)

            clearInterval(typing)
            aiLastSeen.innerHTML = "Online"

            setTimeout(() => {
                aiLastSeen.innerHTML = "last seen recently"
                aiLastSeen.classList.remove("typed")
            }, 2000);

            let roleAi = {
                role: "assistant",
                content: text
            }
            axios.post(`${url_liked}frineds/-NQveaASJXUVUaryvbmn/${item.index}/smsbox.json`, roleAi, options)
        })
        .catch(error => console.error(error));
}



// AI модель text-davinci-003 OPENAI
function textDavinciAi(inp) {
    aiLastSeen.classList.add("typed")
    aiLastSeen.innerHTML = "typing"
    let tochki = "."
    let typing = setInterval(() => {
        if (tochki === "...") {
            tochki = ""
        }
        aiLastSeen.innerHTML = `typing${tochki = tochki + "."}`
    }, 500);
    const apiKey = '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';
    const prompt = inp.value
    const model = 'text-davinci-003';
    const apiUrl = `https://api.openai.com/v1/engines/${model}/completions`;
    console.log(inp.value);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    };

    const data = {
        'prompt':prompt,
        'max_tokens': 1065,
        'temperature': 0.7,
        'n': 1,
        'stop': '',
    };

    fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const message = data.choices[0].text;

            let message2 = message.replace(/\n/g, "").replace(/\\/g, "");
            smsAi(message2)

            clearInterval(typing)
            aiLastSeen.innerHTML = "Online"

            setTimeout(() => {
                aiLastSeen.innerHTML = "last seen recently"
                aiLastSeen.classList.remove("typed")
            }, 2000);

            let roleAi = {
                role: "assistant",
                content: message2
            }
            axios.post(`${url_liked}frineds/-NQveaASJXUVUaryvbmn/${itemG.index}/smsbox.json`, roleAi, options)
        })
        .catch(error => console.error(error));
}