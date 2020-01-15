import Vue from 'vue';
import Axios from 'axios';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.prototype.$http = Axios;

Vue.config.productionTip = false;

Vue.prototype.$clientId = process.env.VUE_APP_CLIENT_ID;
Vue.prototype.$clientSecret = process.env.VUE_APP_CLIENT_SECRET;
Vue.prototype.$http.defaults.baseURL = process.env.VUE_APP_BASE_URL;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
require('./styles/app.scss');

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
