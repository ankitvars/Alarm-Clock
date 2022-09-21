// fetching the section where current time display
const displayTime = document.getElementById("clock");

// fetching the audio that will play on alarm time
const audio = new Audio(
  "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"
);
audio.loop = true;

// initializing alarm time values to be null
let alarmTime = null;
let alarmTimeout = null;

// fetching the list of upcoming alarm
const myList = document.querySelector("#myList");
// adding alarm set by user in list
const addAlarm = document.querySelector(".setAlarm");

const alarmList = []; // Stores all the alarms being set
// let count =1;

// creating a function using this update the time on clock with current time
function updateTime() {
  const date = new Date();

  const hours = formatTime(date.getHours());
  const minutes = formatTime(date.getMinutes());
  const seconds = formatTime(date.getSeconds());
  const now = `${hours}:${minutes}:${seconds}`;
  // const milliSeconds = formatTime(date.getMilliseconds());

  displayTime.innerText = `${hours} : ${minutes} : ${seconds}`;

  // checking that List of future alarms includes the current time --> "now"
  //  if true then ringing() is called and audio will play
  if (alarmList.includes(now)) {
    ringing(now);
    alert(`Hey! it's alarm time ${now}`);
  }
}

// Plays the alarm audio at correct time
function ringing(now) {
  audio.play();
  alert(`Hey! it is ${now}`);
}

// formating the time to be in double digit
function formatTime(time) {
  if (time < 10) {
    return "0" + time;
  }
  return time;
}

// stop alarm code
function clearAlarm() {
  audio.pause();
  if (alarmTimeout) {
    clearTimeout(alarmTimeout);
    alert("Alarm cleared");
  }
}

// removes the  particular alarm from the list and the webpage when "Delete Alarm" is clicked
myList.addEventListener("click", (e) => {
  console.log("removing element");
  if (e.target.classList.contains("deleteAlarm")) {
    e.target.parentElement.remove();
  }
});

// removing the specific alarm from the array when "Delete Alarm" is clicked
remove = (value) => {
  let newList = alarmList.filter((time) => time != value);
  alarmList.length = 0; // Clear contents
  alarmList.push.apply(alarmList, newList);

  console.log("newList", newList);
  console.log("alarmList", alarmList);
};

// Adding a new alarm to the upcoming list as a new list item
function showNewAlarm(newAlarm) {
  const html = `
  <li class = "list-item bg-light fs-5 p-1">        
      <span class="time">${newAlarm}</span>
      <button class="deleteAlarm time-control bg-danger text-light" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
  </li>`;
  myList.innerHTML += html;
}

//Setting the new alarm after user enter the time values
addAlarm.addEventListener("submit", (e) => {
  e.preventDefault();
  let new_h = formatTime(addAlarm.a_hour.value);
  if (new_h === "0") {
    new_h = "00";
  }
  let new_m = formatTime(addAlarm.a_min.value);
  if (new_m === "0") {
    new_m = "00";
  }
  let new_s = formatTime(addAlarm.a_sec.value);
  if (new_s === "0") {
    new_s = "00";
  }

  const newAlarm = `${new_h}:${new_m}:${new_s}`;

  // adding the new alarm to the future alarm or upcoming alarm array list
  if (isNaN(newAlarm)) {
    if (!alarmList.includes(newAlarm)) {
      alarmList.push(newAlarm);
      console.log(alarmList);
      console.log(alarmList.length);
      showNewAlarm(newAlarm);
      addAlarm.reset();
    } else {
      alert(`Alarm for ${newAlarm} is already set.`);
    }
  }
});

// we want to update time every second so setting interval and call the function after 1 second
setInterval(updateTime, 1000);
