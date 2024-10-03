import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-cliente-page',
  standalone: true,
  imports: [],
  templateUrl: './cliente-page.component.html',
  styleUrl: './cliente-page.component.scss'
})
export class ClientePageComponent implements OnInit {
  constructor(private UserService:UserService){}
  ngOnInit(): void {

  }
}
