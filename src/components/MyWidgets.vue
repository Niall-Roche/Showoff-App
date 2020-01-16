<template>
  <b-container class="my-widgets-main">
    <h3 class="text-center">My Widgets</h3>
    <widgetsTable
      :busy="isBusy"
      :fields="fields"
      :widgets="widgets"
      @filterChange="loadWidgets"
      @editClick="onEdit"
      @deleteClick="onDelete">
    </widgetsTable>
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
          key: 'name',
          label: 'Widget Name',
        },
        {
          key: 'description',
          label: 'Description',
        },
        {
          key: 'kind',
          label: 'Widget Type',
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
      // calls mixin function (mixins/widgetmanager)
      this.getMyWidgets(searchTerm)
        .then((widgets) => {
          this.widgets = widgets;
          this.isBusy = false;
        }).catch(this.handleErr);
    },

    onEdit(id) {
      this.$router.push(`/widgets/edit/${id}`);
    },

    onDelete(id) {
      // calls mixin function (mixins/widgetmanager)
      this.deleteWidget(id)
        .then(({ code, message }) => {
          if (code === 0) {
            this.makeToast('Success', 'Widget Was Removed Successfully');
            this.loadWidgets();
          } else {
            this.makeToast('Error', message, true);
          }
        }).catch(this.handleErr);
    },
  },
  mounted() {
    this.loadWidgets();
  },
};
</script>

<style lang="css" scoped>
</style>
