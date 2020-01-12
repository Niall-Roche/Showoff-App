import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/components/Dashboard.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'widgets',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login,
    // },
  ],
});


export default router;
