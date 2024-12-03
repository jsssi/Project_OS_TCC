import { Injectable, OnInit } from "@angular/core";
import { usersWeb } from "../model/users";

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private user:usersWeb[]=[];
  constructor() { this.LoadUserInLocalStorage(); }


 private LoadUserInLocalStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
  }

  private SaveUserInLocalStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }
  updatePassword(newPassword:string , cpf:string){
   const DataUser = this.getUser()
   if(DataUser){
     const index = DataUser.findIndex(item => item.cpf === cpf);
     if(index !== -1){
       DataUser[index].password = newPassword;
       this.SaveUserInLocalStorage();

     }
   }
  }
  setUser(user:usersWeb){
    this.user.push(user);
    this.SaveUserInLocalStorage();
  }
  getUser(){
    return this.user;
  }
}
