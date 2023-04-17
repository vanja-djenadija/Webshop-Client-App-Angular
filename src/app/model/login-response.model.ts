import { ILoginResponse } from "./ILoginResponse";
import { User } from "./user.model";

export class LoginResponse extends User implements ILoginResponse {
    token: string;
    refreshToken: string;

    constructor(id: number, firstName: string, lastName: string, username: string, password:string, email: string, phoneNumber: string, city: string, avatarUrl: string, token: string, refreshToken: string) {
        super(id, firstName, lastName, username,password, email, phoneNumber, city, avatarUrl);
        this.token = token;
        this.refreshToken = refreshToken;
    }
}
