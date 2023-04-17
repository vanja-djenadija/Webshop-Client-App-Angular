export class UserUpdateRequest {
  firstName: string;
  lastName: string;
  password: string;
  newPassword: string;
  email: string;
  phoneNumber: string;
  city: string;
  avatarUrl: string;


  constructor(
    firstName: string,
    lastName: string,
    password: string,
    newPassword: string,
    email: string,
    phoneNumber: string,
    city: string,
    avatarUrl: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.newPassword = newPassword;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.city = city;
    this.avatarUrl = avatarUrl;
  }
}
