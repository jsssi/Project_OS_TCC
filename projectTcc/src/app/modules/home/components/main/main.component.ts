import { Component } from '@angular/core';
import { SectionComponent } from "./section/section.component";
import { NavbarrightComponent } from "./navbarright/navbarright.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SectionComponent, NavbarrightComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
