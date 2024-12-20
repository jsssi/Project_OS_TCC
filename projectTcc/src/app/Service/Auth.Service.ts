import { Injectable } from "@angular/core";
import { usersWeb } from "../model/users";
import { employer } from "../model/employer";
import { UserService } from "./user.service";
import employerService from "./employer.service";
import { Router } from "@angular/router";
import { HttpBackend, HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _httpClient: HttpClient;
  private tokenKey = 'token';

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();

  constructor(httpClient: HttpClient){
    this._httpClient = httpClient;

    const token = localStorage.getItem(this.tokenKey);

    if(token){
      this.currentUserSubject.next(token);
    }
  }


  login(email: string, password: string) {
    return this._httpClient.post<any>(`/Api/cos/auth/login`, {email, password}).pipe( catchError(Error =>{
      console.error('Erro ao fazer o login', Error);
      throw Error;
    }));
  }


  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Obter o token armazenado
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
  
  // Logout - Remover o token do localStorage e atualizar o estado
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);  // Atualiza o estado para null, indicando que o usuário não está mais autenticado
  }
}
