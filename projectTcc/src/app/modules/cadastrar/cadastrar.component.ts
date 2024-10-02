import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { users } from '../../model/Users';
import { UserService } from '../../service/User.service';


@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: '../login/login.component.scss'
})
export class CadastrarComponent  implements OnInit {
  registerForm!: FormGroup;

  constructor(private UserService : UserService) {
    this.registerForm = new FormGroup({
      nome: new FormControl(""),
      email: new FormControl(""),
      senha: new FormControl(""),
    });
  }
  ngOnInit(): void {
     console.log(this.UserService.ShowAllUsers())
  }
  onSubmit() {
    const  {nome , email , senha } = this.registerForm.value;
    console.log(nome , email , senha ) 
    this.UserService.RegisterUser(nome , email, senha )
  }

}
