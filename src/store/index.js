import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('session'),
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
        setTimeout(() => {
          localStorage.setItem('session', creds.sessionId);
          localStorage.setItem('username', creds.username);
          commit(LOGIN_SUCCESS);
          resolve();
        }, 1000);
      });
    },
    logout({ commit }) {
      localStorage.removeItem('session');
      localStorage.removeItem('username');
      commit(LOGOUT);
    },
  },

  getters: {
    isLoggedIn: state => state.isLoggedIn,
  },
});
