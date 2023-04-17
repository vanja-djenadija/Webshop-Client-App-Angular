import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  public getAll() {
    return this.http.get<any>(environment.API_URL + "/categories");
  }

  public getSubcategories(name: string) {
    return this.http.get<any>(environment.API_URL + "/categories/" + name + "/sub");
  }
}
