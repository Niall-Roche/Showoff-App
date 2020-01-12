<template>
    <b-container class="widgets-main">
      <b-row align-v="center">
        <b-col sm="8">
          <b-form-group
          label="Filter: "
          label-cols-sm="2"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        </b-col>
        <!-- <b-col sm="4">col-sm-4</b-col> -->
      </b-row>
      <b-table sticky-header class="widgets-table" striped hover :items="items">
        <template v-slot:cell(user)="data">
          <!-- `data.value` is the value after formatted by the Formatter -->
          <!-- <a :href="`#${data.value.replace(/[^a-z]+/i,'-')}`">{{ data.value }}</a> -->
          <a href="https://www.google.com">{{ data.value }}</a>
        </template>
      </b-table>
    </b-container>
</template>

<script>

import WidgetManager from '@/utils/WidgetManager';

export default {
  name: 'widgets',
  data() {
    const widgetManager = new WidgetManager(this);
    return {
      items: [],
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
      widgetManager,
      filter: '',
    };
  },
  watch: {
    filter(val) {
      this.loadWidgets(val);
    },
  },
  methods: {
    loadWidgets(searchTerm) {
      this.widgetManager
        .getWidgets(searchTerm)
        .then((widgets) => {
          this.items = widgets.map(widget => ({
            id: widget.id,
            description: widget.description,
            user: widget.getUserName(),
          }));
        });
    },
  },
  mounted() {
    this.loadWidgets();
  },
};
</script>

<style lang="scss" scoped>
// .widgets-main {
//   max-height: 800px;
// }

// .widgets-table: {
//   overflow: scroll;
// }
</style>
