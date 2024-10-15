import { Routes } from '@angular/router'
import { LoginPagComponent } from './modules/login-pag/login-pag.component';


export const routes: Routes = [


  {
    path: 'login',
    component: LoginPagComponent
  },
  {

    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

]
