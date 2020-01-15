import Widget from '@/entities/Widget';
// import User from '@/entities/User';
import utils from '@/mixins/utils';


export default {
  mixins: [utils],
  methods: {
    getVisibleWidgets(term) {
      return this.getWidgets('/api/v1/widgets/visible', term);
    },

    getMyWidgets(term) {
      return this.getWidgets('/api/v1/users/me/widgets', term);
    },

    getWidgetById(id) {
      return this.getWidgets(`/api/v1/widgets/${id}`);
    },

    getUserWidgets(id, term) {
      return this.getWidgets(`/api/v1/users/${id}/widgets`, term);
    },

    createWidget(widget) {
      return this.$http.post('/api/v1/widgets', { widget });
    },

    updateWidget(id, widget) {
      return this.$http.put(`/api/v1/widgets/${id}`, { widget });
    },

    deleteWidget(id) {
      return this.$http.delete(`/api/v1/widgets/${id}`);
    },

    getWidgets(url, term) {
      return new Promise((resolve, reject) => {
        this.$http.get(url, {
          params: {
            client_id: this.$clientId,
            // client_id: '1234',
            client_secret: this.$clientSecret,
            term,
          },
        }).then(({ code, message, data }) => {
          if (code === 0) {
            resolve(data.widget ? new Widget(data.widget) : data.widgets.map(widget => new Widget(widget)));
          } else {
            reject(message);
          }
        }).catch(this.handleErr);
      });
    },
  },
};
