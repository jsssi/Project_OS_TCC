import { Injectable } from "@angular/core";
import { usersWeb } from "../model/Users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user?: usersWeb[] = [];
  constructor() { }

  RegisterUser(name: string, email: string, password: string) {
    const UserFormValue: usersWeb = { name, email, password }
    this.user?.push(UserFormValue)
    console.log(this.user)
    localStorage.setItem('DB', JSON.stringify(this.user))
  }
  ShowAllUsers() {
    if (localStorage.getItem('DB')) {
      this.user = JSON.parse(localStorage.getItem('DB') ?? '[]')
    } else {
      this.user = [];
    }
  }
  login(name?: string, password?: string) {
    // Verifica se há dados no localStorage
    const db = localStorage.getItem('DB');
    var userExists;

    if (db) {
      this.user = JSON.parse(db);
      userExists = this.user?.some(user => {
        return user.name === name && user.password === password;
      });

      if (userExists) {
        console.log(userExists)
        return true;
      }
    }
    console.log(userExists)
    return [];
  }
  removeDB() {
    localStorage.removeItem('DB');
    localStorage.setItem('DB', JSON.stringify([]))
    console.log('Chave DB removida e array Removido');
  }


}
