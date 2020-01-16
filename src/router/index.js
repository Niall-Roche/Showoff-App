import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/components/Dashboard.vue';
import MyWidgets from '@/components/MyWidgets.vue';
import Widget from '@/components/Widget.vue';
import Profile from '@/components/Profile.vue';
import UserWidgets from '@/components/UserWidgets.vue';

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
    {
      path: '/users/me',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/users/:id/widgets',
      name: 'userwidgets',
      component: UserWidgets,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});


export default router;
