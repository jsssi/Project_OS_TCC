
import { AuthService } from './../../Service/Auth.Service';
import { usersWeb } from '../../model/users';
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
import { phone } from '../../model/Phone';
import { PhoneService } from '../../Service/phone.Service';
import { NgClass, NgIf } from '@angular/common';
import { ValidatorsUtils } from '../../utils/Validators.utils';
import { FormatePhoneNumberDirective } from '../../directives/telefone-mask.directive';
import { Token } from '@angular/compiler';
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
  token!: any;
  UserExist?:boolean;

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

    //Segundo a ser enviado para o banco
    const client: usersWeb = {
      first_name: this.ClienteForm.get('first_name')?.value,
      last_name: this.ClienteForm.get('last_name')?.value,
      cpf: this.ClienteForm.get('cpf')?.value,
      email: this.ClienteForm.get('email')?.value,
      address: this.ClienteForm.get('adress')?.value,
      phone_number: this.ClienteForm.get('numberContact')?.value,
    };
    const userLimpo = this.limparCampos(client)


    this.ClienteForm.reset();
    this.PhoneForm.reset();


    this.criarCliente(phone, userLimpo);
  }

  criarCliente(phone: any , client: any):void{
    this.PhoneService
    .SetPhoneUser(phone, this.token)
    .pipe(
      switchMap((responsePhone) => {
        console.log('Telefone Registrado:', responsePhone.id);
        // Adiciona o ID do telefone ao cliente
        client.phone_id = responsePhone.id;

        // Tenta criar o usuário com o ID do telefone
        return this.userService.CreateUser(client, responsePhone.id, this.token).pipe(
          catchError((error) => {
            // Se a criação do usuário falhar, exclui o telefone
            console.log('Erro ao criar usuário. Excluindo telefone...', error.error.message);

            return this.PhoneService.DeletePhone(responsePhone.id, this.token).pipe(
              tap(() => console.log('Telefone excluído com sucesso!'))
            );
          })
        );
      }),
      catchError((error) => {
        // Se o registro do telefone falhar, interrompe o processo
        console.error('Erro ao registrar telefone:', error);
        return of(null);
      })
    )
    .subscribe({
      next: (responseUser) => {
        if (responseUser) {
          console.log('Cliente Cadastrado com Sucesso:', responseUser);
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
