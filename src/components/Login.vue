<template>
  <b-navbar-nav class="ml-auto">
    <b-nav-item-dropdown right>
      <template v-slot:button-content>
      <em>User</em>
      </template>
      <template v-if="$store.getters.isLoggedIn">
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
      </template>
      <template v-else>
        <b-dropdown-item v-b-modal.login-modal href="#">Login</b-dropdown-item>
      </template>
    </b-nav-item-dropdown>

    <b-modal ok-title="Submit" @ok="submit" id="login-modal" centered :title="login ? 'Login' : 'Register'">
      <b-row>
        <b-container>
          <b-form>
            <b-form-group v-show="!login" id="input-group-1" label="First Name:" label-for="first-name">
              <b-form-input
                id="first-name"
                v-model="firstName"
                type="text"
                required
                placeholder="Enter First Name">
              </b-form-input>
            </b-form-group>
            <b-form-group v-show="!login" id="input-group-2" label="Last Name:" label-for="last-name">
              <b-form-input
                id="last-name"
                v-model="lastName"
                type="text"
                required
                placeholder="Enter Last Name">
              </b-form-input>
            </b-form-group>
            <b-form-group id="input-group-3" label="Email address:" label-for="email">
              <b-form-input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="Enter Email">
              </b-form-input>
            </b-form-group>
            <b-form-group id="input-group-4" label="Password:" label-for="password">
              <b-form-input
                id="password"
                v-model="password"
                type="password"
                required
                placeholder="Enter Password">
              </b-form-input>
            </b-form-group>
          </b-form>
        </b-container>
      </b-row>
      <b-row>
        <b-button @click="login=!login" variant="link">{{ login ? 'Register' : 'Login' }}</b-button>
      </b-row>
    </b-modal>
  </b-navbar-nav>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      login: true,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  },
  methods: {
    makeToast(title, content, error) {
      this.$bvToast.toast(content, {
        title,
        variant: error ? 'danger' : 'info',
        autoHideDelay: 5000,
      });
    },

    submit() {
      const clientId = this.$clientId;
      const clientSecret = this.$clientSecret;

      if (this.login) {
        this.$http.post('/oauth/token', {
          grant_type: 'password',
          client_id: clientId,
          client_secret: clientSecret,
          username: this.email,
          password: this.password,
        }).then(({ data }) => {
          if (data.code === 0) {
            // TODO
          } else {
            this.makeToast('Error', data.message, true);
          }
        }).catch((err) => {
          this.makeToast('Error', err.message, true);
        });
      } else {
        this.$http.post('/api/v1/users', {
          client_id: clientId,
          client_secret: clientSecret,
          user: {
            first_name: this.firstName,
            last_name: this.lastName,
            password: this.password,
            email: this.email,
            image_url: 'https://static.thenounproject.com/png/961-200.png',
          },
        }).then(({ data }) => {
          if (data.code === 0) {
            // TODO
          } else {
            this.makeToast('Error', data.message, true);
          }
        }).catch((err) => {
          this.makeToast('Error', err.message, true);
        });
      }
    },
  },
};
</script>
