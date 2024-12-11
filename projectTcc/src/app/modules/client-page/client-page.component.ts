import { Response } from './../../../../node_modules/@types/express-serve-static-core/index.d';
import { UserService } from './../../Service/user.service';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Service/Ordem.Service';
import { Order } from '../../model/Order';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { usersWeb } from '../../model/users';
import { AuthService } from '../../Service/Auth.Service';
import { FormsModule } from '@angular/forms';
import { PhoneService } from '../../Service/phone.Service';

@Component({
  selector: 'app-client-page',
  standalone: true,
  imports: [NgFor, NavBarComponent, FormsModule],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.scss'
})
export class ClientPageComponent  implements OnInit{

  clients:usersWeb[] = [];


  cpf: string = '';
  constructor (private OrderService : OrderService, private clientService:UserService, private authService: AuthService, private phoneService: PhoneService){}

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

  findByCpf(){
    console.log('coletando cpf');

    this.clientService.getClientByCpf(this.cpf, this.authService.getToken()).subscribe(
      (Response) =>{
        this.clients = [Response];
        console.log(Response)
      }, (Error) =>{
        alert('Cliente não encontrado');
        this.clients = [];
      });
  }

  refresh(){
    if(this.cpf.trim() === ''){
      this.loadClients()
    }
  }
}
