import Widget from '@/entities/Widget';
import User from '@/entities/User';
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
            const widgets = data.widgets.map((widget) => {
              const user = new User(
                widget.user.id,
                widget.user.first_name,
                widget.user.last_name,
                null,
                widget.user.images,
              );

              return new Widget(
                widget.id,
                widget.description,
                widget.kind,
                widget.name,
                user,
                widget.owner,
              );
            });

            resolve(widgets);
          } else {
            reject(message);
          }
        }).catch((err) => {
          this.makeToast('Error', err.message, true);
        });
      });
    },
  },
};
