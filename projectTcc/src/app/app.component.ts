import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
<<<<<<< HEAD

<<<<<<< HEAD
=======

>>>>>>> dev2_Senai
=======
import { NavBarComponent } from "./modules/nav-bar/nav-bar.component";
>>>>>>> 30bb6556637fb4ebc57f2eb41913b520f33633e8





@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
<<<<<<< HEAD
  imports: [RouterOutlet,RouterLink , RouterLinkActive],
=======
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
>>>>>>> dev2_Senai
  template: `<router-outlet></router-outlet>`,
=======
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NavBarComponent],
  template: `<router-outlet>
    <app-nav-bar></app-nav-bar>
  </router-outlet>`,
>>>>>>> 30bb6556637fb4ebc57f2eb41913b520f33633e8
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class AppComponent {
  title = 'projectTcc';
}
