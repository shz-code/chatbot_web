let chatForm = document.getElementById("chat_form"),
prevChats = document.querySelector(".prev_chats"),
inp = document.querySelector('#input_box'),
speakerToggles = document.querySelectorAll(".speaker_toggle");

const url = '/bot_response/',
csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value;

let username = "",
temp_response = "";

if(localStorage.getItem("user") === null)
{
    username = prompt("What is your name?");
    localStorage.setItem("user",username);
}
else username = localStorage.getItem("user");
document.querySelector(".user_welcome").innerHTML = `Welcome ${username.toUpperCase()}`
document.querySelector(".greetings").innerHTML = `Hi ${username.toUpperCase()}. I am an under development chatbot of CSE depertment of IUBAT.` 

const chatInsert = (type,msg) =>{
    let div = document.createElement("div"),
    p = document.createElement("p");
    div.setAttribute("class",type);
    if(type === 'bot')
    {
        p.innerHTML = `<span class="message">${msg}</span> <i class='bx bx-volume-mute speaker_toggle' onclick="bot_speak()"></i>`;
    }
    else p.innerHTML = `<span class="message">${msg}</span>`;
    div.append(p)
    prevChats.append(div);
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
        body:JSON.stringify({'msg' : msg,'username' : username})
        })
        .then(async(response) => {
            let res = await response.json();
            chatInsert('bot',res.msg);
            temp_response = res.msg;
        })
        .catch(err => {
            console.log(err)
        })
}

chatForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(inp.value.length > 0) chatFetch(inp.value);
})

const bot_speak = () =>{
    let cnt = document.querySelectorAll(".speaker_toggle").length,
    toggleSpeak = document.querySelectorAll(".speaker_toggle")[cnt-1];
    response = toggleSpeak.parentElement.querySelector(".message").innerHTML;

    let speech = new SpeechSynthesisUtterance(response);

    if(toggleSpeak.classList.contains("bx-volume-mute"))
    {
        toggleSpeak.classList.remove("bx-volume-mute");
        toggleSpeak.classList.add("bx-volume-full");
        speechSynthesis.speak(speech);
    }
    else{
        toggleSpeak.classList.add("bx-volume-mute");
        toggleSpeak.classList.remove("bx-volume-full");
    }
    
}