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
  OsForm!: FormGroup;

  //Variaveis
  token!: any;
  UserExist?: boolean;

  constructor(
    private userService: UserService,
    private OrderService: OrderService,
    private PhoneService: PhoneService,
    private AuthService: AuthService
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

    const order: Order = {
      description : this.OsForm.get('description')?.value,
      material: this.OsForm.get('material')?.value,
      estimatedTime:this.OsForm.get('estimatedTime')?.value
    };

    this.ClienteForm.reset();
    this.PhoneForm.reset();

    this.CriarOrdem(phone, userLimpo , order);
  }

  CriarOrdem(phone: any, client: any, order: any): void {
    this.PhoneService.SetPhoneUser(phone, this.token)
      .pipe(
        switchMap((responsePhone) => {
          console.log('Telefone Registrado:', responsePhone.id);
          client.phone_id = responsePhone.id;

          return this.userService.CreateUser(client, responsePhone.id, this.token)
            .pipe(
              catchError((error) => {
                console.error('Erro ao criar usuário. Excluindo telefone...', error.error.message);
                return this.PhoneService.DeletePhone(responsePhone.id, this.token)
                  .pipe(
                    tap(() => console.log('Telefone excluído com sucesso!')),
                    catchError((deleteError) => {
                      console.error('Erro ao excluir telefone', deleteError);
                      return of(null); // Retorna null em caso de falha ao excluir o telefone
                    })
                  );
              })
            );
        }),
        catchError((error) => {
          console.error('Erro ao registrar telefone:', error);
          return of(null);
        })
      )
      .subscribe({
        next: (responseUser) => {
          if (responseUser) {
            console.log('Cliente Cadastrado com Sucesso:', responseUser);
            order.clientId = responseUser.id;  // Agora o ID do usuário é atribuído a order.clientId
            this.OrderService.setOrderService(order, this.token).subscribe(
              (ResponseOrder) => {
                console.log('Ordem Gerada com sucesso', ResponseOrder);
              },
              (Error) => {
                console.log('Error:', Error);
              }
            );
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
