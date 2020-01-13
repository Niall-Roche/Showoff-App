<template>
  <b-container class="my-widgets-main">
    <h3 class="text-center">My Widgets</h3>
    <widgetsTable :busy="isBusy" :fields="fields" :widgets="widgets" @filterChange="loadWidgets"></widgetsTable>
    <!-- <b-button variant="primary">
      <b-icon font-scale="2" icon="plus" aria-hidden="true"></b-icon> New Widget
    </b-button> -->
    <b-button to="/widgets/create" variant="primary" class="mb-2">
      New Widget <b-icon icon="plus"></b-icon>
    </b-button>
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
