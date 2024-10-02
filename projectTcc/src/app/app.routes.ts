import { Routes } from '@angular/router';

import { LoginComponent } from './modules/login/login.component';

import { HomeComponent } from './modules/home/home.component';
import { CadastrarComponent } from './modules/cadastrar/cadastrar.component';
import { ClientePageComponent } from './modules/cliente-page/cliente-page.component';


export const routes: Routes = [

  {
    path : 'home',
    component : HomeComponent
  },
  {
    path :'login',
    component: LoginComponent
  },
  {
    path:'cadastrar',
    component: CadastrarComponent
  },
  {
    path:'cliente',
    component: ClientePageComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

]
