let seconds = 0,
  minutes = 0,
  hours = 0;
let physSeconds = 0,
  physMinutes = 0,
  physHours = 0;
let interval = null;
let mode = "stopwatch"; // Can be "stopwatch" or "physical"
let startTime = 0;

function updateTimerDisplay(h, m, s) {
  document.getElementById("timer").innerText = `${h < 10 ? "0" + h : h}:${
    m < 10 ? "0" + m : m
  }:${s < 10 ? "0" + s : s}`;
}

function startTimer() {
  if (interval) return; // Prevent multiple intervals

  startTime =
    performance.now() - (seconds * 1000 + minutes * 60000 + hours * 3600000);

  interval = setInterval(() => {
    let elapsedTime = Math.floor((performance.now() - startTime) / 1000);

    if (mode === "stopwatch") {
      hours = Math.floor(elapsedTime / 3600);
      minutes = Math.floor((elapsedTime % 3600) / 60);
      seconds = elapsedTime % 60;
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
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  minutes = 0;
  hours = 0;
  physSeconds = 0;
  physMinutes = 0;
  physHours = 0;
  mode = "stopwatch";
  document.getElementById("status").innerText = "Focus";
  document.getElementById("status").style.backgroundColor = "#11f5bc7f";
  updateTimerDisplay(0, 0, 0);
}

function preparePhysicalActivityTimer() {
  stopTimer();
  mode = "physical";

  document.getElementById("status").innerText = "Physical";
  document.getElementById("status").style.backgroundColor = "red";

  let elapsedMinutes = hours * 60 + minutes + (seconds >= 43 ? 1 : 0);
  let physicalActivityDuration = Math.min(elapsedMinutes * 0.3, 36);
  physSeconds = Math.floor(physicalActivityDuration * 60);

  let h = Math.floor(physSeconds / 3600);
  let m = Math.floor((physSeconds % 3600) / 60);
  let s = physSeconds % 60;
  updateTimerDisplay(h, m, s);
}

document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("stopButton").addEventListener("click", stopTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);
document
  .getElementById("physButton")
  .addEventListener("click", preparePhysicalActivityTimer);
