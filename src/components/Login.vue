<template>
  <section class="section">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <h1 class="title is-3">
          LOGIN
        </h1>
      </div>
    </div>
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <div class="field">
          <div class="control">
            <input class="input is-rounded" type="text" placeholder="Email" v-model="email">
          </div>
        </div>
        <div class="field">
          <div class="control">
              <input class="input is-rounded" type="text" placeholder="Password" v-model="password">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
};
</script>

<style lang="css" scoped>
  .section {
    border-radius: 5px;
    border-style: solid;
    border-color: #7e7e7e;
    border-width: 1px;
    box-shadow: 10px 5px 0px 0px rgba(0,0,0,0.7)
  }
</style>
