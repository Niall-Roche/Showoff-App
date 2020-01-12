import Vue from 'vue';
import Router from 'vue-router';

import Widgets from '@/components/Widgets.vue';
import Login from '@/components/Login.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'widgets',
      component: Widgets,
      // meta: {
      //   requiresAuth: true,
      // },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // TODO replace with isLoggedIn
    // if (true) {
    //   next()
    //   return
    // }
    next('/login');
  } else {
    next();
  }
});

export default router;
