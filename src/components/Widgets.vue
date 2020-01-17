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
        :fields="fields"
        :items="widgets"
        :busy="busy">
          <template v-slot:cell(user)="data">
            <b-button
              v-if="$store.getters.isLoggedIn"
              variant="link"
              @click="$router.push(`/users/${data.value.id}/widgets`)">
              {{ data.value.name }}
            </b-button>
            <span v-if="!$store.getters.isLoggedIn">{{ data.value.name }}</span>
          </template>
          <template v-if="$store.getters.isLoggedIn" v-slot:cell(actions)="data">
            <!-- <b-button variant="info">Edit</b-button> -->
            <b-dropdown class="m-md-2">
              <template v-slot:button-content>
                <b-icon icon="gear-fill" aria-hidden="true"></b-icon> Actions
              </template>
              <b-dropdown-item-button @click="$emit('editClick', data.item.id)" variant="info">
                <b-icon icon="pencil" aria-hidden="true"></b-icon> Edit
              </b-dropdown-item-button>
              <b-dropdown-item-button @click="$emit('deleteClick', data.item.id)" variant="danger">
                <b-icon icon="trash" aria-hidden="true"></b-icon> Delete
              </b-dropdown-item-button>
            </b-dropdown>
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

export default {
  name: 'widgets',
  props: {
    widgets: Array,
    fields: Array,
    busy: Boolean,
  },
  data() {
    return {
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
