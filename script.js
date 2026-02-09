// --- CONFIGURATION ---
const CORRECT_PASSWORD = "love"; 

// --- QUIZ DATA ---
const quizData = [
    {
        question: "Ajke ki bar?",
        options: ["Bolbo na", "Janina", "Sombar", "Robibar"]
    },
    {
        question: "Ekhon ki korchis?",
        options: ["Kichuna", "Bose achi", "Porchi", "Reels dekhchi"]
    },
    {
        question: "Amake koto ta bhalobasis?😁",
        options: ["Olpo", "Bhalo basiy na", "Onekk", "Prochur....💗♾️"]
    },
    {
        question: "Rag korchis?",
        options: ["Bolbo na", "Janina", "Hmm", "Ekdomy na"]
    },
    {
        question: "Birokti Hochhis?",
        options: ["Bolbo na", "Janina", "Hmm", "Ekdomy na"]
    },
    {
        question: "Ami kemon?",
        options: ["Faltu", "Khub faltu 😤", "Thikthak 😐", "Khub bhalo ❤️"]
    }


];
// --- DOM ELEMENTS ---
const loginScreen = document.getElementById("login-screen");
const quizScreen = document.getElementById("quiz-screen");
const permissionScreen = document.getElementById("permission-screen");
const proposalScreen = document.getElementById("proposal-screen");
const toast = document.getElementById("toast");

const nameInput = document.getElementById("nameInput");
const passInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");
const errorMsg = document.getElementById("error-msg");
const greetingMsg = document.getElementById("greeting-msg");

const quizQuestion = document.getElementById("quiz-question");
const optionContainer = document.getElementById("option-container");
const progress = document.getElementById("progress");

const permissionYes = document.getElementById("permissionYes");
const permissionNo = document.getElementById("permissionNo");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");
const gif = document.getElementById("gif");
const messageBox = document.getElementById("message-box");

// --- 1. LOGIN LOGIC ---
loginBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const password = passInput.value.trim().toLowerCase();

    if (name === "") {
        errorMsg.innerText = "Please tell me your name! 🥺";
        return;
    }

    if (password === CORRECT_PASSWORD) {
        errorMsg.innerText = "";
        greetingMsg.innerText = `Hello, ${name}! ❤️`;
        changeScreen(loginScreen, quizScreen);
        loadQuiz();
    } else {
        errorMsg.innerText = "Wrong password! Hint: love";
    }
});

// --- 2. QUIZ LOGIC ---
let currentQuiz = 0;

function loadQuiz() {
    const currentData = quizData[currentQuiz];
    quizQuestion.innerText = currentData.question;
    progress.innerText = `Level ${currentQuiz + 1}/${quizData.length}`;
    
    optionContainer.innerHTML = "";
    currentData.options.forEach((option) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("quiz-btn");
        button.addEventListener("click", () => handleAnswer());
        optionContainer.appendChild(button);
    });
}

function handleAnswer() {
    let msg = "";
    if (currentQuiz === quizData.length - 1) {
        msg = "Achhaaaaaaaa 😏❤️🙈";
    } else {
        msg = "Achha";
    }
    showToast(msg);
    setTimeout(() => {
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            changeScreen(quizScreen, permissionScreen);
        }
    }, 1500);
}

function showToast(message) {
    toast.innerText = message;
    toast.className = "show";
    setTimeout(() => { 
        toast.className = toast.className.replace("show", ""); 
    }, 1400);
}

// --- 3. PERMISSION & PROPOSAL LOGIC ---
permissionYes.addEventListener("click", () => {
    changeScreen(permissionScreen, proposalScreen);
});

yesBtn.addEventListener("click", () => {
    question.innerHTML = "Yay! I love you! ❤️";
    gif.src = "https://media.giphy.com/media/T86i6yDyOYz7J6dPhf/giphy.gif";
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    greetingMsg.style.display = "none";
    messageBox.style.display = "block";
    if (typeof confetti === "function") {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
});

// --- RUNAWAY BUTTON LOGIC (Fixed for Default Position) ---
function setupRunawayButton(btn) {
    const moveBtn = () => {
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        const btnWidth = btn.offsetWidth;
        const btnHeight = btn.offsetHeight;
        
        const maxLeft = containerWidth - btnWidth - 20;
        const maxTop = containerHeight - btnHeight - 20;
        
        const randomX = Math.max(10, Math.random() * maxLeft);
        const randomY = Math.max(10, Math.random() * maxTop);
        
        // This makes it break out of the flex layout and jump
        btn.style.position = "fixed"; 
        btn.style.left = randomX + "px";
        btn.style.top = randomY + "px";
    };
    
    btn.addEventListener("mouseover", moveBtn);
    btn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        moveBtn();
    });
}

setupRunawayButton(permissionNo);
setupRunawayButton(noBtn);

// --- HELPER FUNCTIONS ---
function changeScreen(hideScreen, showScreen) {
    hideScreen.style.opacity = "0";
    setTimeout(() => {
        hideScreen.classList.add("hidden");
        showScreen.classList.remove("hidden");
        showScreen.style.opacity = "1";
    }, 500);
}