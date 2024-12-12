import { AuthService } from './Auth.Service';
import { product } from './../model/product';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})

export class ProductService{

  private _httpClient: HttpClient;

  constructor(httpClient: HttpClient, private authService: AuthService){
    this._httpClient = httpClient;
  }

  getAllProducts(token: any): Observable<product[]>{
    const headers = new HttpHeaders(
      {'Authorization': `Bearer ${token}`}
     );
    return this._httpClient.get<product[]>(`/Api/cos/product`, { headers });
  }

  getProduct(id: Number): Observable<product>{
    return this._httpClient.get<product>(`/Api/cos/product/${id}`);
  }

  addProduct(product: any, token?: any): Observable<any>{
    console.log('entrou porra');
    const headers = new HttpHeaders(
     {'Authorization': `Bearer ${token}`}
    );

    console.log(this.authService.getToken());
    return this._httpClient.post(`/Api/cos/product/create`, product, { headers });
  }

  removeProduct(id: Number | undefined, token: any){
    const headers = new HttpHeaders(
      {'Authorization': `Bearer ${token}`}
     );

    return this._httpClient.delete(`/Api/cos/product/delete/${id}`, { headers });
  }




}
