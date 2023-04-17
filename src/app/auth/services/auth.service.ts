import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ILoginResponse} from 'src/app/model/ILoginResponse';
import {LoginRequest} from 'src/app/model/login-request.model';
import {RegistrationRequest} from 'src/app/model/registration-request.model';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  refreshToken(refreshToken: string) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };
    return this.http.post(
      environment.API_URL + '/auth/refresh_token',
      {refreshToken: refreshToken},
      httpOptions
    );
  }

  public login(request: LoginRequest) {
    return this.http.post<ILoginResponse>(environment.API_URL + '/auth/login', request);
  }

  public register(request: RegistrationRequest) {
    return this.http.post<any>(environment.API_URL + '/auth/register', request);
  }

  public activateAccount(pin: string, username: string) {
    return this.http.post(environment.API_URL + '/auth/activate', {
      pin,
      username,
    });
  }
}
