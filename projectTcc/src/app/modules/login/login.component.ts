import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxIndexedDBModule, NgxIndexedDBService } from 'ngx-indexed-db';
import { UserService } from '../../service/User.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers : [NgxIndexedDBService , NgxIndexedDBModule]
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;

  constructor(private userService: UserService){
    this.loginForm = new FormGroup({
      name : new FormControl(""),
      password : new FormControl("")
    });
  }
  ngOnInit(): void {
    this.userService.ShowAllUsers()
  }

  onSubmit(){
    const {name , password }  = this.loginForm.value;
    this.userService.login(name , password)
    
  }
}
