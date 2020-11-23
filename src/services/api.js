const axios = require('axios');

const configure = () => {
    // define the api url
    const apiUrl = process.env.REACT_APP_BACKEND_API;

    // ensure we got something
    if (!apiUrl) {
        throw new Error('Missing REACT_APP_BACKEND_API environment variable.')
    }

    axios.defaults.baseURL = apiUrl;
}

async function send(config, parseItems = true) {
    const promise = axios(config);
    if (!parseItems) {
        return promise;
    }

    const response = await promise;
    return response.data._items;
}

export {
    configure,
    send,
}