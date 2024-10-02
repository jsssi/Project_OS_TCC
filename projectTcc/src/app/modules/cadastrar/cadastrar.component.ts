import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { userService } from '../../service/user.service';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: '../login/login.component.scss'
})
export class CadastrarComponent  implements OnInit {
  registerForm!: FormGroup;
  constructor(private UserStorage: userService ) {
    this.registerForm = new FormGroup({
      nome: new FormControl(""),
      email: new FormControl(""),
      senha: new FormControl(""),
    });
  }
  ngOnInit(): void {
    const resultShowUser = this.UserStorage.ShowAllUsers();
    console.log(resultShowUser)
  }

  onSubmit() {
    const{ nome, senha, email } = this.registerForm.value;
    this.UserStorage.RegisterUser({nome, email, senha});
  }

}
