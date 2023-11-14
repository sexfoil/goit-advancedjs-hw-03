import flatpickr from "flatpickr";
import iziToast from "izitoast";

import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";


const DISABLED = "disabled";
let userInputTime;
let remainingTime;
let timerIntervalId;

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

const elements = {
    dateTextInput: document.querySelector("#datetime-picker"),
    startBtn: document.querySelector("button[data-start]"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]")
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userInputTime = selectedDates[0].getTime();
        if (userInputTime > new Date()) {
            setElementActivity(elements.startBtn, true);
            remainingTime = userInputTime - new Date();            
        } else {
            showAlert('Please choose a date in the future');            
        }
    }
};

function showAlert(messageText) {
    iziToast.show({
        title: '⛔',
        message: messageText,
        messageColor: 'white',
        backgroundColor: 'tomato',
        timeout: 3000,
        position: 'topCenter'
    });
}

function setElementActivity(element, isTurningOn) {
    if (isTurningOn) {
        element.removeAttribute(DISABLED);
    } else {
        element.setAttribute(DISABLED, "");
    }
}

function updateElementValue(element, value) {
    element.textContent = String(value).padStart(2, '0');
}

function updateTimerView({ days, hours, minutes, seconds }) {
    updateElementValue(elements.days, days);
    updateElementValue(elements.hours, hours);
    updateElementValue(elements.minutes, minutes);
    updateElementValue(elements.seconds, seconds);
}

function stopTimer() {
    clearInterval(timerIntervalId);    
}

const updateTimer = () => {    
    const time = convertMs(remainingTime);
    updateTimerView(time);
    remainingTime -= 1000;
    if (remainingTime <= 0) {
        stopTimer();
        setElementActivity(elements.dateTextInput, true);
    }
}


setElementActivity(elements.startBtn, false);
const fp = flatpickr(elements.dateTextInput, options);

const onStartBtnClick = () => {
    if (userInputTime > new Date()) {
        timerIntervalId = setInterval(updateTimer, 1000);
    } else {
        showAlert('Choosen date is out, set another date in the future');
    }    
    setElementActivity(elements.startBtn, false);
    setElementActivity(elements.dateTextInput, false);
}

elements.startBtn.addEventListener("click", onStartBtnClick);

