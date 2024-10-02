import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LocalStorageService } from '../../service/local-storage.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;

  constructor(private localStorage: LocalStorageService){
    this.loginForm = new FormGroup({
      nome : new FormControl(""),
      senha : new FormControl("")
    });
  }
  ngOnInit(): void {

    console.log(this.localStorage.toString());
  }
  onSubmit(){
    const {nome , senha }  = this.loginForm.value
    this.localStorage.login(nome,senha)



  }
}
