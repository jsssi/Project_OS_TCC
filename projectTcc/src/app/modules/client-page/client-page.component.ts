import { UserService } from './../../Service/user.service';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Service/Ordem.Service';
import { Order } from '../../model/Order';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { usersWeb } from '../../model/users';
import { AuthService } from '../../Service/Auth.Service';

@Component({
  selector: 'app-client-page',
  standalone: true,
  imports: [NgFor, NavBarComponent],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.scss'
})
export class ClientPageComponent  implements OnInit{

  clients:usersWeb[] = [];
  constructor (private OrderService : OrderService, private clientService:UserService, private authService: AuthService){}

  ngOnInit(): void {
    this.loadClients();
  }


  loadClients(){
    this.clientService.GetAllUsers(this.authService.getToken()).subscribe(
      (data) =>{
        this.clients = data;
      },
      (Error) =>{
        console.log('erro ao carregar os clientes');
      }
    )
  }
}
