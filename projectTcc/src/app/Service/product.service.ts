import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { product } from "../model/product";

@Injectable({
  providedIn: "root"
})

export class productService{
  private _httpClient: HttpClient;
  private apiUrl = 'http://localhost:8080/cos/product';

  constructor(httpClient: HttpClient){
    this._httpClient = httpClient;
  }

  getAllProducts(): Observable<product[]>{
   return this._httpClient.get<product[]>(`${this.apiUrl}`);
  }

  getProduct(id: Number): Observable<product>{
    return this._httpClient.get<product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: product){
    return this._httpClient.post(`${this.apiUrl}/create`, product);
  }

  removeProduct(id: Number){
    return this._httpClient.delete(`${this.apiUrl}/delete/${id}`);
  }




}
