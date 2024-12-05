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
  private apiUrl = 'http://localhost:8080/cos/product';

  constructor(httpClient: HttpClient, private authService: AuthService){
    this._httpClient = httpClient;
  }

  getAllProducts(): Observable<product[]>{
   return this._httpClient.get<product[]>(`${this.apiUrl}`);
  }

  getProduct(id: Number): Observable<product>{
    return this._httpClient.get<product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: any): Observable<any>{
    console.log('entrou porra');
    const headers = new HttpHeaders(
     {'Authorization': `Bearer ${this.authService.getToken()}`}
    );

    console.log(this.authService.getToken());
    return this._httpClient.post(`${this.apiUrl}/create`, product, { headers });
  }

  removeProduct(id: Number){
    return this._httpClient.delete(`${this.apiUrl}/delete/${id}`);
  }




}
