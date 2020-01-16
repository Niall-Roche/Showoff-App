import utils from '@/mixins/utils';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      fullName: '',
      dob: null,
      imageSrc: '',
    };
  },
  mixins: [utils],
  methods: {
    handleUserData({ code, message, data }) {
      if (code === 0) {
        const { user } = data;
        this.firstName = user.first_name;
        this.lastName = user.last_name;
        this.fullName = user.name;
        this.imageSrc = user.images.original_url;
        this.dob = user.date_of_birth ? new Date(user.date_of_birth) : null;
      } else {
        this.makeToast('Error', message, true);
      }
    },

    getMyProfile() {
      return this.$http('/api/v1/users/me');
    },

    updateProfile(user) {
      return this.$http.put('/api/v1/users/me', { user });
    },

    getUserById(id) {
      return this.$http(`/api/v1/users/${id}`);
    },

    changePassword(user) {
      return this.$http.post('/api/v1/users/me/password', { user });
    },

    resetPassword(user) {
      return this.$http.post('/api/v1/users/reset_password', {
        user,
        client_id: this.$clientId,
        client_secret: this.$clientSecret,
      });
    },

    loginUser(username, password) {
      return this.$http.post('/oauth/token', {
        grant_type: 'password',
        client_id: this.$clientId,
        client_secret: this.$clientSecret,
        username,
        password,
      });
    },

    register(firstName, lastName, email, password) {
      return this.$http.post('/api/v1/users', {
        client_id: this.$clientId,
        client_secret: this.$clientSecret,
        user: {
          first_name: firstName,
          last_name: lastName,
          password,
          email,
          image_url: 'https://static.thenounproject.com/png/961-200.png',
        },
      });
    },
  },
};
