import axios from 'axios';
axios.defaults.headers.common['x-api-key'] = "live_lRZEIkhbwtvfK1yPxtwtCkUy1ANlxpe35OrJl3neeWXcmXVdB9lEFrv8VKk1XIgE";


const BASE_URL = 'https://api.thecatapi.com';
const ENDPOINT_BREEDS = 'v1/breeds';
const ENDPOINT_IMG_SEARCH = 'v1/images/search';


function fetchUrl(url) {
    return axios.get(url)
        .then(resp => {
            if (resp.status >= 400) {
                return new Error(resp.statusText);
            }
            return resp.data;
        });
}

function getUrl(endpoint, params = '') {
    return `${BASE_URL}/${endpoint}${params}`;
}

export function fetchBreeds() {
    const breedsUrl = getUrl(ENDPOINT_BREEDS);
    return fetchUrl(breedsUrl);        
}

export function fetchCatByBreed(breedId) {
    const params = new URLSearchParams({
        breed_ids: breedId
    });
    const searchUrl = getUrl(ENDPOINT_IMG_SEARCH, `?${params}`);
    return fetchUrl(searchUrl);
}