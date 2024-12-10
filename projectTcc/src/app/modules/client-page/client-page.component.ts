import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Service/Ordem.Service';
import { Order } from '../../model/Order';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-client-page',
  standalone: true,
  imports: [NgFor, NavBarComponent],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.scss'
})
export class ClientPageComponent  implements OnInit{

  Orders:Order[] = [];
  constructor (private OrderService : OrderService){}

  ngOnInit(): void {
    
  }
}
