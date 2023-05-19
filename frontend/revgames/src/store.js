import { createStore } from 'vuex';

export default createStore({
    state: {
        isLogged: false,
    },
    mutations: {
        setLogged(state, value) {
            state.isLogged = value
        },
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
        checkLogin({ commit }) {
            const accessToken = localStorage.getItem('access_token');
            const refreshToken = localStorage.getItem('refresh_token');
            if (accessToken && refreshToken) {
                commit('setLogged', true);
            } else {
                commit('setLogged', false);
                localStorage.removeItem('username');
            }
        }
    }
});
