<template>
  <b-navbar type="dark" variant="dark">
     <b-navbar-brand href="/">Showoff App</b-navbar-brand>
     <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

     <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Dashboard</b-nav-item>
          <b-nav-item :hidden="!$store.getters.isLoggedIn" to="/widgets/me">My Widgets</b-nav-item>
        </b-navbar-nav>
       <login></login>
     </b-collapse>
  </b-navbar>
</template>

<script>
import login from './Login.vue';

export default {
  name: 'banner',
  components: {
    login,
  },
};
</script>

<style lang="css" scoped>
</style>
