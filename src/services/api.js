const axios = require('axios');

const configure = alert => {
    // define the api url
    const apiUrl = process.env.REACT_APP_BACKEND_API;

    // ensure we got something
    if (!apiUrl) {
        throw new Error('Missing REACT_APP_BACKEND_API environment variable.')
    }

    axios.defaults.baseURL = apiUrl;
    axios.interceptors.request.use(onRequest, 
                                   withErrHandler(alert, onRequestErr));
    axios.interceptors.response.use(onResponse, 
                                    withErrHandler(alert, onResponseErr));
}

const withErrHandler = (alert, handler) => {
    return error => {
        console.log(error);
        if (!handler(alert, error)) {
            // return Promise.reject(error);
        }
    }
}

const onRequest = request => {
    return request;
}

const onRequestErr = (alert, error) => {
    // alert.show('error', {
    //     type: 'danger'
    // })
}

const onResponse = response => {
    return response;
}

const onResponseErr = (alert, error) => {
    // alert.show('error')
}

async function send(config, { parseItems = true, isItem = false }) {
    const promise = axios(config);
    if (!parseItems) {
        return promise;
    }

    const response = await promise;
    if (response) {
        if (isItem) {
            return response.data;
        }

        return response.data._items;
    }
}

export {
    configure,
    send,
}