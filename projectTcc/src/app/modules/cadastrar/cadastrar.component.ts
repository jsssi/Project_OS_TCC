import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './cadastrar.component.html',
  styleUrl:'../login/login.component.scss'
})
export class CadastrarComponent {

}
