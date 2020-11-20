import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.17.20.28:19000'
});

export default api;