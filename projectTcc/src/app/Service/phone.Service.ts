import { Token } from '@angular/compiler';

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from 'rxjs';

@Injectable({
  providedIn: "root"
})

export class PhoneService {
  private _httpCLient:HttpClient

  constructor(HttpClient:HttpClient){
   this._httpCLient = HttpClient
  }
  SetPhoneUser(phone:any , token:any){
    const headers = new HttpHeaders(
      {'Authorization': `Bearer ${token}`}
     );

    return this._httpCLient.post<any>('/Api/cos/phone/create', phone,{headers}).pipe(catchError ((Error=>{
       console.log("error",Error)
       throw Error
    })))
  }
}
