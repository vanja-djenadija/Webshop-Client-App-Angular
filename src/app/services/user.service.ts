import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {TokenStorageService} from '../auth/services/token-storage.service';
import {User} from "../model/user.model";
import {UserUpdateRequest} from "../model/user-update-request.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private tokenService: TokenStorageService) {
  }

  public update(request: UserUpdateRequest) {
    return this.http.put<User>(environment.API_URL + "/users/" + this.tokenService.getUser().username, request, this.tokenService.httpOptions);
  }

  public getActiveProductsByUser() {
    return this.http.get<any>(environment.API_URL + "/users/" + this.tokenService.getUser().username + "/active?page=0&size=10000", this.tokenService.httpOptions);
  }

  public getSoldProductsByUser() {
    return this.http.get<any>(environment.API_URL + "/users/" + this.tokenService.getUser().username + "/sold?page=0&size=10000", this.tokenService.httpOptions);
  }

  public getPurchasedProductsByUser() {
    return this.http.get<any>(environment.API_URL + "/users/" + this.tokenService.getUser().username + "/purchased?page=0&size=10000", this.tokenService.httpOptions);
  }
}
