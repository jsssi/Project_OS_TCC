import { AuthService } from './../../Service/Auth.Service';
import employerService from '../../Service/employer.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { employer } from './../../model/employer';
import { Component, OnInit } from '@angular/core';
import { Token } from '@angular/compiler';
import { catchError } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorsUtils } from '../../utils/Validators.utils';
import { FormatePhoneNumberDirective } from '../../directives/telefone-mask.directive';
import { FormarteCPF } from '../../directives/cpf-mask';

@Component({
  selector: 'app-emplooyer-gerente',
  standalone: true,
  imports: [
    NavBarComponent,
    ReactiveFormsModule,
    FormsModule,
    FormatePhoneNumberDirective,
    FormarteCPF
  ],
  templateUrl: './emplooyer-gerente.component.html',
  styleUrl: './emplooyer-gerente.component.scss',
})
export class EmplooyerGerenteComponent implements OnInit {
  token!:any;
  employeeForm!:FormGroup;



  constructor(private employerService: employerService , private AuthService : AuthService) {}
  ngOnInit(): void {
     this.token = this.AuthService.getToken();

    this.employeeForm = new FormGroup({
      first_name: new FormControl('', [ValidatorsUtils.required()]),
      last_name: new FormControl('',[ValidatorsUtils.required()]),
      cpf: new FormControl('',[ValidatorsUtils.required() , ValidatorsUtils.validateCPF]),
      email: new FormControl('',[ValidatorsUtils.required()]),
      password: new FormControl('',ValidatorsUtils.required()),
      phone_number: new FormControl('',ValidatorsUtils.required()),
      type_employee: new FormControl('',ValidatorsUtils.required())
    })
  }
  onSubmit(){
    const employer : employer = {
      first_name: this.employeeForm.get('first_name')?.value,
      last_name: this.employeeForm.get('last_name')?.value,
      cpf: this.employeeForm.get('cpf')?.value,
      email: this.employeeForm.get('email')?.value,
      password: this.employeeForm.get('password')?.value,
      phone_number: this.employeeForm.get('phone_number')?.value,
      type_employee: this.employeeForm.get('type_employee')?.value,
    }
    console.log(employer)
  }
}
