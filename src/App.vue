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

    // Request Interceptor
    this.$http.interceptors.request.use((config) => {
      config.headers.Authorization = localStorage.getItem('token')
        ? `${localStorage.getItem('token_kind')} ${localStorage.getItem('token')}`
        : null;
      return config;
    },
    error => Promise.reject(error));

    const errorHandler = (err) => {
      if (err.response.status === 401) {
        this.$store.dispatch('logout');
        if (this.$route.name !== 'dashboard') {
          this.$router.push('/');
        }
      } else if (err.response.status === 500) {
        return Promise.reject(err);
      }
      return Promise.reject(err.response.data);
    };

    const successHandler = response => Promise.resolve(response.data);

    // Response Interceptor
    this.$http.interceptors.response.use(
      response => successHandler(response),
      error => errorHandler(error),
    );
  },
};
</script>
