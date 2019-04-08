import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceItemComponent } from './invoiceItem/invoiceItem.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule }   from '../shared/modules/shared.module';
import { routing }  from './invoiceItem.routing';
import { CreateInvoiceItemComponent } from './create-invoiceItem/create-invoiceItem.component';
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
  declarations: [InvoiceItemComponent, CreateInvoiceItemComponent],
  providers: [CompanyService,VendorService,InvoiceItemService]
})
export class InvoiceItemModule { }


