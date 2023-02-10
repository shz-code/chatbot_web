let micToggle = document.getElementById("mic_toggle"),
        micMsg = document.querySelector(".mic_msg"),
        micWarning = document.querySelector(".mic_warning");

        let transcript = "";

        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        const recognition = new SpeechRecognition();
        recognition.interimResults = false;


        recognition.onstart = () => {
            micToggle.classList.remove("bx-microphone");
            micToggle.classList.add("bx-microphone-off");
            micMsg.innerHTML = "Click here to Turn off Microphone";
            micWarning.innerHTML = `Currently Listning 
                <i class='bx bxs-microphone bx-flashing' ></i>`;
        };

        recognition.addEventListener('result', e => {
            transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
                chatFetch(transcript)
        })

        recognition.onend = () => {
            micToggle.classList.remove("bx-microphone-off");
            micToggle.classList.add("bx-microphone");    
            micMsg.innerHTML = "Click here to Turn on Microphone";
            micWarning.innerHTML = "";
        };

        recognition.onError = () => {
            micToggle.classList.remove("bx-microphone-off");
            micToggle.classList.add("bx-microphone");    
            micMsg.innerHTML = "Click here to Turn on Microphone";
            micWarning.innerHTML = "An Error with microphone";
        };
        
        
        micToggle.addEventListener("click", async()=>{
            if(micToggle.classList.contains("bx-microphone"))
            {
                recognition.start();
            }
            else{
                recognition.stop();
            }
        });