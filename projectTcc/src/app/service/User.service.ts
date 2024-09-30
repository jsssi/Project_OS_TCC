import { Injectable } from "@angular/core";
import { users } from "../model/Users";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    user?: users[] = [];
    constructor() { }

    RegisterUser(name: string, password: string, email: string) {
        const UserFormValue: users = { name, password, email }
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

}