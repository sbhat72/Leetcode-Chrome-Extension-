

document.addEventListener("DOMContentLoaded", () => {
    const screen = document.querySelector(".screen");

    const currentView = localStorage.getItem("currentView") || "questionPage";
    const currentAnswer = localStorage.getItem("currentAns") || "None";

      // --- Question Page Elements ---
     if (currentView === "chatPage") {
        showChatPage();
        if(currentAnswer != "None"){
            showResponse(currentAnswer);
        }
    }else{

    localStorage.setItem("currentView", "questionPage");
    
    // --- Question Page Elements ---
    screen.classList.add("activatePop");

    let LogoImg = document.createElement("img");
    LogoImg.src = "Images/Logo.png";
    LogoImg.classList.add("popupLogo");
    screen.appendChild(LogoImg);

    let IntroContent = document.createElement("h1");
    IntroContent.innerHTML = `
     Welcome to 
     <br>
    <span id="line1">Leetcode</span>
    <br>
    <span id="line2">Helper</span>
    `;
    IntroContent.classList.add("IntroText");
    IntroContent.classList.add("span");
    screen.appendChild(IntroContent);

    let inputBox = document.createElement("input");
    inputBox.placeholder = "Please enter the Leetcode question name :)"
    inputBox.type = "text";
    inputBox.classList.add("input");
    screen.appendChild(inputBox);

    let inputBoxlabel = document.createElement("label");
    inputBoxlabel.textContent = "Enter question below"
    inputBoxlabel.classList.add("boxLabel");
    screen.appendChild(inputBoxlabel);

    let SubmitButton = document.createElement("button");
    SubmitButton.textContent = "Submit";
    SubmitButton.classList.add("submitButton");
    screen.appendChild(SubmitButton);

    SubmitButton.addEventListener("click", async () => {
        const questionName = inputBox.value;
        screen.classList.replace("activatePop", "deactivatePop");

        screen.addEventListener("animationend", async () => {
            // Remove all question page elements
            screen.innerHTML = "";

            // Update view state
            localStorage.setItem("currentView", "chatPage");

            showChatPage();
            APIAnswer(questionName);
            // Fetch solution from backend
            

        } // Make sure this runs only once
    )});
    
    }
    
    async function APIAnswer(questionName){
        try {
                const response = await fetch("http://localhost:3000/leetcode", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ problem: `How to solve ${questionName} leetcode question. Give short pseudocode, specifically 1 line answers, to start` })
                });

                const result = await response.json();
                let message = await result.reply;
                console.log(message);
            
                showResponse(message);
                
            } catch (err) {
                console.error("Error fetching solution:", err);
            }

    }
    
    // --- CHAT PAGE FUNCTION ---
    function showChatPage() {
        screen.innerHTML = "";

        let inputBoxChat = document.createElement("input");
        inputBoxChat.placeholder = "Ask a question";
        inputBoxChat.type = "text";
        inputBoxChat.classList.add("inputBoxChat");
        screen.appendChild(inputBoxChat);

        let sendLogo = document.createElement("img");
        sendLogo.src = "Images/Send.svg";
        sendLogo.classList.add("sendImg");
        screen.appendChild(sendLogo);

        sendLogo.addEventListener("click", ()=>{
            APIAnswer(inputBoxChat.value);
        });
        
        let resetButton = document.createElement("img");
        resetButton.src = "Images/Back Button.svg";
        resetButton.classList.add("backButton");
        screen.appendChild(resetButton);

        resetButton.addEventListener("click", ()=>{
            localStorage.setItem("currentView", "questionPage");
            localStorage.setItem("currentAns", "None")
        });
           
    }

    function showResponse(result){
        localStorage.setItem("currentAns", result)
        const chatmessage = document.createElement("h3");
        chatmessage.innerHTML = `${result}`;
        chatmessage.classList.add("APIResponse");
        screen.appendChild(chatmessage);
        }

});

    