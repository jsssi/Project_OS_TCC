import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {

}
