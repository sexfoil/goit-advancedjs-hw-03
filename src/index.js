import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const elements = {
    selectBreed: document.querySelector('.breed-select'),
    pLoader: document.querySelector('.loader'),
    divCatInfo: document.querySelector('.cat-info')
}

function fillCatsData(cats) {
    const selectDataHTML = cats.map(cat => {
        return `<option value="${cat.id}">${cat.name}</option>`;
    }).join('');

    elements.selectBreed.insertAdjacentHTML("afterbegin", selectDataHTML);
    setVisibility(elements.pLoader, false);
    setVisibility(elements.selectBreed, true);
}

function showSearchResult({ url, breeds: info } = cat) {
    const contentHTML = `
        <img class="image" src="${url}" alt="${info[0].name}" />
        <div class="text-info-block">
            <h2 class="breed-name">${info[0].name}</h2>
            <p class="description">${info[0].description}</p>
            <p><span class="temperament">Temperament:</span> ${info[0].temperament}</p>
        </div>
    `
    elements.divCatInfo.innerHTML = contentHTML;
    setVisibility(elements.pLoader, false);
    setVisibility(elements.selectBreed, true);
    setVisibility(elements.divCatInfo, true);
}

function showErrorMessage() {
    setVisibility(elements.pLoader, false);
    iziToast.show({
        message: "Oops! Something went wrong! Try reloading the page!",
        messageColor: 'white',
        backgroundColor: 'tomato',
        timeout: 4000,
        position: 'topCenter'
    });
}

function setVisibility(element, isVisible) {
    if (isVisible) {
        element.removeAttribute("hidden");
    } else {
        element.setAttribute("hidden", "");
    }
}

setVisibility(elements.divCatInfo, false);

fetchBreeds()
    .then(data => fillCatsData(data))
    .catch(err => showErrorMessage());

const onSelectChange = evt => {
    elements.divCatInfo.innerHTML = '';
    setVisibility(elements.pLoader, true);
    setVisibility(elements.selectBreed, false);
    setVisibility(elements.divCatInfo, false);

    fetchCatByBreed(evt.target.value)
        .then(data => showSearchResult(data[0]))
        .catch(err => showErrorMessage());
}

elements.selectBreed.addEventListener('change', onSelectChange);