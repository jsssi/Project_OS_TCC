import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { product } from '../../model/product';
import { ValidatorsUtils } from '../../utils/Validators.utils';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    NavBarComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit{


  //Formulario
  ProductForm!: FormGroup

  //Models
  products: product[] = [];

  ngOnInit(){
    this.ProductForm = new FormGroup({
      name: new FormControl('', ValidatorsUtils.required()),
      brand: new FormControl('', ValidatorsUtils.required()),
      price: new FormControl('', ValidatorsUtils.required()),
      quantity: new FormControl('', ValidatorsUtils.required())
    });
  }

  OnSubmit(){
    const products: product ={
      name: this.ProductForm.get('name')?.value,
      brand: this.ProductForm.get('brand')?.value,
      price: this.ProductForm.get('price')?.value,
      quantity: this.ProductForm.get('quantity')?.value
    }

    console.log("Produto criado", products);
  }

}
