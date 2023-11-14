import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});        
      } else {
        reject({position, delay});        
      }
    }, delay);
  });

  return promise;
}

function getValidationMessage(name, value) {
  return `'${name}' must be not empty and more than ${value}!`;
} 

const DISABLED = "disabled";
const elements = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  button: document.querySelector('button')
}

function showValidationAlert(message) {
    iziToast.show({
        title: '⛔',
        message: message,
        messageColor: 'white',
        backgroundColor: 'red',
        timeout: 5000,
        position: 'center'
    });
}

function showPromiseAlert(message, backgroundColor) {
  iziToast.show({
      message: message,
      backgroundColor: backgroundColor,
      position: 'topRight'
  });
}

function isInputValid({ delay, step, amount }) {
  let errorMessage = "";

  if (!delay || delay < 0) {
    errorMessage += getValidationMessage("delay", -1) + "<br>"
  }
  
  if (!step || step < 0) {
    errorMessage += getValidationMessage("step", -1) + "<br>"
  }
  
  if (!amount || amount <= 0) {
    errorMessage += getValidationMessage("amount", 0) + "<br>"
  }
  
  if (errorMessage.length === 0) {
    return true;
  } else {
    showValidationAlert(errorMessage);
    return false;
  }
}

function cleanUserInput() {
  elements.delay.value = '';
  elements.step.value = '';
  elements.amount.value = '';
}

function temporaryDisableCreateBtn() {
  const btn = elements.button;
  const time = Number(elements.delay.value) + Number(elements.step.value) * Number(elements.amount.value);
  console.log(time);
  btn.setAttribute(DISABLED, "");
  setTimeout(() => {
    btn.removeAttribute(DISABLED);
  }, time);
}

const onButtonClick = (evt) => {
  evt.preventDefault();
  
  const userInput = {
    delay: elements.delay.value,
    step: elements.step.value,
    amount: elements.amount.value
  }

  if (isInputValid(userInput)) {
    temporaryDisableCreateBtn();
    cleanUserInput();

    for (let position = 1; position <= Number(userInput.amount); position += 1) {
      const delay = Number(userInput.delay) + (position - 1) * Number(userInput.step);
      createPromise(position, delay)
        .then(({ position, delay }) => {
          showPromiseAlert(`✅ Fulfilled promise ${position} in ${delay}ms`, 'lime');
        })
        .catch(({ position, delay }) => {
          showPromiseAlert(`❌ Rejected promise ${position} in ${delay}ms`, 'tomato');
        });
    }
  }
}

elements.button.addEventListener('click', onButtonClick);
