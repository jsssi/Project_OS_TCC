import { ProductService } from './../../Service/product.service';
import { AuthService } from './../../Service/Auth.Service';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { product } from '../../model/product';

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [NgFor,FormsModule, NavBarComponent],
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.scss'
})
export class ProductListPageComponent implements OnInit {

  products: product[] = [];

  name: String = '';


  constructor(private authService: AuthService, private productService: ProductService){
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    this.productService.getAllProducts(this.authService.getToken()).subscribe(
      (Response) =>{
        this.products = Response;
        console.log(Response)
      },
      (Error) =>{
        console.log('erro ao carregar o produto');
      }
    );
  }

  deleteProductById(id: Number | undefined){
    this.productService.removeProduct(id, this.authService.getToken()).subscribe(
      (Response) =>{
        alert('produto apagado com sucesso');
        console.log( "response", Response)
        this.loadProduct();
      }, (Error) =>{
        console.error('error', Error);
      }
    )
  }


  refresh(){
    if(this.name.trim() === ''){
      console.log('refresh')
    }
  }
}
