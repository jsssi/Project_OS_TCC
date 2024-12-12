import { UserService } from './user.service';
import { Order } from './../model/Order';
import { Token } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { OrderServiceComponent } from "../modules/order-service/order-service.component";

import { employer } from "../model/employer";
import { usersWeb } from '../model/users';
import { Observable } from 'rxjs';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn : "root"
})

export  class OrderService{
  private _httClient : HttpClient

  constructor(HttpClient:HttpClient , private UserService:UserService){
    this._httClient = HttpClient
  }
  setOrderService(order: Order, token: any): Observable<{ id: number }> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this._httClient.post<{ id: number }>('/Api/cos/os/create', order, { headers });
  }
  GetOrderServiceById(idOrder: number, token: string) {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this._httClient.get<Order>(`/Api/cos/os/${idOrder}`, { headers });
  }
  GerarOdemDeSerice(cpf:string , token:any) {

    this.UserService.getClientByCpf(token , cpf).subscribe((cliente) => {
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
        ['Nome', `${cliente.first_name || ''} ${cliente.last_name || ''}`],
        ['Email', cliente.email || 'Não informado'],
        ['CPF',     cliente.cpf || 'Não informado'],
        ['Endereço', cliente.address || 'Não informado'],
        ['Telefone', cliente.phone_number || 'Não informado'],
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
        ['Marca', cliente.phone_id?.brand || ''],
        ['Modelo', cliente.phone_id?.model || ''],
        ['Status', cliente.phone_id?.phone_status || ''],
        ['Descrição do Problema', cliente.phone_id?.problem_description || ''],
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
        ['Descrição', cliente.orderId.description || 'Nao informado'],
        ['Material', cliente.orderId.material || 'Nao informado'],
        ['Data de Emissão', cliente.orderId.estimatedTime || 'Nao informado'],
        ['Data Estimada', cliente.orderId.estimatedTime || 'Nao informado'],
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
    });
  }


}
