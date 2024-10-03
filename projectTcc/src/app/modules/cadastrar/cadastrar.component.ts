import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, RequiredValidator } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,ReactiveFormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: '../login/login.component.scss'
})
export class CadastrarComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private UserService: UserService) {

    this.registerForm = new FormGroup({
      name: new FormControl(""),
      email: new FormControl(""),
      password: new FormControl(""),
    });
  }
  ngOnInit(): void {
    const resultShowUser = this.UserService.ShowAllUsers();
    console.log(resultShowUser)
    console.log(this.UserService.ShowAllUsers())
    this.UserService.removeDB()
  }


  onSubmit() {
    const { name, email, password } = this.registerForm.value;
    this.UserService.RegisterUser(name, email, password)
  }
}

