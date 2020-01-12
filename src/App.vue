<template>
  <div id="app">
    <banner></banner>
    <br>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import banner from '@/components/Banner.vue';

export default {
  name: 'app',
  components: {
    banner,
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (this.$store.getters.isLoggedIn) {
          next();
          return;
        }
        next('/');
      } else {
        next();
      }
    });

    this.$http.interceptors.response.use(undefined, err => new Promise((resolve, reject) => {
      if (err.response.status === 401) {
        this.$store.dispatch('logout');
        reject(err);
      }
      resolve();
    }));
  },
};
</script>
