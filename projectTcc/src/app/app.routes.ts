import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { CadastrarComponent } from './modules/cadastrar/cadastrar.component';
import { ClientePageComponent } from './modules/cliente-page/cliente-page.component';
import { CanActivateHomeGuard } from './Guard/can-deactivate.guard';


export const routes: Routes = [


  {
    path :'login',
    component: LoginComponent
  },
  {
    path:'cadastrar',
    component: CadastrarComponent
  },
  {
<<<<<<< HEAD

   path:'cliente',
   component: ClientePageComponent,
   canActivate:[CanActivateHomeGuard]
=======
    path:'cliente',
    component: ClientePageComponent
>>>>>>> 1328526c19019686a0beaa2ca086c31d19aae57e
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

]
