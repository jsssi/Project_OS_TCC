import { Routes } from '@angular/router';
import { CanActivateHomeGuard } from './Guard/can-deactivate.guard';


export const routes: Routes = [

  {

    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

]
