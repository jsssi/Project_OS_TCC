import { AfterViewInit, Component } from '@angular/core';
import { NavBarComponent } from "../modules/nav-bar/nav-bar.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../Service/user.service';

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

  OrderForm!: FormGroup;
  constructor(private userService: UserService) { }

  ngAfterViewInit(): void {
    this.OrderForm = new FormGroup({
      nome:          new FormControl('', Validators.required),
      email:         new FormControl('', [Validators.required, Validators.email]),
      cpf:           new FormControl('', Validators.required),
      numeroCliente: new FormControl('', [Validators.required, Validators.pattern(/^\+\d{1,3}-\d{1,14}$/)]),
      modelo:        new FormControl('',Validators.required),
      problema:      new FormControl('', Validators.required),

    });
  }
}
