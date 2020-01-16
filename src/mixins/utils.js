export default {
  methods: {
    makeToast(title, content, error) {
      // Calling $bvToast at the root level means toasts will persist on route changes
      this.$root.$bvToast.toast(content, {
        title,
        variant: error ? 'danger' : 'info',
        autoHideDelay: 5000,
      });
    },

    handleErr(err) {
      this.makeToast('Error', err.message, true);
    },
  },
};
