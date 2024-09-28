import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private users :{[keys : string]:any} = {};


  constructor() {
    this.loadFromLocalStorage();
  }


  private saveToLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }


  private loadFromLocalStorage(): void {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }


  setUser(username: string, password: string, email: string): void {
    const user = { username, password, email };
    this.users[username] = user;
    this.saveToLocalStorage();
  }


  getUser(username: string): any {
    return this.users[username] || null;
  }

  // Função para obter todos os usuários
  getAllUsers(): any[] {
    return Object.values(this.users);
  }

  // Função para remover um usuário
  deleteUser(username: string): void {
    delete this.users[username];
    this.saveToLocalStorage(); // Atualiza o LocalStorage após a exclusão
  }

  // Função para limpar todos os usuários
  clearAllUsers(): void {
    this.users = {};
    this.saveToLocalStorage(); // Atualiza o LocalStorage para remover todos os dados
  }

  // Apenas para depuração
  toString(): void {
    this.getAllUsers().map(
      (user) =>
        console.log(user.username,user.password , user.email)
    )
  }
  login(username: string, password: string){
     let result = false
     this.getAllUsers().map((user)=>{
        if(user.username === username && user.password === password){
          result = true;
        }
        return result
     })

  }
}


