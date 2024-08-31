import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HearderComponent } from "./hearder/hearder.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HearderComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
