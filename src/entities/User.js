export default class User {
  constructor(id, firstName, lastName, dob, images) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.name = `${firstName} ${lastName}`;
    this.dob = dob;
    this.images = images;
  }

  getName() {
    return this.name;
  }
}
