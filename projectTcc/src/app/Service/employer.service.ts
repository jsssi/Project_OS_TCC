import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, first, Observable } from 'rxjs';
import { employer } from '../model/employer';

@Injectable({
  providedIn: 'root',
})
export default class employerService {
  private _httClient: HttpClient;

  constructor(HttpClient: HttpClient) {
    this._httClient = HttpClient;
  }

  registerEmplooyer(employer: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._httClient
      .post<any>('/Api/cos/auth/register', employer, { headers })
      .pipe(
        catchError((error) => {
          console.log('error', error);
          throw error;
        })
      );
  }
  GetALLEmployeers(token:any): Observable<employer[]> {

    const headers = new HttpHeaders(
      {'Authorization': `Bearer ${token}`}
     );

    return this._httClient.get<employer[]>('/Api/cos/employee',{headers});
  }
}
