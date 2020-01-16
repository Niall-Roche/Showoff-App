import utils from '@/mixins/utils';

export default {
  mixins: [utils],
  methods: {
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
