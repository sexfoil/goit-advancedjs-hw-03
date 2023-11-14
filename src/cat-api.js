import axios from 'axios';
axios.defaults.headers.common['x-api-key'] = "live_lRZEIkhbwtvfK1yPxtwtCkUy1ANlxpe35OrJl3neeWXcmXVdB9lEFrv8VKk1XIgE";

const url = {
    base: 'https://api.thecatapi.com',
    endpoint: {
        breed: '/v1/breeds',
        searchById: '/v1/images/search'
    }

}
function fetchUrl(url) {
    return axios.get(url)
        .then(resp => {
            if (resp.status !== 200) {
                return new Error(resp.statusText);
            }
            return resp.data;
        });
}

function getUrl(base, endpoint, params = '') {
    return `${base}${endpoint}${params}`;
}

export function fetchBreeds() {
    const breedsUrl = getUrl(url.base, url.endpoint.breed);
    return fetchUrl(breedsUrl);        
}

export function fetchCatByBreed(breedId) {
    const params = new URLSearchParams({
        breed_ids: breedId
    });
    const searchUrl = getUrl(url.base, url.endpoint.searchById, `?${params}`);
    return fetchUrl(searchUrl);
}