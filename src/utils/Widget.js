export default class Widget {
  constructor(id, description, kind, name, user, owner) {
    this.id = id;
    this.description = description;
    this.kind = kind;
    this.name = name;
    this.user = user;
    this.owner = owner;
  }

  getUserName() {
    return this.user ? this.user.getName() : null;
  }
}
