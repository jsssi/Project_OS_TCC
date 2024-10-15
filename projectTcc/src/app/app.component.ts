import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { NavBarComponent } from "./modules/nav-bar/nav-bar.component";
<<<<<<< HEAD
=======



>>>>>>> 384a0c29a6cae20c61d5d5524f74683d41dac041

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD

  imports: [RouterOutlet, RouterLink, RouterLinkActive, NavBarComponent],
  template: `<router-outlet></router-outlet>`,

=======
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NavBarComponent],
  template: `<router-outlet>
    <app-nav-bar></app-nav-bar>
  </router-outlet>`,
>>>>>>> 384a0c29a6cae20c61d5d5524f74683d41dac041
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'projectTcc';
}
