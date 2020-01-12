import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/components/Dashboard.vue';
import MyWidgets from '@/components/MyWidgets.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'widgets',
      component: Dashboard,
    },
    {
      path: '/widgets/me',
      name: 'mywidgets',
      component: MyWidgets,
      meta: {
        requiresAuth: true,
      },
    },
    // {
    //   path: '/widgets',
    //   component: Dashboard,
    //   children: [
    //     {
    //       path: 'me',
    //       name: 'mywidgets',
    //       component: MyWidgets,
    //       meta: {
    //         requiresAuth: true,
    //       },
    //     },
    //   ],
    // },
  ],
});


export default router;
