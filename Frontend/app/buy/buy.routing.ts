import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';


import { BuyComponent }    from './buy/buy.component';


export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'buy/:CompanyID', component: BuyComponent},

]);