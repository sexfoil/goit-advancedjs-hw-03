import SlimSelect from 'slim-select';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const slimSelectSettings = {
    showSearch: false,
    placeholderText: "Select cat's breed"
}

const slimSelectEvent = {
    afterChange: onSelectChange
}

const elements = {
    selectWraper: document.querySelector('.select-wraper'),
    selectBreed: new SlimSelect({
        select: '.breed-select',
        settings: slimSelectSettings,
        events: slimSelectEvent
    }),
    pLoader: document.querySelector('.loader'),
    divCatInfo: document.querySelector('.cat-info')
}

function fillCatsData(cats) {

    const breedsData = [{
        placeholder: true,
        text: "Select cat's breed"
    }];
    
    cats.forEach(cat => breedsData.push({
            text: `${cat.name}`,
            value: `${cat.id}`
        })
    );
    
    elements.selectBreed.setData(breedsData);

    setVisibility(elements.pLoader, false);
    setVisibility(elements.selectWraper, true);
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
    setVisibility(elements.selectWraper, true);
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

setVisibility(elements.selectWraper, false);
setVisibility(elements.divCatInfo, false);

fetchBreeds()
    .then(data => fillCatsData(data))
    .catch(err => showErrorMessage());

function onSelectChange(values) {
    if (!values[0].placeholder) {
        setVisibility(elements.pLoader, true);
        setVisibility(elements.divCatInfo, false);
        elements.divCatInfo.innerHTML = '';

        fetchCatByBreed(values[0].value)
            .then(data => showSearchResult(data[0]))
            .catch(err => showErrorMessage());
    }    
}
