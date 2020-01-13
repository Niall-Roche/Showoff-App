<template>
  <b-navbar type="dark" variant="dark">
     <b-navbar-brand href="/">Showoff App</b-navbar-brand>
     <login></login>
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
