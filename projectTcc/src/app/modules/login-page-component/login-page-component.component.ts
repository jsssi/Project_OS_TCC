import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login-page-component',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './login-page-component.component.html',
  styleUrl: './login-page-component.component.scss'
})
export class LoginPageComponentComponent {
  constructor (private Router : Router){}

  navigate(){
     this.Router.navigate(['/home']);
   }
}
