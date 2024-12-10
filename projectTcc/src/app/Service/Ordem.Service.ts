import { Order } from './../model/Order';
import { Token } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { OrderServiceComponent } from "../modules/order-service/order-service.component";

import { employer } from "../model/employer";
import { usersWeb } from '../model/users';

@Injectable({
  providedIn : "root"
})

export  class OrderService{
  private _httClient : HttpClient

  constructor(HttpClient:HttpClient){
    this._httClient = HttpClient
  }
  setOrderService(order:Order , token:any ,userId:any){
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    order.client_id = userId;
    
    return this._httClient.post<{id:number}>('/Api/cos/os/create', order , {headers})
  }
}
