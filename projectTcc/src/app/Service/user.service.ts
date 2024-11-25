import { Injectable, OnInit } from "@angular/core";
import { usersWeb } from "../model/users";

@Injectable({
  providedIn: 'root',
})

export class UserService implements OnInit{
  private user:usersWeb[]=[];
  constructor() { }

  ngOnInit(): void {
      this.LoadUserInLocalStorage();
  }

 private LoadUserInLocalStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
  }

  private SaveUserInLocalStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }
  setUser(user:usersWeb){
    this.user.push(user);
    this.SaveUserInLocalStorage();
  }
  getUser(){
    return this.user;
  }
}
