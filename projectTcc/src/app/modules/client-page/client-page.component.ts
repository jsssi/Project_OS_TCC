import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-client-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.scss'
})
export class ClientPageComponent {
  users=[
    {name:'jefferson',info:'motorola',status:'em andamento',telefone:'(71)xxxx-xxxx',celular:"Motorola"}
  ]

}
