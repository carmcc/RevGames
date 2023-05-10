import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        //se il token è presente, lo aggiungo all'header della richiesta
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    //se c'è un errore, lo ritorno
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
