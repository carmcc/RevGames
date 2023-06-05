import axios from 'axios';

// Creazione di un'istanza di Axios
const instance = axios.create({
    baseURL: 'http://localhost:3000/',
});
let flag = true;
// Interceptor delle richieste
instance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (accessToken && flag) {
        // Aggiungi il token di accesso all'header della richiesta
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    else
    {
        config.headers.Authorization = `Bearer ${refreshToken}`;
    }
    return config;
});

// Interceptor delle risposte
instance.interceptors.response.use(
    (response) => {
        // Se la risposta è valida, la restituisco così com'è
        if(response.status === 200)
        {
            flag = true;
        }
        return response;
    },
    (error) => {
        // Se la risposta non è valida, provo a fare il refresh del token
        const originalRequest = error.config;
        if (error.response.status === 403 && flag) {
            flag = false;
            return instance
                .post('/new-refreshToken')
                .then((res) => {
                    if (res.status === 200) {
                        // Se il refresh è andato a buon fine, aggiorno i token
                        localStorage.setItem('access_token', res.data.accessToken);
                        localStorage.setItem('refresh_token', res.data.refreshToken);
                        // Riprovo la richiesta originale con i nuovi token
                        return instance(originalRequest);
                    }
                })
                .catch((err) => {
                    // Se il refresh non è andato a buon fine, rimuovo i token e reindirizzo alla pagina di login
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    localStorage.removeItem('username');
                    return Promise.reject(err);
                });

        }
        return Promise.reject(error);
    }
);

export default instance;