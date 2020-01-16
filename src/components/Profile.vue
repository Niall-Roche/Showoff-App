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

      <b-form-group id="input-group-3" label="Image URL:" label-for="image">
        <b-form-input
          id="image"
          v-model="image"
          type="text"
          required
          placeholder="Enter Image URL">
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="float-right">Save</b-button>
    </b-form>
  </b-container>
</template>

<script>
import UserManager from '@/mixins/UserManager';

export default {
  name: 'profile',
  mixins: [UserManager],
  data() {
    return {
      firstName: '',
      lastName: '',
      dob: null,
      image: '',
    };
  },
  methods: {
    submit() {
      // TODO
    },
  },
  created() {
    this.getMyProfile()
      .then(({ code, message, data }) => {
        if (code === 0) {
          const { user } = data;
          this.firstName = user.first_name;
          this.lastName = user.last_name;
        } else {
          this.makeToast('Error', message, true);
        }
      })
      .catch(this.handleErr);
  },
};
</script>
