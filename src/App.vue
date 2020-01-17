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

    // Response Interceptor
    this.$http.interceptors.response.use(
      response => Promise.resolve(response.data),
      (err) => {
        const origReq = err.config;
        if ((err.response.status === 401) && origReq.url === '/oauth/token') {
          this.$store.dispatch('logout');
          if (this.$route.name !== 'dashboard') {
            this.$router.push('/');
          }
          return Promise.reject(err);
        }

        if (err.response.status === 401 && !origReq.doRetry) {
          origReq.doRetry = true;
          const refreshToken = localStorage.getItem('refresh_token');

          return this.$http.post('/oauth/token', {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: this.$clientId,
            client_secret: this.$clientSecret,
          }).then(({ code, data }) => {
            if (code === 0) {
              const { token } = data;
              this.$store.dispatch('refreshToken', token);
              return this.$http(origReq);
            }
            return Promise.reject(err);
          });
        } if (err.response.status === 500) {
          return Promise.reject(err);
        }
        return Promise.reject(err.response.data);
      },
    );
  },
};
</script>
