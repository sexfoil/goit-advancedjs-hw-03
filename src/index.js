import { fetchBreeds, fetchCatByBreed } from './cat-api';

const elements = {
    selectBreed: document.querySelector('.breed-select'),
    pLoader: document.querySelector('.loader'),
    pError: document.querySelector('.error'),
    divCatInfo: document.querySelector('.cat-info')
}

function fillCatsData(cats) {
    const selectDataHTML = cats.map(cat => {
        return `<option value="${cat.id}">${cat.name}</option>`;
    }).join('');

    elements.selectBreed.insertAdjacentHTML("afterbegin", selectDataHTML);
}

function showSearchResult({ url, breeds: info } = cat) {
    const contentHTML = `
        <img src="${url}" alt="${info[0].name}" width="400" />
        <h2>${info[0].name}</h2>
        <p>${info[0].description}</p>
        <p>Temperament: ${info[0].name}</p>
    `
    elements.divCatInfo.insertAdjacentHTML("afterbegin", contentHTML);
}

fetchBreeds()
    .then(data => fillCatsData(data))
    .catch(err => console.log(err));

const onSelectChange = evt => {
    fetchCatByBreed(evt.target.value)
        .then(data => showSearchResult(data[0]))
        .catch(err => console.log(err));
}

elements.selectBreed.addEventListener('change', onSelectChange);