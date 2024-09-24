import { Routes } from '@angular/router';

import { LoginComponent } from './modules/login/login.component';

import { HomeComponent } from './modules/home/home.component';
import { CadastrarComponent } from './modules/cadastrar/cadastrar.component';


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
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

]
