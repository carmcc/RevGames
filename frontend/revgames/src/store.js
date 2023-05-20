import { createStore } from 'vuex';
import instance from '@/axios.js';

export default createStore({
    state: {
        isLogged: false,
        isAdministrator: false,
        viewPressed: false,
    },
    mutations: {
        setLogged(state, value) {
            state.isLogged = value
        },
        setAdministrator(state, value) {
            state.isAdministrator = value
        },
        setViewPressed(state, value) {
            state.viewPressed = value
        }
    },
    actions: {
        login({ commit }, { accessToken, refreshToken, username }) {
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            commit('setLogged', true);
            localStorage.setItem('username', username);
        },
        logout({ commit }) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('username');
            commit('setLogged', false);
        },
        async checkLoginWithAuthentication({ commit }) {
            await instance.get("/api/protected").then((response) => {
                commit('setAdministrator', response.data.isAdmin);
                commit('setLogged', true);
            });
        }
    }
});
