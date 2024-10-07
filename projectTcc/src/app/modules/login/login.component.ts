import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../../service/user.service';
import { CanActivateHomeGuard } from '../../Guard/can-deactivate.guard';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers : []
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;

  constructor(private userService: UserService , private guardService: CanActivateHomeGuard){
    this.loginForm = new FormGroup({
      name : new FormControl(""),
      password : new FormControl("")
    });
  }
  ngOnInit(): void {

  }

  onSubmit(){
    const {name , password }  = this.loginForm.value;


  }
}
