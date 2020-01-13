<template>
  <b-navbar-nav class="ml-auto">
    <b-nav-item-dropdown right>
      <template v-slot:button-content>
      <em>{{ usernameDisplay }}</em>
      </template>
      <template v-if="$store.getters.isLoggedIn">
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
      </template>
      <template v-else>
        <b-dropdown-item v-b-modal.login-modal href="#">Login</b-dropdown-item>
      </template>
    </b-nav-item-dropdown>

    <b-modal ref="modal" ok-title="Submit" id="login-modal" centered :title="login ? 'Login' : 'Register'">
      <b-row>
        <b-container>
          <b-form ref="login" @submit="submit">
            <b-form-group v-if="!login" id="input-group-1" label="First Name:" label-for="first-name">
              <b-form-input
                id="first-name"
                v-model="firstName"
                type="text"
                required
                placeholder="Enter First Name">
              </b-form-input>
              <b-form-invalid-feedback id="input-live-feedback">
                First name is required
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group v-if="!login" id="input-group-2" label="Last Name:" label-for="last-name">
              <b-form-input
                id="last-name"
                v-model="lastName"
                type="text"
                required
                placeholder="Enter Last Name">
              </b-form-input>
              <b-form-invalid-feedback id="input-live-feedback">
                Last name is required
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="input-group-3" label="Email address:" label-for="email">
              <b-form-input
                id="email"
                v-model="email"
                type="email"
                :state="!login ? validEmail : null"
                aria-describedby="input-live-feedback input-live-available-feedback"
                debounce="500"
                required
                placeholder="Enter Email">
              </b-form-input>

              <b-form-invalid-feedback id="input-live-feedback">
                Enter a valid email
              </b-form-invalid-feedback>

              <b-form-valid-feedback id="input-live-available-feedback">
                Available
              </b-form-valid-feedback>

            </b-form-group>
            <b-form-group id="input-group-4" label="Password:" label-for="password">
              <b-form-input
                id="password"
                v-model="password"
                type="password"
                required
                placeholder="Enter Password">
              </b-form-input>
              <b-form-invalid-feedback id="input-live-feedback">
                Password is required
              </b-form-invalid-feedback>
            </b-form-group>
            <b-row>
              <b-button-group size="sm">
                <b-button @click="login=!login" variant="link">{{ login ? 'Register' : 'Login' }}</b-button>
                <b-button @click="passwordReset" variant="link">Forgotten Password?</b-button>
              </b-button-group>
            </b-row>
            <b-button type="submit" variant="primary" class="float-right">Submit</b-button>
          </b-form>
        </b-container>
      </b-row>
      <template v-slot:modal-footer>
        <div></div>
      </template>
    </b-modal>
  </b-navbar-nav>
</template>

<script>
import utils from '@/mixins/utils';

export default {
  name: 'login',
  mixins: [utils],
  data() {
    return {
      login: true,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      validEmail: null,
    };
  },
  computed: {
    usernameDisplay() {
      return this.$store.getters.isLoggedIn ? localStorage.getItem('username') : 'User';
    },
  },
  watch: {
    /*
    * Reset all values when switching views
    */
    login() {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.validEmail = null;
    },

    /*
    * Validate the email field
    */
    email(val) {
      if (val.length > 0) {
        if (!this.login) {
          this.$http('/api/v1/users/email', {
            params: {
              client_id: this.$clientId,
              client_secret: this.$clientSecret,
              email: this.email,
            },
          }).then(({ code, data }) => {
            this.validEmail = code === 0 ? data.available : false;
          });
        }
      } else {
        this.validEmail = false;
      }
    },
  },
  methods: {
    submit() {
      const clientId = this.$clientId;
      const clientSecret = this.$clientSecret;

      if (this.login) {
        this.$store.dispatch('login', {
          sessionId: 'abcdefg12344',
          username: 'niallroche',
        }).then(() => {
          this.$nextTick(() => {
            this.$refs.modal.hide();
            this.makeToast('Success', 'Successfully Logged In');
          });
        });
        // this.$http.post('/oauth/token', {
        //   grant_type: 'password',
        //   client_id: clientId,
        //   client_secret: clientSecret,
        //   username: this.email,
        //   password: this.password,
        // }).then(({ data }) => {
        //   if (data.code === 0) {
        //     // TODO
        //   } else {
        //     this.makeToast('Error', data.message, true);
        //   }
        // }).catch((err) => {
        //   this.makeToast('Error', err.message, true);
        // });
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

    signOut() {
      this.$store.dispatch('logout').then(() => {
        this.$nextTick(() => {
          this.$refs.modal.hide();
          this.makeToast('Success', 'Successfully Logged Out');
          if (this.$router.currentRoute.name !== 'dashboard') {
            this.$router.push('/');
          }
        });
      });
      // this.$http.post('/oauth/revoke', {
      //   token: localStorage.getItem('token'),
      // }).then(({ data }) => {
      //   if (data.code === 0) {
      //     this.$store.dispatch('logout').then(() => {
      //       this.$nextTick(() => {
      //         this.$refs.modal.hide();
      //         this.makeToast('Success', 'Successfully Logged Out');
      //       });
      //     });
      //   } else {
      //     this.makeToast('Error', data.message, true);
      //   }
      // }).catch((err) => {
      //   this.makeToast('Error', err.message, true);
      // });
    },

    passwordReset() {
      // this.$http('/api/v1/users/reset_password', {
      //   user: {
      //     email: this,
      //   },
      //   client_id: '{{client_id}}',
      //   client_secret: '{{client_secret}}',
      // });
    },
  },
};
</script>
