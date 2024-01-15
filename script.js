let startTime;
let running = false;
let lapTimes = [];

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime();
        running = true;
        updateStopwatch();
    }
}

function pauseStopwatch() {
    running = false;
}

function resetStopwatch() {
    running = false;
    lapTimes = [];
    updateStopwatch();
    updateLapTimes();
}

function recordLapTime() {
    if (running) {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        lapTimes.push(formatTime(elapsedTime));
        startTime = currentTime;
        updateLapTimes();
    }
}

function updateStopwatch() {
    const currentTime = running ? new Date().getTime() : startTime;
    const elapsedTime = currentTime - startTime;
    document.getElementById('stopwatch').innerText = formatTime(elapsedTime);

    if (running) {
        setTimeout(updateStopwatch, 10);
    }
}

function updateLapTimes() {
    const lapTimesContainer = document.getElementById('lapTimes');
    lapTimesContainer.innerHTML = '<strong>Lap Times:</strong><br>';
    lapTimes.forEach((lapTime, index) => {
        lapTimesContainer.innerHTML += `Lap ${index + 1}: ${lapTime}<br>`;
    });
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millisecondsFormatted = Math.floor((milliseconds % 1000) / 10);

    return `${minutes}:${seconds.toString().padStart(2, '0')}:${millisecondsFormatted.toString().padStart(2, '0')}`;
}
