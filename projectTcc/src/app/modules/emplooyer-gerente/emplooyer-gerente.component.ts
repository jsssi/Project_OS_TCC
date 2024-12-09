import { AuthService } from './../../Service/Auth.Service';
import employerService from '../../Service/employer.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { employer } from './../../model/employer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emplooyer-gerente',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './emplooyer-gerente.component.html',
  styleUrl: './emplooyer-gerente.component.scss',
})
export class EmplooyerGerenteComponent implements OnInit {
  employer = {

      first_name: 'Geraldo',
      last_name: 'Damasceno',
      email: 'Geranae1976@gmail.com',
      cpf: '15390692063',
      password: '1234567',
      phone_number: '71988381575',
      type_employee: 'atendente',


  };

  constructor(private employerService: employerService , private AuthService : AuthService) {}
  ngOnInit(): void {
    const token = this.AuthService.getToken();

   this.employerService.GetALLEmployeers(token).subscribe(
    (Response)=>{
      console.log("Funcioanrios Cadastrados", Response)
    },
    (Error)=>{
      console.log("Erorr", Error)
    }

   );
  }
}
