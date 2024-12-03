import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormGroup, FormBuilder, FormsModule, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { usersWeb } from '../../model/users';
import { UserService } from '../../Service/user.service';
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
  constructor(
    private Router: Router,
    private AuthService:AuthService

  ) { }


  FormLogin!: FormGroup;
  ngOnInit(): void {
    this.FormLogin = new FormGroup({
      cpf: new FormControl('', [ValidatorsUtils.required()]),
      senha: new FormControl('', [ValidatorsUtils.required()])
    })
  }
  navigate() {
    const cpf = this.FormLogin.get('cpf')?.value ;
    const senha = this.FormLogin.get('senha')?.value;
    this.AuthService.login(cpf , senha)


  }
}
