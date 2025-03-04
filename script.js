let seconds = 0,
  minutes = 0,
  hours = 0;
let physSeconds = 0,
  physMinutes = 0,
  physHours = 0;
let interval = null;
let mode = "stopwatch"; // Can be "stopwatch" or "physical"

function updateTimerDisplay(h, m, s) {
  document.getElementById("timer").innerText = `${h < 10 ? "0" + h : h}:${
    m < 10 ? "0" + m : m
  }:${s < 10 ? "0" + s : s}`;
}

function startTimer() {
  if (interval) return; // Prevent multiple intervals

  interval = setInterval(() => {
    if (mode === "stopwatch") {
      seconds++;

      document.getElementById("status").innerText = "Focus"
      document.getElementById("status").style.backgroundColor = "#11f5bc7f";

      if (seconds >= 60) {
        minutes++;
        seconds = 0;
      }
      if (minutes >= 60) {
        hours++;
        minutes = 0;
      }
      updateTimerDisplay(hours, minutes, seconds);
    } else if (mode === "physical") {
      if (physSeconds <= 0) {
        clearInterval(interval);
        interval = null;
        return;
      }
      physSeconds--;
      let h = Math.floor(physSeconds / 3600);
      let m = Math.floor((physSeconds % 3600) / 60);
      let s = physSeconds % 60;
      updateTimerDisplay(h, m, s);
    }
  }, 1);
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  
  stopTimer();

  seconds = 0,
    minutes = 0,
    hours = 0;
  physSeconds = 0,
    physMinutes = 0,
    physHours = 0;
  interval = null;

  mode = "stopwatch"; // Can be "stopwatch" or "physical"
  document.getElementById("status").innerText = "Focus";
  document.getElementById("status").style.backgroundColor = "#11f5bc7f";
  if (mode === "stopwatch") {
    seconds = 0;
    minutes = 0;
    hours = 0;
  } else if (mode === "physical") {
    physSeconds = 0;
    physMinutes = 0;
    physHours = 0;
  }
  updateTimerDisplay(0, 0, 0);
}

function preparePhysicalActivityTimer() {
  stopTimer();
  mode = "physical";

  document.getElementById("status").innerText = "Physical";
  document.getElementById("status").style.backgroundColor = "red";

  let elapsedMinutes = hours * 60 + minutes + (seconds >= 43 ? 1 : 0);
  let physicalActivityDuration = Math.min(elapsedMinutes * 0.4, 36);
  physSeconds = Math.floor(physicalActivityDuration * 60);

  let h = Math.floor(physSeconds / 3600);
  let m = Math.floor((physSeconds % 3600) / 60);
  let s = physSeconds % 60;

  updateTimerDisplay(h, m, s);
}

document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("stopButton").addEventListener("click", stopTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);
document.getElementById("physButton").addEventListener("click", preparePhysicalActivityTimer);
