import { AuthService } from './../../Service/Auth.Service';
import { AfterViewInit, Component, Directive, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../Service/user.service';
import { OrderService } from '../../Service/Ordem.Service';
import { Order } from '../../model/Order';
import { usersWeb } from '../../model/users';
import { phone } from '../../model/Phone';
import { PhoneService } from '../../Service/phone.Service';
import { NgClass, NgIf } from '@angular/common';
import { ValidatorsUtils } from '../../utils/Validators.utils';
import { FormatePhoneNumberDirective } from '../../directives/telefone-mask.directive';

@Component({
  selector: 'app-order-service',
  standalone: true,
  imports: [
    NavBarComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgClass,
    FormatePhoneNumberDirective,
  ],
  templateUrl: './order-service.component.html',
  styleUrl: './order-service.component.scss',
})
export class OrderServiceComponent implements OnInit {
  //Formularios
  ClienteForm!: FormGroup;
  PhoneForm!: FormGroup;

  //Model
  orders: Order[] = [];
  user: usersWeb[] = [];

  today = new Date();
  dia = this.today.getDate();
  mes = this.today.getMonth() + 1;
  ano = this.today.getFullYear();

  constructor(
    private userService: UserService,
    private OrderService: OrderService,
    private PhoneService: PhoneService,
    private AuthService: AuthService
  ) {}

  ngOnInit() {
    this.ClienteForm = new FormGroup({
      first_name: new FormControl('', ValidatorsUtils.required()),
      last_name: new FormControl('', ValidatorsUtils.required()),
      cpf: new FormControl('', ValidatorsUtils.validateCPF),

      email: new FormControl('', [
        ValidatorsUtils.required(),
        Validators.email,
      ]),
      adress: new FormControl('', [ValidatorsUtils.required()]),
      numberContact: new FormControl('', [
        ValidatorsUtils.required(),
        Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/),
      ]),
    });
    this.PhoneForm = new FormGroup({
      marca: new FormControl('', [ValidatorsUtils.required()]),
      modelo: new FormControl('', [ValidatorsUtils.required()]),
      problema: new FormControl('', [ValidatorsUtils.required()]),
    });

    console.log('Cliente registrado:', this.userService.getUser());
    console.log('Telefone registrado:', this.PhoneService.getPhone());
    console.log('orders:', this.OrderService.getOrderService());

  }
  get cpfError(): string | null {
    const control = this.ClienteForm.get('cpf');
    if (control?.hasError('cpfInvalid')) {
      return control.getError('cpfInvalid');
    }
    if (control?.hasError('required')) {
      return 'O CPF é obrigatório';
    }
    return null;
  }

  onSubmit() {
    const generatedPassword = String(
      Math.floor(Math.random() * 1000000)
    ).padStart(6, '0');

    const client: usersWeb = {
      first_name: this.ClienteForm.get('first_name')?.value,
      last_name: this.ClienteForm.get('last_name')?.value,
      cpf: this.ClienteForm.get('cpf')?.value,
      email: this.ClienteForm.get('email')?.value,
      adress: this.ClienteForm.get('adress')?.value,
      password: '',
      numberContact: this.ClienteForm.get('numberContact')?.value,
    };
    const phone: phone = {
      Marca: this.PhoneForm.get('marca')?.value,
      Modelo: this.PhoneForm.get('modelo')?.value,
      ProblemaRelatado: this.PhoneForm.get('ProblemaRelatado')?.value,
    };

    const ordemServico: Order = {
      orderId: Math.floor(Math.random() * 100000000000),
      description: 'celular de fulano de tal',
      status: 'Em andamento',
      date: `${String(this.dia).padStart(2, '0')}/${String(this.mes).padStart(
        2,
        '0'
      )}/${this.ano}`,
      price: '190',
      user: {
        first_name: this.ClienteForm.get('first_name')?.value,
        last_name: this.ClienteForm.get('last_name')?.value,
        cpf: this.ClienteForm.get('cpf')?.value,
        email: this.ClienteForm.get('email')?.value,
        adress: this.ClienteForm.get('adress')?.value,
        password: generatedPassword,
        numberContact: this.ClienteForm.get('numberContact')?.value,
      },

      phone: {
        Marca: this.PhoneForm.get('marca')?.value,
        Modelo: this.PhoneForm.get('modelo')?.value,
        ProblemaRelatado: this.PhoneForm.get('ProblemaRelatado')?.value,
      },
    };

    this.userService.setUser(client);
    this.PhoneService.setPhone(phone);



    this.userService.updatePassword(
      generatedPassword,
      this.ClienteForm.get('cpf')?.value
    );


    console.log('Cliente registrado:', this.userService.getUser());
    console.log('Telefone registrado:', this.PhoneService.getPhone());
    console.log('orders:', this.OrderService.getOrderService())

    this.ClienteForm.reset();
    this.PhoneForm.reset();
  }
}
