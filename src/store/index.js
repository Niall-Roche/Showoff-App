import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    authToken: `${localStorage.getItem('token_kind')} ${localStorage.getItem('token')}`,
    refreshToken: localStorage.getItem('refresh_token'),
  },

  mutations: {
    [LOGIN](state) {
      state.pending = true;
    },
    [LOGIN_SUCCESS](state) {
      state.isLoggedIn = true;
      state.pending = false;
    },
    [LOGOUT](state) {
      state.isLoggedIn = false;
    },
  },

  actions: {
    login({ commit }, { token, user }) {
      commit(LOGIN);
      return new Promise((resolve) => {
        localStorage.setItem('token', token.access_token);
        localStorage.setItem('token_kind', token.token_type);
        localStorage.setItem('refresh_token', token.refresh_token);
        localStorage.setItem('username', user.email);
        commit(LOGIN_SUCCESS);
        resolve();
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        localStorage.removeItem('token');
        localStorage.removeItem('token_kind');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        commit(LOGOUT);
        resolve();
      });
    },
  },

  getters: {
    isLoggedIn: state => state.isLoggedIn,
    authToken: state => state.authToken,
    refreshToken: state => state.refreshToken,
  },
});
