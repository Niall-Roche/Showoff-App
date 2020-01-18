<template>
  <b-container class="my-widgets-main">
    <b-row>
      <b-col md="4">
        <b-card
          :title="fullName"
          :img-src="imageSrc"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
        </b-card>
      </b-col>
      <b-col md="8">
        <h3 class="text-center">{{ fullName + '\'' + (fullName.endsWith('s') ? '' : 's') }} Widgets</h3>
        <widgetsTable
          :busy="isBusy"
          :fields="fields"
          :widgets="widgets"
          @filterChange="loadWidgets">
        </widgetsTable>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import widgetsTable from '@/components/Widgets.vue';
import WidgetManager from '@/mixins/WidgetManager';
import UserManager from '@/mixins/UserManager';

export default {
  name: 'mywidgets',
  mixins: [WidgetManager, UserManager],
  components: {
    widgetsTable,
  },
  data() {
    return {
      userId: '',
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
      ],
      isBusy: false,
    };
  },
  methods: {
    loadWidgets(searchTerm) {
      this.isBusy = true;
      // calls mixin function (mixins/widgetmanager)
      this.getUserWidgets(this.userId, searchTerm)
        .then((widgets) => {
          this.widgets = widgets;
          this.isBusy = false;
        }).catch(this.handleErr);
    },
  },
  async mounted() {
    this.userId = this.$route.params.id;
    // calls mixin function (mixins/usermanager)
    await this.getUserById(this.userId)
      // passed to mixin function (mixins/usermanager)
      .then(this.handleUserData)
      .catch(this.handleErr);
    this.loadWidgets();
  },
};
</script>

<style lang="css" scoped>
</style>
