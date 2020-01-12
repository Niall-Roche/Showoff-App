import Widget from '@/entities/Widget';
import User from '@/entities/User';

export default {
  methods: {
    getVisibleWidgets(term) {
      return new Promise((resolve, reject) => {
        this.$http.get('/api/v1/widgets/visible', {
          params: {
            client_id: this.$clientId,
            client_secret: this.$clientSecret,
            term,
          },
        }).then(({ data }) => {
          if (data.code === 0) {
            const widgets = data.data.widgets.map((widget) => {
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
            reject(data.message);
          }
        });
      });
    },
  },
};
