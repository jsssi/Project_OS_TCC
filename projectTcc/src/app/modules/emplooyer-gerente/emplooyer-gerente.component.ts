import { AuthService } from './../../Service/Auth.Service';
import employerService from '../../Service/employer.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { employer } from './../../model/employer';
import { Component, OnInit } from '@angular/core';
import { Token } from '@angular/compiler';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-emplooyer-gerente',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './emplooyer-gerente.component.html',
  styleUrl: './emplooyer-gerente.component.scss',
})
export class EmplooyerGerenteComponent implements OnInit {
  token!:any
  employer = {

      first_name: 'Jefferson',
      last_name: 'Souza',
      email: 'Jeffesilva546@gmail.com',
      cpf: '07788881503',
      password: '1234567',
      phone_number: '71988381575',
      type_employee: 'Atendente',


  };

  constructor(private employerService: employerService , private AuthService : AuthService) {}
  ngOnInit(): void {
     this.token = this.AuthService.getToken();

   this.employerService.GetALLEmployeers(this.token).subscribe(
    (Response)=>{
      console.log("Funcioanrios Cadastrados", Response)
    },
    (error)=>{
      console.log("Erorr", error.error.message)
      
    }

   );
  }
  onSubmit(){
    this.employerService.registerEmplooyer(this.employer).subscribe(
      (Response)=>{
        console.log('Funcionario Registrado com sucesso',Response)
      },
      (Error)=>{
        console.log('Error',Error)
      }

    )
  }
}
