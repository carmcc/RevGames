import axios from 'axios';

// Creazione di un'istanza di Axios
const instance = axios.create({
    baseURL: 'http://localhost:3000/',
});
instance.flag = true;
// Interceptor delle richieste
instance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (accessToken && instance.flag) {
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
        instance.flag = true;
        return response;
    },
    async (error) => {
        instance.flag = false;
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('refresh_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        if (refreshToken && error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Effettua una richiesta per ottenere un nuovo token di accesso utilizzando il refresh token
                const response = await instance.post('new-refreshToken', {
                    refresh_token: refreshToken,
                });
                instance.flag = true;
                // const newAccessToken = response.data.accessToken;
                // Salva il nuovo token di accesso nell'archivio locale
                localStorage.setItem('access_token', response.data.accessToken);
                localStorage.setItem('refresh_token', response.data.refreshToken);
                // Aggiorna l'header dell'originale richiesta con il nuovo token di accesso
                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                // Riprova la richiesta originale con il nuovo token di accesso

                return axios(originalRequest);
            } catch (refreshError) {
                console.log("Error refreshing token: " + refreshError);
                // Gestisci gli errori durante la richiesta di un nuovo token di accesso
                // console.error(refreshError);
                // Effettua la gestione dell'errore come desiderato (ad esempio, reindirizza l'utente alla pagina di accesso)
            }
        }
        // Gestisci altri tipi di errori
        return Promise.reject(error);
    }
);

export default instance;