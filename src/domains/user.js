const axios = require('axios');


const list = () => {
    return axios.get('/user');
}

export {
    list
}