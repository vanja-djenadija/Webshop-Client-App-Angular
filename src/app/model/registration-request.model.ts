export class RegistrationRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  avatarUrl: string;

  constructor(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    city: string,
    avatarUrl: string
  ) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.city = city;
    this.avatarUrl = avatarUrl;
  }
}
