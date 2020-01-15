import User from '@/entities/User';

export default class Widget {
  constructor({
    id, description, kind, name, user, owner,
  }) {
    this.id = id;
    this.description = description;
    this.kind = kind;
    this.name = name;
    this.user = new User(
      user.id,
      user.first_name,
      user.last_name,
      null,
      user.images,
    );
    this.owner = owner;
  }

  getUser() {
    return this.user;
  }

  getUserName() {
    return this.user ? this.user.getName() : null;
  }
}
