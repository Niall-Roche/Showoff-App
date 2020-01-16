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
      <b-form-group id="input-group-2" label="Description:" label-for="description">
        <b-form-input
          id="description"
          v-model="description"
          type="text"
          required
          placeholder="Enter Description">
        </b-form-input>
      </b-form-group>
      <b-container>
        <b-row sm>
          <h5 class="mt-3">{{ (hide ? "Show" : "Hide") + " This Widget?" }}</h5>
        </b-row>
        <b-row>
          <b-button :pressed.sync="hide" variant="primary">{{ hide ? "Show" : "Hide" }}</b-button>
        </b-row>
      </b-container>
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
      hide: false,
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
        this.updateWidget(this.widgetId, widget).then(({ code, message }) => {
          if (code === 0) {
            this.$router.push('/widgets/me', () => this.makeToast('Success', 'Successfully Updated Widget'));
          } else {
            this.makeToast('Error', message, true);
          }
        }).catch(({ err }) => this.makeToast('Error', err.message, true));
      } else {
        this.createWidget({ ...widget, kind: this.hide ? 'hidden' : 'visible' }).then(({ code, message }) => {
          if (code === 0) {
            this.$router.push('/widgets/me', () => this.makeToast('Success', 'Successfully Created New Widget'));
          } else {
            this.makeToast('Error', message, true);
          }
        }).catch(({ err }) => this.makeToast('Error', err.message, true));
      }
    },
  },
  created() {
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
