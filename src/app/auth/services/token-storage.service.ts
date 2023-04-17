import {Injectable} from '@angular/core';
import {User} from 'src/app/model/user.model';
import {environment} from 'src/environments/environment';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public httpOptions = {};

  constructor() {
    this.updateHttpOptions();
  }

  public logout() {
    window.localStorage.clear();
  }

  public storeJwt(jwtToken: string) {
    window.localStorage.removeItem(environment.JWT_KEY);
    window.localStorage.setItem(environment.JWT_KEY, jwtToken);
  }

  public getJwt(): string | null {
    return window.localStorage.getItem(environment.JWT_KEY);
  }

  public storeRefreshToken(token: string) {
    window.localStorage.removeItem(environment.REFRESH_TOKEN_KEY);
    window.localStorage.setItem(environment.REFRESH_TOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return window.localStorage.getItem(environment.REFRESH_TOKEN_KEY);
  }

  public storeUser(user: User) {
    window.localStorage.removeItem(environment.USER_KEY);
    window.localStorage.setItem(environment.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(environment.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public updateUser(newUser: User) {
    const user = this.getUser();
    user.firstName = newUser.firstName;
    user.lastName = newUser.lastName;
    user.avatarUrl = newUser.avatarUrl;
    user.email = newUser.email;
    user.city = newUser.city;
    user.phoneNumber = newUser.phoneNumber;
    this.storeUser(user);
  }

  public updateHttpOptions() {
    if (this.getUser() == null)
      return;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getUser().token
      })
    };
  }
}
