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
};
</script>
