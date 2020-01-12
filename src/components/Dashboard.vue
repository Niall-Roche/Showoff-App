<template>
  <b-container class="dashboard-main">
    <widgetsTable :busy="isBusy" :items="widgets" @filterChange="loadWidgets"></widgetsTable>
    <b-button v-if="$store.getters.isLoggedIn">View My Widgets</b-button>
  </b-container>
</template>

<script>
import widgetsTable from '@/components/Widgets.vue';
import widgetManager from '@/mixins/WidgetManager';

export default {
  name: 'dashboard',
  data() {
    return {
      widgets: [],
      isBusy: false,
    };
  },
  mixins: [widgetManager],
  components: {
    widgetsTable,
  },
  methods: {
    loadWidgets(searchTerm) {
      this.isBusy = true;
      this.getVisibleWidgets(searchTerm)
        .then((widgets) => {
          this.widgets = widgets.map(widget => ({
            id: widget.id,
            description: widget.description,
            user: widget.getUser(),
          }));
          this.isBusy = false;
        }).catch((err) => {
          this.makeToast('Error', err.message, true);
        });
    },
  },
  mounted() {
    this.loadWidgets();
  },
};
</script>

<style lang="css" scoped>
</style>
