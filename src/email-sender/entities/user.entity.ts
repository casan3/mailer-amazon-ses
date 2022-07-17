interface IUser {
  email: string;
  name: string;
}

export class User implements IUser {
  email: string;
  name: string;
  constructor(email, name) {
    this.email = email;
    this.name = name;
  }
}
