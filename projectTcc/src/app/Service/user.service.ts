import { Token } from '@angular/compiler';
import { usersWeb } from './../model/users';
import { phone } from './../model/Phone';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _httpClient: HttpClient;
  constructor(HttpClient: HttpClient) {
    this._httpClient = HttpClient;
  }

  CreateUser(user:any, phoneId: phone, token: any){
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    user.phone_id= phoneId
    
    return this._httpClient.post<{ id: number }>('/Api/cos/client/create', user, { headers });
  }
  GetAllUsers(token: any): Observable<usersWeb[]> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this._httpClient.get<usersWeb[]>('/Api/cos/client', { headers });
  }
  UpdateUser(token:any){
   const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
   return this._httpClient.put<any>('/Api/cos/cliente/update',{headers})
  }
 
}
