import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { CanActivateHomeGuard } from './modules/can-deactivate.guard';


export const routes: Routes = [
  {
    path : 'home',
    component : HomeComponent,
    canActivate:[CanActivateHomeGuard]
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

]
