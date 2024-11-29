import { AfterViewChecked, Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [NavBarComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements AfterViewChecked{
   ProductForm!: FormGroup

  ngAfterViewChecked(): void {
    this.ProductForm = new FormGroup({
      name: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      integer: new FormControl('', Validators.required)
    });
   }

}
