import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';






@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink , RouterLinkActive],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class AppComponent {
  title = 'projectTcc';
}
