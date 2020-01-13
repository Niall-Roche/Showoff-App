<template>
  <b-container>
    <h3 class="text-center">{{ title }}</h3>
    <b-form ref="widget-form" @submit="submit">
      <b-form-group id="input-group-1" label="Name:" label-for="name">
        <b-form-input
          id="name"
          v-model="name"
          type="text"
          required
          placeholder="Enter Name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-1" label="Description:" label-for="description">
        <b-form-input
          id="description"
          v-model="description"
          type="text"
          required
          placeholder="Enter Description">
        </b-form-input>
      </b-form-group>
      <b-form-group label="What kind of widget?">
        <b-form-radio-group
          id="radio-group-1"
          v-model="kind"
          :options="options"
          name="radio-options"
        ></b-form-radio-group>
      </b-form-group>
      <b-button type="submit" variant="primary" class="float-right">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: 'widget',
  data() {
    return {
      title: 'Widget',
      name: '',
      description: '',
      kind: 'visible',
      options: [
        { text: 'Visible', value: 'visible' },
        { text: 'Hidden', value: 'hidden' },
      ],
    };
  },
  methods: {
    submit() {
      debugger;
    },
  },
  created() {
    console.log(this.$router.params);
  },
};
</script>
