import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-hearder',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './hearder.component.html',
  styleUrl: './hearder.component.scss'
})
export class HearderComponent {

}
