import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

<<<<<<< HEAD
=======

>>>>>>> dev2_Senai





@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet,RouterLink , RouterLinkActive],
=======
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
>>>>>>> dev2_Senai
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class AppComponent {
  title = 'projectTcc';
}
