import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./modules/login/login.component";




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent,RouterLink , RouterLinkActive],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class AppComponent {
  title = 'projectTcc';
}
