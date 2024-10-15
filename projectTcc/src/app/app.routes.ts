import { Routes } from '@angular/router';
import { CanActivateHomeGuard } from './Guard/can-deactivate.guard';
import { LoginPageComponentComponent } from './modules/login-page-component/login-page-component.component';
import { CadastroPageComponent } from './modules/cadastro-page/cadastro-page.component';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginPageComponentComponent
  },
  {
    path:'cadastrar',
    component:CadastroPageComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

]
