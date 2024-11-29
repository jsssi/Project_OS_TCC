import { AfterViewInit, Component } from '@angular/core';
import { NavBarComponent } from "../modules/nav-bar/nav-bar.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../Service/user.service';
import { OrderService } from '../Service/Ordem.Service';
import { Order } from '../model/Order';

@Component({
  selector: 'app-order-service',
  standalone: true,
  imports: [
    NavBarComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './order-service.component.html',
  styleUrl: './order-service.component.scss'
})
export class OrderServiceComponent implements AfterViewInit {

  ClienteForm!: FormGroup;
  PhoneForm!: FormGroup;
  orders:Order[] = [];
  constructor(private userService: UserService , private OrderService:OrderService) { }

  ngAfterViewInit(): void {
    this.ClienteForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', Validators.required),
      numeroCliente: new FormControl('', [Validators.required, Validators.pattern(/^\+\d{1,3}-\d{1,14}$/)]),
    });
    this.PhoneForm = new FormGroup({

      modelo: new FormControl('', [Validators.required]),
      problema: new FormControl('', [Validators.required])

    });
  }
  ngOnInit(){
    this.OrderService.setOrderService({
      orderId: this.orders.length + 1,
      description: this.PhoneForm.value.problema,
      status: 'em andamento',
      date: new Date(),
      user:this.ClienteForm.value
    })
  }
}
