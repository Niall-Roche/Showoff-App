<template>
    <div>
      <b-row align-v="center">
        <b-col sm="8">
            <b-form-group class="mb-0">
              <b-input-group size="sm">
                <b-form-input
                  debounce="500"
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  placeholder="Type to Search Widgets">
                </b-form-input>
                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
      <b-table
        outlined
        sticky-header="450px"
        class="widgets-table"
        show-empty
        striped hover
        :items="items"
        :busy="busy">
          <template v-slot:cell(user)="data">
            <!-- `data.value` is the value after formatted by the Formatter -->
            <!-- <a :href="`#${data.value.replace(/[^a-z]+/i,'-')}`">{{ data.value }}</a> -->
            <a href="https://www.google.com">{{ data.value.getName() }}</a>
          </template>
          <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
      </b-table>
    </div>
</template>

<script>

import WidgetManager from '@/mixins/WidgetManager';

export default {
  name: 'widgets',
  mixins: [WidgetManager],
  props: {
    items: Array,
    busy: Boolean,
  },
  data() {
    return {
      // items: [],
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
      filter: '',
    };
  },
  watch: {
    filter(val) {
      this.$emit('filterChange', val);
    },
  },
};
</script>
