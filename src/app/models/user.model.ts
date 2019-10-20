export class User {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;

  constructor(name, lastName, userName, email, password) {
    this.name = name;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.password = password;
  }
}
