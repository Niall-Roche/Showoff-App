<template>
  <b-container>
    <h3 class="text-center">My Profile</h3>
    <b-form ref="widget-form" @submit="submit">
      <b-form-group id="input-group-1" label="First Name:" label-for="firstname">
        <b-form-input
          id="firstname"
          v-model="firstName"
          type="text"
          required
          placeholder="Enter First Name">
        </b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Last Name:" label-for="lastname">
        <b-form-input
          id="lastname"
          v-model="lastName"
          type="text"
          required
          placeholder="Enter Last Name">
        </b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Date of Birth:">
        <datepicker v-model="dob"></datepicker>
      </b-form-group>

      <b-img width="75" height="75" class="m1" :src="imageSrc" alt="Circle image"></b-img>
      <b-form-group id="input-group-4" label="Image URL:" label-for="image">
        <b-form-input
          id="image"
          v-model="image"
          type="text"
          placeholder="Enter an image URL to change your profile picture">
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="float-right">Save</b-button>
      <b-button v-b-modal.password-change variant="info">Change Password</b-button>
    </b-form>

    <b-modal
      id="password-change"
      title="Change Password"
      ref="modal"
      centered>
        <b-form @submit="submitPasswordChange">
          <b-form-group id="input-group-1" label="Current Password:" label-for="current">
            <b-form-input
              id="currrent"
              v-model="current"
              type="password"
              required
              placeholder="Enter Current Password">
            </b-form-input>
            <b-form-invalid-feedback id="input-live-feedback">
              Current Password is required
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="input-group-2" label="New Password:" label-for="new">
            <b-form-input
              id="new"
              v-model="newPassword"
              type="password"
              required
              placeholder="Enter New Password">
            </b-form-input>
            <b-form-invalid-feedback id="input-live-feedback">
              New Password is required
            </b-form-invalid-feedback>
          </b-form-group>

          <b-button type="submit" variant="danger" class="float-right">
            <b-spinner v-show="submitting" small></b-spinner>
            <span v-show="!submitting">Change Password</span>
          </b-button>
      </b-form>
      <template v-slot:modal-footer>
        <div></div>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import UserManager from '@/mixins/UserManager';

export default {
  name: 'profile',
  components: {
    Datepicker,
  },
  mixins: [UserManager],
  data() {
    return {
      submitting: false,
      current: '',
      newPassword: '',
      image: '',
    };
  },
  methods: {
    submit() {
      // calls mixin function (mixins/usermanager)
      this.updateProfile({
        first_name: this.firstName,
        last_name: this.lastName,
        date_of_birth: this.dob.getTime(),
        image_url: this.image,
      }).then(({ code, message }) => {
        if (code === 0) {
          this.$router.push('/', () => this.makeToast('Success', 'Profile Successfully Updated'));
        } else {
          this.makeToast('Error', message, true);
        }
      }).catch(this.handleErr);
    },

    submitPasswordChange() {
      // calls mixin function (mixins/usermanager)
      this.changePassword({ current_password: this.current, new_password: this.newPassword })
        .then(({ code, message, data }) => {
          if (code === 0) {
            this.$store.dispatch('refreshToken', data.token)
              .then(() => {
                this.$nextTick(() => {
                  this.$refs.modal.hide();
                  this.makeToast('Success', 'Successfully Changed Password');
                });
              });
          } else {
            this.makeToast('Error', message, true);
          }
        }).catch(this.handleErr);
    },
  },
  mounted() {
    // calls mixin function (mixins/usermanager)
    this.getMyProfile()
    // passed to mixin function (mixins/usermanager)
      .then(this.handleUserData)
      .catch(this.handleErr);
  },
};
</script>
