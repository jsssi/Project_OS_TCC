import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { CanActivateHomeGuard } from './Guard/can-deactivate.guard';
//components
import { LoginPageComponentComponent } from './modules/login-page-component/login-page-component.component';

import { HomeComponent } from './modules/home/home.component';


import { ClientPageComponent } from './modules/client-page/client-page.component';
import { ProductPageComponent } from './modules/product-page/product-page.component';
import { OrderServiceComponent } from './modules/order-service/order-service.component';
import { EmplooyerGerenteComponent } from './modules/emplooyer-gerente/emplooyer-gerente.component';
import { ProductListPageComponent } from './modules/product-list-page/product-list-page.component';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginPageComponentComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'clientes',
    component: ClientPageComponent
  },
  {
    path: 'product',
    component: ProductPageComponent
  },
  {
    path: 'OSCos',
    component: OrderServiceComponent
  },
  {
    path: 'cos/auth/Register',
    component:EmplooyerGerenteComponent
  },
  {
    path: "products-list",
    component: ProductListPageComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

]
