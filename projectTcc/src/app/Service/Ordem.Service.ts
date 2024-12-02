import { Injectable } from "@angular/core";
import { OrderServiceComponent } from "../modules/order-service/order-service.component";
import { Order } from "../model/Order";
import { employer } from "../model/employer";

@Injectable({
  providedIn : "root"
})

export  class OrderService{
  private Order : Order[]=[];
  private employee : employer[] = [];


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
  FindOderForCpf(cpf:string){

  }
}
