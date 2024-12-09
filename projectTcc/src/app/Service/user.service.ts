import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import { usersWeb } from "../model/Users";

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private _httpClient:HttpClient
  constructor(HttpClient:HttpClient) {
    this._httpClient = HttpClient;
  }

  CreateUser(user:any , token :any){

    const headers = new HttpHeaders(
      {'Authorization': `Bearer ${token}`}
     );

    return this._httpClient.post<any>('/Api/cos/client/create',user,{headers}).pipe(catchError  (error =>{
      console.log("error",error)
      throw error;
    }))
  }
  GetAllUsers(token:any): Observable<usersWeb[]> {

    const headers = new HttpHeaders(
      {'Authorization': `Bearer ${token}`}
     );

    return this._httpClient.get<usersWeb[]>('/Api/cos/client',{headers});
  }

}
