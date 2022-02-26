let now = new Date();
// distance to saturday
let distance = (6 + 7 - now.getDay()) % 7
// Saturday 3AM EST
let terminalStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + distance, 3, 0, 0);
// Saturday 4:05AM EST
let terminalEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + distance, 4, 5, 0);
let liveMode = false;

let radio = new Audio("https://stream.wrbbradio.org/");
let timer = null;
let timerDiv = null;

class Timer {
    constructor(callback, endDate) {
        this._endDate = endDate;
        let difference = endDate - Date.now();
        setTimeout(callback, difference);
    }

    display() {
        let rightNow    = Date.now();
        let distance    = this._endDate - rightNow;
        let days        = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours       = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes     = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds     = Math.floor((distance % (1000 * 60)) / 1000);

        let daysStr     = days.toString().padStart(2, '0');
        let hoursStr    = hours.toString().padStart(2, '0');
        let minutesStr  = minutes.toString().padStart(2, '0');
        let secondsStr  = seconds.toString().padStart(2, '0');

        return daysStr + ":" + hoursStr + ":" + minutesStr + ":" + secondsStr;
    }
}

const inDateRange = (testDate, startRange, endRange) => {
    return testDate > startRange && testDate < endRange;
}

const updateDatesNextWeek = () => {
    let now = new Date();
    terminalStart = new Date(now.getFullYear(), now.getMonth(), terminalStart.getDate() + 7, 3, 0, 0);
    // Saturday 4:05AM EST
    terminalEnd = new Date(now.getFullYear(), now.getMonth(), terminalEnd.getDate() + 7, 4, 5, 0);
}

const playAudio = () => {
    radio.play();
}

const stopAudio = () => {
    radio.stop();
}

const onTerminalStart = () => {
    playAudio();

}

const onPageLoad = () => {
    timerDiv = document.getElementById("timer");
    // this should constantly check while page is alive
    liveMode = inDateRange(Date.now(), terminalStart, terminalEnd);
    if (liveMode) {
        timer = null;
        timerDiv.innerText = "LIVE!!!!!!!";
        timerDiv.classList.add("rainbow");
        radio.play();
    } else {
        timer = new Timer(onTerminalStart, terminalStart);
    }

    setInterval(onTickSecond, 500);
}

const onTickSecond = () => {
    let inRange = inDateRange(Date.now(), terminalStart, terminalEnd);

    if (inRange && !liveMode) {
        liveMode = true;
        timer = null;
        timerDiv.innerText = "LIVE!!!!!!!";
        timerDiv.classList.add("rainbow");
        playAudio();
    } else if (!inRange && liveMode) {
        liveMode = false;
        recalculateDates(); // updates terminalStart and terminalEnd
        timer = new Timer(onTerminalStart, terminalStart);
        timerDiv.innerText = timer.display();
        stopAudio();
    } else if (!inRange) {
        if (timer != null) {
            timerDiv.innerText = timer.display();
        } else {
            console.log("something went terribly wrong with the timer.");
        }
    }
}

window.onload = onPageLoad;

// logic flow:
// we hit the page
// compute when we are
// if between hours of terminal music, render text as LIVE!!!!!! and begin play
// if not between hours of terminal music, render text as timer to next date and do not play

// every second, check if we are in terminal music -> begin playing, change text
// if we are not in terminal music -> stop playing, render audio
// ideally we want these functions to be idempodent