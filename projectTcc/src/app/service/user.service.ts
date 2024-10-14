import { Injectable } from "@angular/core";
import { usersWeb } from "../model/Users";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    user?: usersWeb[] = [];
    constructor() { }

    RegisterUser(name: string,  email: string,password: string) {
        const UserFormValue: usersWeb = { name, email, password}
        this.user?.push(UserFormValue)
        console.log(this.user)
        localStorage.setItem('DB', JSON.stringify(this.user))
    }
    ShowAllUsers() {
        if (localStorage.getItem('DB')) {
            this.user = JSON.parse(localStorage.getItem('DB') ?? '[]')
        }else{
            this.user = [];
        }
    }
    login(name:string){
      if(localStorage.getItem('DB')) {
          this.user = JSON.parse(localStorage.getItem('DB')?? '[]')
          this.user?.map(user =>{
           if(name  === user.name){
            console.log("nome ja existente")
           }
          })
      }else{
        console.log("nenhum usuario cadastrado");
      }
    }

}
