export default {
  methods: {
    makeToast(title, content, error) {
      this.$bvToast.toast(content, {
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
