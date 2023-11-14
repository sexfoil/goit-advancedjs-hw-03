const DISABLED = "disabled";

const elements = {
    startBtn: document.querySelector("button[data-start]"),
    stopBtn: document.querySelector("button[data-stop]")
}

const ids = {
    interval: {
        body: -1
    }
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function isButtonActive(button) {
    return !button.hasAttribute(DISABLED);
}

function switchButtonsActivity({ startBtn, stopBtn }) {
    if (isButtonActive(stopBtn)) {
        stopBtn.setAttribute(DISABLED, "");
        startBtn.removeAttribute(DISABLED);
    } else {
        startBtn.setAttribute(DISABLED, "");
        stopBtn.removeAttribute(DISABLED);
    }    
}

elements.stopBtn.setAttribute(DISABLED, "");
let intervalId;

const onStartBtnClick = () => {
    if (isButtonActive(elements.startBtn)) {
        ids.interval.body = setInterval(
            () => document.querySelector("body").style.backgroundColor = getRandomHexColor(),
            1000
        );
        switchButtonsActivity(elements);
    }
}

const onStopBtnClick = () => {
    if (isButtonActive(elements.stopBtn)) {
        clearInterval(ids.interval.body);
        switchButtonsActivity(elements);
    }
}

elements.startBtn.addEventListener("click", onStartBtnClick);
elements.stopBtn.addEventListener("click", onStopBtnClick);
