import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: '../login/login.component.scss'
})
export class CadastrarComponent  implements OnInit {
  registerForm!: FormGroup;
  constructor(private localStorage: LocalStorageService) {
    this.registerForm = new FormGroup({
      nome: new FormControl(""),
      email: new FormControl(""),
      senha: new FormControl(""),
    });
  }
  ngOnInit(): void {
      console.log(this.localStorage.getAllUsers());
  }
  onSubmit() {
    const { nome, senha, email } = this.registerForm.value;
    this.localStorage.setUser(nome, senha, email);
    console.log(this.localStorage.toString());
  }

}
