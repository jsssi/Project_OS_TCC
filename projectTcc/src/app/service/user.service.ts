import { Injectable } from "@angular/core";
import { usersWeb } from "../model/users";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _httpCliente: HttpClient
  constructor (private httpClient:HttpClient){
    this._httpCliente = httpClient;
  }
}
