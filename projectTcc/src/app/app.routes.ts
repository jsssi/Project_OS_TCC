import { Routes } from '@angular/router';
import { CanActivateHomeGuard } from './Guard/can-deactivate.guard';
import { LoginPageComponentComponent } from './modules/login-page-component/login-page-component.component';
import { NavBarComponent } from './modules/nav-bar/nav-bar.component';
import { HomeComponent } from './modules/home/home.component';
import { CadastroPageComponent } from './modules/cadastro-page/cadastro-page.component';
import { FirstPageComponent } from './modules/first-page/first-page.component';

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
    path: 'welcome',
    component: FirstPageComponent
  },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },

]
