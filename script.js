const quote =
"The quick brown fox jumps over the lazy dog.";

const input = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

let timeLeft = 60;
let timerStarted = false;
let timer;

input.addEventListener("input", () => {

    if(!timerStarted){
        startTimer();
        timerStarted = true;
    }

    calculateStats();
});

function startTimer(){

    timer = setInterval(() => {

        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if(timeLeft <= 0){
            clearInterval(timer);
            input.disabled = true;
        }

    },1000);
}

function calculateStats(){

    const typedText = input.value;

    const words = typedText.trim().split(/\s+/).length;

    const wpm = Math.round(words * (60 / (60 - timeLeft || 1)));
    wpmDisplay.textContent = wpm;

    let correct = 0;

    for(let i=0;i<typedText.length;i++){
        if(typedText[i] === quote[i]){
            correct++;
        }
    }

    const accuracy =
        typedText.length === 0
        ? 0
        : Math.round((correct / typedText.length) * 100);

    accuracyDisplay.textContent = accuracy;
}

function restartTest(){

    clearInterval(timer);

    timeLeft = 60;
    timerStarted = false;

    input.value = "";
    input.disabled = false;

    timeDisplay.textContent = 60;
    wpmDisplay.textContent = 0;
    accuracyDisplay.textContent = 0;
}