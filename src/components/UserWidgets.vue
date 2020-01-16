<template>
  <b-container class="my-widgets-main">
    <b-row>
      <b-col sm="4">
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
      <b-col sm="8">
        <h3 class="text-center">{{ fullName }}'s Widgets</h3>
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
      this.getUserWidgets(this.userId, searchTerm)
        .then((widgets) => {
          this.widgets = widgets;
          this.isBusy = false;
        }).catch(this.handleErr);
    },
  },
  mounted() {
    this.userId = this.$route.params.id;
    this.getUserById(this.userId)
      .then(this.handleUserData)
      .catch(this.handleErr);
    this.loadWidgets();
  },
};
</script>

<style lang="css" scoped>
</style>
