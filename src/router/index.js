import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/components/Dashboard.vue';
import MyWidgets from '@/components/MyWidgets.vue';
import Widget from '@/components/Widget.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
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
    {
      path: '/widgets/create',
      name: 'create',
      component: Widget,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/widgets/edit/:id',
      name: 'edit',
      component: Widget,
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
