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
          :disabled="!!this.widgetId"
          :options="options"
          name="radio-options"
        ></b-form-radio-group>
      </b-form-group>
      <b-button type="submit" variant="primary" class="float-right">Save</b-button>
    </b-form>
  </b-container>
</template>

<script>
import widgetManager from '@/mixins/WidgetManager';

export default {
  name: 'widget',
  mixins: [widgetManager],
  data() {
    return {
      widgetId: null,
      name: '',
      description: '',
      kind: 'visible',
      options: [
        { text: 'Visible', value: 'visible' },
        { text: 'Hidden', value: 'hidden' },
      ],
    };
  },
  computed: {
    title() {
      return this.widgetId ? 'Edit Widget' : 'Create Widget';
    },
  },
  methods: {
    submit() {
      const widget = {
        name: this.name,
        description: this.description,
      };

      if (this.widgetId) {
        this.updateWidget(this.widgetId, widget).then(({ code }) => {
          if (code === 0) {
            // TODO Toast not showing
            this.makeToast('Success', 'Successfully Updated Widget');
            this.$nextTick(() => {
              this.$router.push('/widgets/me');
            });
          }
        });
      } else {
        this.createWidget({ ...widget, kind: this.kind }).then(({ code }) => {
          if (code === 0) {
            this.$router.push('/widgets/me');
            this.makeToast('Success', 'Successfully Created New Widget');
          }
        });
      }
    },
  },
  async created() {
    this.widgetId = this.$route.params.id;
    if (this.widgetId) {
      this.getWidgetById(this.widgetId)
        .then((widget) => {
          this.name = widget.name;
          this.description = widget.description;
          this.kind = widget.kind;
        });
    }
  },
};
</script>
