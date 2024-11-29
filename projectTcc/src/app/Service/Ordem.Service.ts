import { Injectable } from "@angular/core";
import { OrderServiceComponent } from "../order-service/order-service.component";
import { Order } from "../model/Order";

@Injectable({
  providedIn : "root"
})

export  class OrderService{
  private Order : Order[]=[];
  constructor(){
    this.loadLocalStorage();
  }
  private loadLocalStorage(){
    const data = localStorage.getItem('orderService')
    if(data){
      this.Order = JSON.parse(data);
    }
  }
  private SaveInLocalStorage(){
    localStorage.setItem('orderService', JSON.stringify(this.Order));
  }

  setOrderService(order: Order){
    this.Order.push(order);
    this.SaveInLocalStorage();
  }
  getOrderService(){
    return this.Order;
  }
  getOrderServiceFindClient(){

  }
}
