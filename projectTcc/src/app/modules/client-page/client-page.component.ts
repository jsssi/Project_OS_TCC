import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Component, NgModule, OnInit } from '@angular/core';
import { OrderService } from '../../Service/Ordem.Service';
import { AuthService } from '../../Service/Auth.Service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { NgFor } from '@angular/common';
import { usersWeb } from '../../model/users';
import { UserService } from '../../Service/user.service';
import { PhoneService } from '../../Service/phone.Service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-client-page',
  standalone:true,
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss'],
  imports: [NavBarComponent,
    NgFor,
    FormsModule
  ],
})
export class ClientPageComponent implements OnInit {
  token: any;
  
  
  order: any;
  cpf: string = '';
  
  constructor (private orderService : OrderService, private clientService:UserService, private authService: AuthService, private phoneService: PhoneService){}

  ngOnInit(): void {
    this.loadClients();
    this.token = this.authService.getToken();
  }
  
  clients: usersWeb[] = [];
  loadClients(){
    this.clientService.GetAllUsers(this.authService.getToken()).subscribe(
      (data) =>{
        this.clients = data;
      },
      (Error) =>{
        console.log('erro ao carregar os clientes');
      })
   }     
  GerarOdemDeSerice(OrderId:number) {
    console.log(OrderId)
    this.orderService.GetOrderServiceById(OrderId, this.token).subscribe(
      (order) => {
        const doc = new jsPDF();
  
        // Cabeçalho
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(22);
        doc.setTextColor(0, 102, 204);
        doc.text('Ordem de Serviço', 105, 20, { align: 'center' });
  
        // Logo
        const img = new Image();
        img.src = '../../../assets/Rectangle 8.png'; 
        doc.addImage(img, 'PNG', 10, 10, 20, 20);
        img.style.color = '#0000';
  
        // Tabela: Dados do Cliente
        const clientDetails = [
          ['Nome', `${order.client_id?.first_name || ''} ${order.client_id?.last_name || ''}`],
          ['Email', order.client_id?.email || 'Não informado'],
          ['CPF', order.client_id?.cpf || 'Não informado'],
          ['Endereço', order.client_id?.address || 'Não informado'],
          ['Telefone', order.client_id?.phone_number || 'Não informado'],
        ];
        doc.autoTable({
          startY: 50,
          head: [['Campo', 'Detalhe']],
          body: clientDetails,
          theme: 'grid',
          headStyles: {
            fillColor: [0, 102, 204],
            textColor: [255, 255, 255],
            fontSize: 10,
            halign: 'center',
          },
          bodyStyles: {
            fontSize: 10,
            halign: 'left',
          },
        });
  
        // Usar finalY do jsPDF
        const finalY1 = (doc as any).lastAutoTable.finalY;
  
        // Tabela: Dados do Telefone
        const phoneDetails = [
          ['Marca', order.client_id?.phone_id?.brand || ''],
          ['Modelo', order.client_id?.phone_id?.model || ''],
          ['Status', order.client_id?.phone_id?.phone_status || ''],
          ['Descrição do Problema', order.client_id?.phone_id?.problem_description || ''],
        ];
        doc.autoTable({
          startY: finalY1 + 10,
          head: [['Campo', 'Detalhe']],
          body: phoneDetails,
          theme: 'grid',
          headStyles: {
            fillColor: [0, 102, 204],
            textColor: [255, 255, 255],
            fontSize: 10,
            halign: 'center',
          },
          bodyStyles: {
            fontSize: 10,
            halign: 'left',
          },
        });
  
        // Usar finalY atualizado
        const finalY2 = (doc as any).lastAutoTable.finalY;
  
        // Tabela: Detalhes da Ordem de Serviço
        const orderDetails = [
          ['Descrição', order.description || 'Nao informado'],
          ['Material', order.material || 'Nao informado'],
          ['Data de Emissão', order.emission_date || 'Nao informado'],
          ['Data Estimada', order.estimatedTime || 'Nao informado'],
        ];
        doc.autoTable({
          startY: finalY2 + 10,
          head: [['Campo', 'Detalhe']],
          body: orderDetails,
          theme: 'grid',
          headStyles: {
            fillColor: [0, 102, 204],
            textColor: [255, 255, 255],
            fontSize: 10,
            halign: 'center',
          },
          bodyStyles: {
            fontSize: 10,
            halign: 'left',
          },
        });
  
        // Assinatura
        const finalY3 = (doc as any).lastAutoTable.finalY;
        doc.text('Assinatura do Cliente:', 10, finalY3 + 20);
        doc.line(10, finalY3 + 25, 200, finalY3 + 25);
  
        // Salvar o PDF
        doc.save('ordem_de_servico.pdf');
      }
    );
  }

  findByCpf() {
    console.log('coletando cpf');
  
    this.clientService.getClientByCpf(this.cpf, this.authService.getToken()).subscribe(
      (response:usersWeb ) => {  // Usando o tipo esperado
        this.clients = [response];  // Acessando o usuário dentro do objeto 'response'
        console.log(response);
      },
      (error) => {
        alert('Cliente não encontrado');
        this.clients = [];
        console.error('Erro ao buscar cliente:', error);
      }
    );
  }
  
  
  refresh(){
    if(this.cpf.trim() === ''){
      this.loadClients()
    }
  }

  deleteUserById(id: Number | undefined){
    this.clientService.deleteUser(id, this.authService.getToken()).subscribe(
      (Response) =>{
        alert('usuario apagado com sucesso');
        console.log("response: " , Response)
        this.loadClients();
      }, (Error) =>{
        console.error("error: ", Error);
      }
    )
  }
}
