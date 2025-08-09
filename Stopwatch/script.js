let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
    const date = new Date(ms);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startStopBtn.textContent = 'Stop';
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        isRunning = false;
    }
}

function recordLap() {
    if (isRunning) {
        lapCounter++;
        const lapTime = formatTime(elapsedTime);
        const listItem = document.createElement('li');
        listItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.prepend(listItem);
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    lapCounter = 0;
    isRunning = false;
    startStopBtn.textContent = 'Start';
    updateDisplay();
    lapsList.innerHTML = '';
}

startStopBtn.addEventListener('click', startStopwatch);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', resetStopwatch);
