import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { CompanyComponent }    from './company/company.component';
import { CreateCompanyComponent }    from './create-company/create-company.component';


export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'company', component: CompanyComponent},
  {path: 'create-company',component: CreateCompanyComponent},
  {path: 'create-company/:CompanyID',component: CreateCompanyComponent}
]);