import { Routes } from '@angular/router';
import { CanActivateHomeGuard } from './Guard/can-deactivate.guard';
//components
import { LoginPageComponentComponent } from './modules/login-page-component/login-page-component.component';

import { HomeComponent } from './modules/home/home.component';


import { ClientPageComponent } from './modules/client-page/client-page.component';
import { ProductPageComponent } from './modules/product-page/product-page.component';
import { OrderServiceComponent } from './modules/order-service/order-service.component';
import { EmplooyerGerenteComponent } from './modules/emplooyer-gerente/emplooyer-gerente.component';

export const routes: Routes = [

  {
    path: 'cos/auth/login',
    component: LoginPageComponentComponent
  },
  {
    path: 'cos/home',
    component: HomeComponent
  },
  {
    path: 'cos/clientes',
    component: ClientPageComponent
  },
  {
    path: 'cos/products',
    component: ProductPageComponent
  },
  {
    path: 'cos/OSCos',
    component: OrderServiceComponent
  },
  {
    path: 'cos/auth/Register',
    component:EmplooyerGerenteComponent
  },
  {
    path: '',
    redirectTo: '/cos/auth/login',
    pathMatch: 'full'
  },

]
