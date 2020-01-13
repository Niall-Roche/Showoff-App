<template>
  <b-container class="dashboard-main">
    <h3 class="text-center">Dashboard Widgets</h3>
    <widgetsTable :busy="isBusy" :fields="fields" :widgets="widgets" @filterChange="loadWidgets"></widgetsTable>
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
      fields: [
        {
          key: 'id',
          label: 'Widget Id',
        },
        {
          key: 'description',
          label: 'Description',
        },
        {
          key: 'user',
          label: 'Widget Owner',
        },
      ],
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
          this.makeToast('Error', err, true);
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
