import { UserService } from './../../Service/user.service';

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormGroup, FormBuilder, FormsModule, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { employer } from '../../model/employer';
import employerService from '../../Service/employer.service';
import { ValidatorsUtils } from '../../utils/Validators.utils';
import { AuthService } from '../../Service/Auth.Service';
@Component({
  selector: 'app-login-page-component',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page-component.component.html',
  styleUrl: './login-page-component.component.scss'
})
export class LoginPageComponentComponent implements OnInit {
  currentUser: any;

  constructor(
    private Router: Router,
    private AuthService:AuthService,
    private UserService:UserService

  ) { }


  FormLogin!: FormGroup;
  ngOnInit(): void {
    this.FormLogin = new FormGroup({
      email: new FormControl('', [ValidatorsUtils.required()]),
      senha: new FormControl('', [ValidatorsUtils.required()])
    })

  }
  navigate() {
    const email = this.FormLogin.get('email')?.value ;
    const senha = this.FormLogin.get('senha')?.value;

    this.AuthService.login(email, senha).subscribe(
      (Response) =>{
        this.AuthService.saveToken(Response.token);
        console.log("token: ",Response.token)
        this.Router.navigate(['/home']);
      },
      (Error) =>{
        console.log("error");
      }
    )
  }
}
