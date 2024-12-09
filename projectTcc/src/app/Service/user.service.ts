import { Injectable, OnInit } from "@angular/core";
import { usersWeb } from "../model/users";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./Auth.Service";

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private user:usersWeb[]=[];


  private _httpClient: HttpClient;
  private apiUrl = 'http://localhost:8080/cos/client'

  constructor(httpClient:HttpClient) {
    this._httpClient = httpClient;
  }


  getClientByCpf(cpf: String): Observable<any>{
    return this._httpClient.get<usersWeb>(`${this.apiUrl}/${cpf}`);
  }

  createClient(client: usersWeb, token: String): Observable<any>{
   console.log('entrou');
    const headers = new HttpHeaders(
     {'Authorization': `Bearer ${token}`}
    );

    return this._httpClient.post(`${this.apiUrl}/create`, client, { headers});
  }


  updateClient(client: usersWeb, token: String): Observable<any>{
    console.log('entrou');
    const headers = new HttpHeaders(
      {'Authorization': `Bearer ${token}`}
    );

    return this._httpClient.put(`${this.apiUrl}/update`, client, { headers});
   }










}
