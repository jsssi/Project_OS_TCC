import { Routes } from '@angular/router';
import { CanActivateHomeGuard } from './Guard/can-deactivate.guard';
//components
import { LoginPageComponentComponent } from './modules/login-page-component/login-page-component.component';

import { HomeComponent } from './modules/home/home.component';
import { CadastroPageComponent } from './modules/cadastro-page/cadastro-page.component';

import { ClientPageComponent } from './modules/client-page/client-page.component';
import { ProductPageComponent } from './modules/product-page/product-page.component';
import { OrderServiceComponent } from './order-service/order-service.component';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginPageComponentComponent
  },
  {
    path: 'cadastrar',
    component: CadastroPageComponent

  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path :'clientes',
    component: ClientPageComponent
  },
  {
    path: 'products',
    component: ProductPageComponent
  },
  {
   path:'OSCos',
   component:OrderServiceComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

]
