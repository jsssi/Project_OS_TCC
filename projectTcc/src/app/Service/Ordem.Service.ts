import { Order } from './../model/Order';
import { Token } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { OrderServiceComponent } from "../modules/order-service/order-service.component";

import { employer } from "../model/employer";
import { usersWeb } from '../model/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn : "root"
})

export  class OrderService{
  private _httClient : HttpClient

  constructor(HttpClient:HttpClient){
    this._httClient = HttpClient
  }
  setOrderService(order: Order, token: any): Observable<{ id: number }> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this._httClient.post<{ id: number }>('/Api/cos/os/create', order, { headers });
  }
  GetOrderServiceById(idOrder: number, token: string) {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this._httClient.get<Order>(`/Api/cos/os/${idOrder}`, { headers });
  }


}
