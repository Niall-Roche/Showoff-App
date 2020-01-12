import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    // username: localStorage.getItem('username'),
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
    login({ commit }, creds) {
      commit(LOGIN);
      return new Promise((resolve) => {
        // setTimeout(() => {
        localStorage.setItem('token', creds.sessionId);
        localStorage.setItem('username', creds.username);
        commit(LOGIN_SUCCESS);
        resolve();
        // }, 1000);
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        commit(LOGOUT);
        resolve();
      });
    },
  },

  getters: {
    isLoggedIn: state => state.isLoggedIn,
    // getUsername: state => state.username,
  },
});
