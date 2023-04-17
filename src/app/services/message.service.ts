import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {MessageRequest} from '../model/message-request.model';
import {TokenStorageService} from "../auth/services/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {
  }

  public sendMessage(message: MessageRequest) {
    return this.http.post<any>(environment.API_URL + "/messages", message, this.tokenService.httpOptions);
  }
}
