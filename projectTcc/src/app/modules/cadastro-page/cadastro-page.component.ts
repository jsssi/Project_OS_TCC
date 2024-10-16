import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-page',
  standalone: true,
  imports: [],
  template:`<main class="main-box">
  <div class="form_group">
    <h2 class="tittle">fazer cadastro</h2>
    <form action="" class="form">

      <input type="text" placeholder="Usuario">
      <input type="text" placeholder="Senha">
      <input type="text" placeholder="confirmar senha">

      <button type="button"   (click)="olamundo()" class="login_btn" >cadastrar</button>
    </form>

  </div>
  <div class="box_more_info">
    <img src="../../../assets/Rectangle 8.png" alt="logo">
  </div>
</main>
`,
  styleUrl: '../login-page-component/login-page-component.component.scss'
})
export class CadastroPageComponent {
  constructor(private Router:Router){}
   olamundo(){
    this.Router.navigate(['/login'])
   }
}
