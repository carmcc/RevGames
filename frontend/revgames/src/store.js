import { createStore } from 'vuex';

export default createStore({
    state: {
        isLogged: false,
        username: null
    },
    mutations: {
        setLogged(state, value) {
            state.isLogged = value
        },
        setUsername(state, value) {
            state.username = value
        }
    },
    actions: {
        login({ commit }, { accessToken, refreshToken, username }) {
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            commit('setLogged', true);
            commit('setUsername', username);
        },
        logout({ commit }) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            commit('setLogged', false);
            commit('setUsername', null);
        },
        checkLogin({ commit }, { username }) {
            const accessToken = localStorage.getItem('access_token');
            const refreshToken = localStorage.getItem('refresh_token');
            commit('setUsername', username);
            if (accessToken && refreshToken) {
                commit('setLogged', true);
            } else {
                commit('setLogged', false);
            }
        }
    }
});
