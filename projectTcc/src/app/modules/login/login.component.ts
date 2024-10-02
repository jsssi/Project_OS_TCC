import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxIndexedDBModule, NgxIndexedDBService } from 'ngx-indexed-db';


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

<<<<<<< HEAD

=======
>>>>>>> 1328526c19019686a0beaa2ca086c31d19aae57e
  constructor(){
    this.loginForm = new FormGroup({
      nome : new FormControl(""),
      senha : new FormControl("")
    });
  }
  ngOnInit(): void {

<<<<<<< HEAD
=======
    
>>>>>>> 1328526c19019686a0beaa2ca086c31d19aae57e
  }

  onSubmit(){
    const {nome , senha }  = this.loginForm.value
<<<<<<< HEAD
=======
    

>>>>>>> 1328526c19019686a0beaa2ca086c31d19aae57e

  }
}
