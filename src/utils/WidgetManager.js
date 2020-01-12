import Widget from './Widget';
import User from './User';

class WidgetManager {
  constructor(viewModel, user) {
    this.vm = viewModel;
    this.user = user;
  }

  getWidgets(term) {
    if (this.user) {
      return null;
    }

    return new Promise((resolve, reject) => {
      this.vm.$http.get('/widgets/visible', {
        params: {
          client_id: this.vm.$clientId,
          client_secret: this.vm.$clientSecret,
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
  }
}

export default WidgetManager;
