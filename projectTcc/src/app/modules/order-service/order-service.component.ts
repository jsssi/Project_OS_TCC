
import { AuthService } from './../../Service/Auth.Service';
import { usersWeb } from '../../model/users';
import { Component, numberAttribute, OnInit } from '@angular/core';
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
import { phone } from '../../model/Phone';
import { PhoneService } from '../../Service/phone.Service';
import { NgClass, NgIf } from '@angular/common';
import { ValidatorsUtils } from '../../utils/Validators.utils';
import { FormatePhoneNumberDirective } from '../../directives/telefone-mask.directive';

import { catchError, of, switchMap, tap } from 'rxjs';

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
  OsForm!: FormGroup;

  //Variaveis
  token!: any;
  UserExist?: boolean;

  constructor(
    private userService: UserService,
    private OrderService: OrderService,
    private PhoneService: PhoneService,
    private AuthService: AuthService,

  ) {}

  ngOnInit() {
    this.token = this.AuthService.getToken();

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
      brand: new FormControl('', [ValidatorsUtils.required()]),
      model: new FormControl('', [ValidatorsUtils.required()]),
      problem: new FormControl('', [ValidatorsUtils.required()]),
    });
    this.OsForm = new FormGroup({
      material    : new FormControl('', [ValidatorsUtils.required()]),
      description : new FormControl('',[ValidatorsUtils.required()]),
      estimatedTime : new FormControl('',[ValidatorsUtils.required()])
    });

    this.userService.GetAllUsers(this.token).subscribe(
      (Response) => {
        console.log('usuarios encontrados', Response);
      },
      (Error) => {
        console.log('error', Error);
      }
    );
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
    //Primeiro a ser enviado para o banco
    const phone: phone = {
      brand: this.PhoneForm.get('brand')?.value,
      model: this.PhoneForm.get('model')?.value,
      problem_description: this.PhoneForm.get('problem')?.value,
      phone_status: 'PENDENTE',
    };
    const order: Order = {
      description : this.OsForm.get('description')?.value,
      material: this.OsForm.get('material')?.value,
      estimatedTime:this.OsForm.get('estimatedTime')?.value
    };
    //Segundo a ser enviado para o banco
    const client: usersWeb = {
      first_name: this.ClienteForm.get('first_name')?.value,
      last_name: this.ClienteForm.get('last_name')?.value,
      cpf: this.ClienteForm.get('cpf')?.value,
      email: this.ClienteForm.get('email')?.value,
      address: this.ClienteForm.get('adress')?.value,
      phone_number: this.ClienteForm.get('numberContact')?.value,
    };
    const userLimpo = this.limparCampos(client);



    this.ClienteForm.reset();
    this.PhoneForm.reset();
    this.OsForm.reset();

    this.CriarOrdem(phone, userLimpo , order);
  }

  CriarOrdem(phone: any, client: usersWeb, order: Order): void {
    this.PhoneService.SetPhoneUser(phone, this.token)
      .pipe(
        switchMap((responsePhone) => {
          console.log('Telefone Registrado:', responsePhone.id);
          client.phone_id = responsePhone.id; // Atribuindo o id do telefone ao cliente

          return this.OrderService.setOrderService(order, this.token).pipe(
            tap((responseOrder) => {
              console.log('Ordem de Serviço Gerada:', responseOrder.id);
              client.order_id = responseOrder.id; // Atribuindo o id da ordem ao cliente
            }),
            switchMap(() =>
              this.userService.CreateUser(client, responsePhone, this.token, client.order_id)
            ),
            catchError((error) => {
              console.error('Erro ao criar ordem de serviço ou cliente:', error.error.message);

              // Excluir telefone em caso de falha
              return this.PhoneService.DeletePhone(responsePhone.id, this.token).pipe(
                tap(() => console.log('Telefone excluído com sucesso!')),
                catchError((deleteError) => {
                  console.error('Erro ao excluir telefone', deleteError);
                  return of(null);
                })
              );
            })
          );
        }),
        catchError((error) => {
          if (error && error.error && error.error.message) {
            console.error('Erro ao registrar telefone:', error.error.message);
          } else {
            console.error('Erro inesperado ao registrar telefone:', error);
          }
          return of(null);
        })

      )
      .subscribe({
        next: (responseUser) => {
          if (responseUser) {
            console.log('Cliente Cadastrado com Sucesso:', responseUser);
            this.OrderService.GerarOdemDeSerice(client.cpf); // Gera o PDF da ordem de serviço
          }
        },
        error: (error) => {
          console.error('Erro geral:', error);
        },
      });
  }

  limparCampos(user: any) {
    // Limpar o CPF
    user.cpf = user.cpf.replace(/[^\d]/g, ''); // Remove qualquer coisa que não seja número

    // Limpar o número de telefone
    user.phone_number = user.phone_number.replace(/[^\d]/g, ''); // Remove qualquer coisa que não seja número

    return user;
  }
}
