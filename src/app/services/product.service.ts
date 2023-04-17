import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Product} from '../model/product.model';
import {environment} from 'src/environments/environment';
import {CommentRequest} from '../model/comment-request.model';
import {TokenStorageService} from '../auth/services/token-storage.service';
import {PurchaseRequest} from "../model/purchase-request.model";
import {ProductRequest} from "../model/product-request.model";
import {SearchProduct} from "../model/search-product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {
  }

  public getAllProducts(params: any) {
    return this.http.get<any>(environment.API_URL + "/products", {params});
  }

  public getAllActiveProducts(params: any) {
    return this.http.get<any>(environment.API_URL + "/products/active", {params});
  }

  public getProductById(id: number) {
    const url = environment.API_URL + "/products/product/" + id;
    return this.http.get<Product>(url);
  }

  public comment(request: CommentRequest) {
    const url = environment.API_URL + "/products/" + request.productId + "/comments";
    return this.http.post<any>(url, request, this.tokenService.httpOptions);
  }

  public deleteProduct(id: number) {
    return this.http.delete(environment.API_URL + "/products/" + id, this.tokenService.httpOptions);
  }

  public purchase(id: number, request: PurchaseRequest) {
    return this.http.post<Product>(environment.API_URL + "/products/" + id + "/purchase", request, this.tokenService.httpOptions);
  }

  public addProduct(product: ProductRequest) {
    return this.http.post<Product>(environment.API_URL + "/products", product, this.tokenService.httpOptions);
  }

  public getProductsByCategory(category: string, params: any) {
    return this.http.get<any>(environment.API_URL + "/products/" + category, {params});
  }

  public search(searchProduct: SearchProduct, params: any) {
    return this.http.post<any>(environment.API_URL + "/products/search", searchProduct, {params});
  }
}
