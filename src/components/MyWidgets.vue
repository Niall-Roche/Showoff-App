<template>
  <b-container class="my-widgets-main">
    <h2 class="text-center">Dashboard Widgets</h2>
    <widgetsTable :busy="isBusy" :fields="fields" :widgets="widgets" @filterChange="loadWidgets"></widgetsTable>
  </b-container>
</template>

<script>
import widgetsTable from '@/components/Widgets.vue';
import widgetManager from '@/mixins/WidgetManager';

export default {
  name: 'mywidgets',
  mixins: [widgetManager],
  components: {
    widgetsTable,
  },
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
        {
          key: 'actions',
          label: 'Actions',
        },
      ],
      isBusy: false,
    };
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
