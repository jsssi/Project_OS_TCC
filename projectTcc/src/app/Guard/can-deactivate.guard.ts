import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service/User.service';


@Injectable({
  providedIn: 'root',
})
export class CanActivateHomeGuard implements CanActivate {

  constructor(private router: Router,private UserService : UserService) {}

  canActivate(): boolean {
    // Simula se o usuário está autenticado ou não
    const isAuthenticated = this.checkUserAuthentication();

    if (!isAuthenticated) {
      // Se o usuário não estiver autenticado, redireciona para a página de login
      this.router.navigate(['/login']);
      alert('usuario ou senha invalidos')
      console.log('usuario nao autenticado')
      return false;
    }
    console.log('usuario autenticado')

    // Se o usuário estiver autenticado, permite a navegação para a rota desejada
     return true;
  }


   checkUserAuthentication(): boolean {

    return false;
  }

}
//estudar mais sobre
