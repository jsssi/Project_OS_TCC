import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../Service/Auth.Service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();  // Recupera o token do AuthService

    // Verifica se há token e se a requisição precisa do cabeçalho de autorização
    if (token) {
      // Clona a requisição e adiciona o token no cabeçalho Authorization
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      // Continua com a requisição clonada
      return next.handle(clonedRequest);
    }

    // Caso não haja token, apenas continua a requisição original
    return next.handle(req);
  }
}
