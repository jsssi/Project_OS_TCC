import { Injectable } from "@angular/core";
import { phone } from "../model/Phone";

@Injectable({
  providedIn: "root"
})

export class PhoneService {
  private phone: phone[] = [];

  constructor() {
    this.LoadLocalStorage();
  }

  // Simula a criação de um número de telefone

  private LoadLocalStorage() {
    const data = localStorage.getItem('phone')
    if (data) {
      this.phone = JSON.parse(data);
    }
  }
  private SaveInLocalStorage() {
    localStorage.setItem('phone', JSON.stringify(this.phone));
  }

  setPhone(phone: phone) {
    this.SaveInLocalStorage();
    this.phone.push(phone)
  }
  getPhone() {
    return this.phone;
  }
}
