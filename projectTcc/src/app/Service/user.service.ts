import { Token } from '@angular/compiler';
import { usersWeb } from './../model/users';
import { phone } from './../model/Phone';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Order } from '../model/Order';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _httpClient: HttpClient;
  constructor(HttpClient: HttpClient) {
    this._httpClient = HttpClient;
  }

  CreateUser(user:usersWeb, phoneId: phone, token: any , OrderId:number){
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    user.phone_id = phoneId.id;  // Atribui o ID do telefone
    user.order_id = OrderId;  // Atribui o ID da ordem de serviço

    return this._httpClient.post<{ id: number }>('/Api/cos/client/create', user, { headers });
  }
  GetAllUsers(token: any){
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this._httpClient.get<usersWeb[]>('/Api/cos/client', { headers });
  }

  getClientByCpf(cpf: String, token: any){
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this._httpClient.get<usersWeb>(`/Api/cos/client/${cpf}`, { headers });
  }
  UpdateUser(client: any, token:any){
   const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
   return this._httpClient.put<any>('/Api/cos/client/update', client, {headers})
  }

  deleteUser(id: Number | undefined, token:any){
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this._httpClient.delete(`/Api/cos/client/delete/${id}`, { headers });
  }

}
