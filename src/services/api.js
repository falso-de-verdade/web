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

export {
    configure
}