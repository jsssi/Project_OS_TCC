import { Routes } from '@angular/router';

import { LoginComponent } from './modules/login/login.component';
import { CanActivateHomeGuard } from './Guard/can-deactivate.guard';
import { HomeComponent } from './modules/home/home.component';


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
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

]
