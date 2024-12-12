import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Service/Ordem.Service';
import { AuthService } from '../../Service/Auth.Service';
import { UserService } from '../../Service/user.service';
import { PhoneService } from '../../Service/phone.Service';
import { usersWeb } from '../../model/users';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-client-page',
  standalone:true,
  imports:[
    FormsModule,
    NgFor,
    NavBarComponent
  ],
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {
  token: any;
  order: any;
  cpf: string = '';
  clients: usersWeb[] = []; // Armazena a lista de clientes

  constructor(
    private orderService: OrderService,
    private clientService: UserService,
    private authService: AuthService,
    private phoneService: PhoneService
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.token = this.authService.getToken();
  }

  loadClients() {
    this.clientService.GetAllUsers(this.authService.getToken()).subscribe(
      (data) => {
        this.clients = data;
      },
      (error) => {
        console.log('Erro ao carregar os clientes');
      }
    );
  }

  // Função para gerar a ordem de serviço e associar o orderId ao cliente

  // Função para buscar clientes pelo CPF
  findByCpf() {
    console.log('coletando cpf');
    this.clientService.getClientByCpf(this.cpf, this.authService.getToken()).subscribe(
      (response: usersWeb) => {
        this.clients = [response]; // Acessando o usuário dentro do objeto 'response'
        console.log(response);
      },
      (error) => {
        alert('Cliente não encontrado');
        this.clients = [];
        console.error('Erro ao buscar cliente:', error);
      }
    );
  }

  refresh() {
    if (this.cpf.trim() === '') {
      this.loadClients();
    }
  }

  // Função para excluir um cliente
  deleteUserById(id: Number | undefined) {
    this.clientService.deleteUser(id, this.authService.getToken()).subscribe(
      (Response) => {
        alert('usuário apagado com sucesso');
        console.log('response:', Response);
        this.loadClients();
      },
      (Error) => {
        console.error('error:', Error);
      }
    );
  }
}
