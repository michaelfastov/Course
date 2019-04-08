import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { InvoiceItemComponent }    from './invoiceItem/invoiceItem.component';
import { CreateInvoiceItemComponent }    from './create-invoiceItem/create-invoiceItem.component';


export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'invoiceItem', component: InvoiceItemComponent},
  { path: 'create-invoiceItem/:InvoiceID', component: CreateInvoiceItemComponent},
  {path: 'create-invoiceItem',component: CreateInvoiceItemComponent}
]);