import { Injectable, NgModule } from "@angular/core";
import { Users } from "../model/users";

@Injectable({
  providedIn: 'root'
})
export class userService {
  user?:Users[] = [];
  constructor() {}
  RegisterUser(user:{nome : string , senha : string , email :string}){
    const users = JSON.parse(localStorage.getItem('DB') ?? '[]'); // Carrega o array existente ou cria um novo array
    users.push(user); // Adiciona o novo usuário
    localStorage.setItem('DB', JSON.stringify(users)); // Salva novamente no localStorage
    console.log('Usuário adicionado:', users);
  }
  ShowAllUsers(){
   if(localStorage.getItem('DB')){
    this.user = JSON.parse(localStorage.getItem('DB')?? '[]');
    console.log('entrei aqui')
    console.log(localStorage.getItem('DB'));
   }else{
    console.log(localStorage.getItem('DB'));
    this.user = [];

   }
  }
}
