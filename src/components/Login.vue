<template>
  <b-navbar-nav class="ml-auto">
    <b-nav-item-dropdown right>
      <template v-slot:button-content>
      <em>{{ usernameDisplay }}</em>
      </template>
      <template v-if="$store.getters.isLoggedIn">
        <b-dropdown-item @click="$router.push('/users/me')">Profile</b-dropdown-item>
        <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
      </template>
      <template v-else>
        <b-dropdown-item v-b-modal.login-modal href="#">Login</b-dropdown-item>
      </template>
    </b-nav-item-dropdown>

    <b-modal
      ref="modal"
      ok-title="Submit"
      id="login-modal"
      centered
      :title="forgotten ? 'Forgot Password' : login ? 'Login' : 'Register'">
      <b-row>
        <b-container>
          <b-form ref="login" @submit="submit">
            <b-form-group v-if="!forgotten && !login" id="input-group-1" label="First Name:" label-for="first-name">
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
            <b-form-group v-if="!forgotten && !login" id="input-group-2" label="Last Name:" label-for="last-name">
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
                :state="!login && !forgotten ? validEmail : null"
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
            <b-form-group v-if="!forgotten" id="input-group-4" label="Password:" label-for="password">
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
                <b-button @click="loginOrRegister" variant="link">
                  {{ login ? 'Register' : 'Login' }}
                </b-button>
                <b-button :hidden="forgotten" @click="onForgotten" variant="link">Forgot Password?</b-button>
              </b-button-group>
            </b-row>
            <b-button type="submit" variant="primary" class="float-right">
              <b-spinner v-show="submitting" small></b-spinner>
              <span v-show="!submitting">Submit</span>
            </b-button>
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
      forgotten: false,
      submitting: false,
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
      if (!this.forgotten) {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        this.validEmail = null;
      }
    },

    /*
    * Validate the email field
    */
    email(val) {
      if (val.length > 0) {
        if (!this.forgotten && !this.login) {
          this.$http('/api/v1/users/email', {
            params: {
              client_id: this.$clientId,
              client_secret: this.$clientSecret,
              email: this.email,
            },
          }).then(({ code, data }) => {
            this.validEmail = code === 0 ? data.available : false;
          }).catch(this.handleErr);
        }
      } else {
        this.validEmail = false;
      }
    },
  },
  methods: {
    async submit() {
      this.submitting = true;
      if (this.forgotten) {
        await this.passwordReset();
      } else if (this.login) {
        await this.loginRequest();
      } else {
        await this.registerRequest();
      }
      this.submitting = false;
    },

    loginRequest() {
      return this.login(this.email, this.password)
        .then(({ code, data }) => {
          if (code === 0) {
            const { token } = data;
            this.$store.dispatch('login', {
              token,
              user: {
                email: this.email,
              },
            }).then(() => {
              this.closeModal('Successfully Logged In');
            });
          } else {
            this.makeToast('Error', data.message, true);
          }
        }).catch(this.handleErr);
    },

    registerRequest() {
      return this.register(this.firstName, this.lastName, this.email, this.password)
        .then(({ code, data }) => {
          if (code === 0) {
            const { token, user } = data;
            this.$store.dispatch('login', {
              token,
              user,
            }).then(() => {
              this.closeModal('Successfully Created An Account');
            });
          } else {
            this.makeToast('Error', data.message, true);
          }
        }).catch(this.handleErr);
    },

    signOut() {
      this.$http.post('/oauth/revoke', {
        token: localStorage.getItem('token'),
      }).then(({ code, message }) => {
        if (code === 0) {
          this.$store.dispatch('logout').then(() => {
            this.$nextTick(() => {
              this.$refs.modal.hide();
              this.makeToast('Success', 'Successfully Logged Out');
              if (this.$route.name !== 'dashboard') {
                this.$router.push('/');
              }
            });
          });
        } else {
          this.makeToast('Error', message, true);
        }
      }).catch(this.handleErr);
    },

    closeModal(msg) {
      this.$nextTick(() => {
        this.$refs.modal.hide();
        this.makeToast('Success', msg);
        if (this.$route.name !== 'dashboard') {
          this.$router.push('/');
        }
      });
    },

    /*
    * Forgotten password request
    */
    passwordReset() {
      return this.resetPassword({ email: this.email })
        .then(({ code, message }) => {
          this.makeToast(code === 0 ? 'Success' : 'Error', message, code !== 0);
          this.$refs.modal.hide();
        }).catch(this.handleErr);
    },

    loginOrRegister() {
      this.login = !this.login;
      this.forgotten = false;
    },

    onForgotten() {
      this.forgotten = !this.forgotten;
      this.login = false;
    },
  },
};
</script>
