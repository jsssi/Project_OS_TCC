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

  user: usersWeb = {
    name: "João Silva",
    email: "joao.silva@example.com",
    password: "senha123",
    numberContact: 123456789,
    cpf: "123.456.789-00",
    phone: [
      {
        model: "Samsung Galaxy S21",
        problem: "Bateria fraca",
        date: new Date(),
        status
      }
    ]
  };


  emplooyer: employer = {
    nome: "José Silva",
    ultimoNome: "Silva",
    cpf: "987.654.321-00",
    email: "jose.silva@example.com",
    senha: "senha456",
    NmrCell: "987654321",
    cargo: "Gerente"
  }
  ngOnInit(): void {
    this.FormLogin = new FormGroup({
      cpf: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
    })

    this.userService.setUser(this.user);
    this.emplooyerService.SetEmployer(this.emplooyer);


  }
  navigate() {
    const data = this.FormLogin.value;
    console.log(data);
    this.Router.navigate(['/home']);
  }
}
