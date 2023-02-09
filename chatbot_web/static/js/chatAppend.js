let chatForm = document.getElementById("chat_form"),
prevChats = document.querySelector(".prev_chats"),
inp = document.querySelector('#input_box');
const url = '/bot_response/';
const csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value;

const chatInsert = (type,msg) =>{
    let div = document.createElement("div"),
    p = document.createElement("p");
    div.setAttribute("class",type);
    p.innerHTML = msg;
    div.append(p)
    prevChats.append(div);
    if(type === 'bot')
    {
        let speech = new SpeechSynthesisUtterance(msg);
        speechSynthesis.speak(speech);
    }
    inp.value = "";
}

const chatFetch = (msg) =>{
    chatInsert('user',msg)
    fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json',
            'X-CSRFToken' : csrf,
        },
        body:JSON.stringify({'msg' : msg})
        })
        .then(async(response) => {
            let res = await response.json();
            chatInsert('bot',res.msg);
        })
        .catch(err => {
            console.log(err)
        })
}

chatForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(inp.value.length > 0) chatFetch(inp.value);
})