import { ILoginResponse } from "./ILoginResponse";

export class AccountActivation implements ILoginResponse {
    username: string;

    constructor(username: string) {
        this.username = username;
    }
}