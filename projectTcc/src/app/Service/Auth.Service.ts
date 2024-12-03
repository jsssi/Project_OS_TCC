import { Injectable } from "@angular/core";
import { usersWeb } from "../model/users";
import { employer } from "../model/employer";
import { UserService } from "./user.service";
import employerService from "./employer.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: usersWeb[] = [];
  emplooyer: employer[] = []

  constructor(
    private UserService: UserService,
    private emplooyerService: employerService,
    private Router: Router

  ) { }
  login(cpf: string, senha: string) {
    // Simula o login do usuário ou do empregador
    this.user = this.UserService.getUser();
    this.emplooyer = this.emplooyerService.getEmplyer();

    console.log(this.user)


  }

  LougOut() {
    // Simula o logout do usuário

  }
}
