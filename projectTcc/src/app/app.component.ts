import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { NavBarComponent } from "./modules/nav-bar/nav-bar.component";
import { employer } from './model/employer';
import { UserService } from './Service/user.service';
import employerService from './Service/employer.service';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,

  ],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'projectTcc';
  constructor(
    private userService:UserService,
    private emplooyerService:employerService
  ){}

  ngOnInit(): void {
    const Users = this.userService.getUser();
    const emplooyer = this.emplooyerService.getEmplyer();
    console.log(Users)
    console.log(
      "<------------->"
    )
    console.log(emplooyer);
  }

}
