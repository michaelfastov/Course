import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { InvoiceComponent }    from './invoice/invoice.component';
import { CreateInvoiceComponent }    from './create-invoice/create-invoice.component';


export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'invoice', component: InvoiceComponent},
  { path: 'create-invoice/:InvoiceID', component: CreateInvoiceComponent},
  {path: 'create-invoice',component: CreateInvoiceComponent}
]);