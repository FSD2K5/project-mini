let time = new Date("2023-01-29 00:00:00").getTime();
const comingSoon = document.querySelector(".time");

function updateCurrentTime() {
    setInterval(() => {
        let currentTime = Date.now();
        let timeRemaining = time - currentTime;
        renderTime(timeRemaining);
    }, 1000);
}
function handleTime(time) {
    if (time < 10) {
        return `0${time}`;
    } else {
        return time;
    }
}

// 1s =  1000ms
// 1m = 1000 * 60 ms
// 1h = 1000 * 60 * 60 ms
// 1d = 1000 * 60 * 60 * 24 ms

function renderTime(time) {
    let d = Math.floor(time / (1000 * 60 * 60 * 24));
    let h = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let m = Math.floor(((time % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) / (1000 * 60));
    let s = Math.floor((((time % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) % (1000 * 60)) / 1000);
    comingSoon.textContent = `${handleTime(d)}d:${handleTime(h)}h:${handleTime(m)}m:${handleTime(s)}s`;
}

updateCurrentTime();
