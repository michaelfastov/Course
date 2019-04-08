import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice/invoice.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule }   from '../shared/modules/shared.module';
import { routing }  from './invoice.routing';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { InvoiceService } from '../shared/services/invoice.service';
import { InvoiceItemService } from '../shared/services/invoiceItem.service';
import { FormsModule,ReactiveFormsModule}  from '@angular/forms';
import { CompanyService } from '../shared/services/company.service';
import { VendorService } from '../shared/services/vendor.service';
@NgModule({
  imports: [
    routing,SharedModule,
    CommonModule,
    FormsModule,
    routing,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  declarations: [InvoiceComponent, CreateInvoiceComponent],
  providers: [InvoiceService,CompanyService,VendorService,InvoiceItemService]
})
export class InvoiceModule { }


