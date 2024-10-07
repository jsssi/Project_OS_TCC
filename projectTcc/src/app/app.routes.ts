import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { ClientePageComponent } from './modules/cliente-page/cliente-page.component';
import { CanActivateHomeGuard } from './Guard/can-deactivate.guard';


export const routes: Routes = [


  {
    path: 'login',
    component: LoginComponent
  },
  {

    path: 'cliente',
    component: ClientePageComponent,
    canActivate: [CanActivateHomeGuard]
  },
  {

    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

]
