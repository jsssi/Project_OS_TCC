import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormGroup, FormBuilder, FormsModule, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { usersWeb } from '../../model/users';
import { UserService } from '../../Service/user.service';
import { employer } from '../../model/employer';
import employerService from '../../Service/employer.service';
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
    private userService: UserService,
    private emplooyerService: employerService
  ) { }


  FormLogin!: FormGroup;




  ngOnInit(): void {
    this.FormLogin = new FormGroup({
      cpf: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
    })

   


  }
  navigate() {
    const data = this.FormLogin.value;
    console.log(data);
    this.Router.navigate(['/home']);
  }
}
