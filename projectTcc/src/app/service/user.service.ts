import { Injectable } from "@angular/core";
import { usersWeb } from "../model/Users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user?: usersWeb[] = [];

  constructor() { }
  private validatorUser(name: string, password: string) {
    //validaçao privada de usuarios
   try {
      const db = localStorage.getItem('DB');
      if (!db) {
        console.log('Nenhum usuário encontrado no localStorage');
        return false;
      }
      this.user = JSON.parse(db);
      const validator = this.user?.some(user => {
         return user.name === name && user.password === password;
      });

      if (validator) {

        return true;
      } else {
        console.log('Usuário ou senha inválidos');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }

    return false;

  }
  public RegisterUser(name: string, email: string, password: string) {
    const UserFormValue: usersWeb = { name, email, password }
    this.user?.push(UserFormValue)
    console.log(this.user)
    localStorage.setItem('DB', JSON.stringify(this.user))
  }
  public ShowAllUsers() {
    if (localStorage.getItem('DB')) {
      this.user = JSON.parse(localStorage.getItem('DB') ?? '[]')
    } else {
      this.user = [];
    }
  }

  public login(name: string, password: string) {
    console.log(this.validatorUser(name, password))
    return this.validatorUser(name, password);
  }

  public removeDB() {
    localStorage.removeItem('DB');
    localStorage.setItem('DB', JSON.stringify([]))
    console.log('Chave DB removida e array Removido');
  }


}
