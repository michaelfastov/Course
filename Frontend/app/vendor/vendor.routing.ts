import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { VendorComponent }    from './vendor/vendor.component';
import { CreateVendorComponent }    from './create-vendor/create-vendor.component';


export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'vendor', component: VendorComponent},
  { path: 'create-vendor/:VendorID', component: CreateVendorComponent},
  {path: 'create-vendor',component: CreateVendorComponent}
]);