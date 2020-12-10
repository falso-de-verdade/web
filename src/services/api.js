import { getCurrentJWT } from "./auth";

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
            return Promise.reject(error);
        }
    }
}

const onRequest = request => {
    if (request.method === 'get' && request.params !== undefined) {
        Object.keys(request.params)
            .map(key => {
                const value = request.params[key];

                // transform into JSON when not string
                if (value.constructor != String) {
                    const parsedQs = JSON.stringify(value);
                    request.params[key] = parsedQs;
                }
            });
    }

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

const maybeAddAuthorization = config => {
    // retrieve save credentials
    const jwt = getCurrentJWT();

    // maybe add access token into 
    if (jwt !== null) {
        const headers = config.headers || {};
        const newHeaders = {
            "Authorization": `Bearer ${jwt.accessToken}`,
            ...headers,
        }

        // overwrite headers
        config.headers = newHeaders;
    }
}

async function send(config, 
                    parseItems = false, 
                    isItem = false) {

    maybeAddAuthorization(config);
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

async function sendAndParse(config, isItem = false) {
    return send(config, true, isItem);
}

export {
    configure,
    send,
    sendAndParse,
}