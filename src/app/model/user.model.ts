export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    city: string;
    avatarUrl: string;


    constructor(
        id: number,
        firstName: string,
        lastName: string,
        username: string,
        password: string,
        email: string,
        phoneNumber: string,
        city: string,
        avatarUrl: string
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.avatarUrl = avatarUrl;
    }
}