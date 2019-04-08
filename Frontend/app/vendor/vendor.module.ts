import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorComponent } from './vendor/vendor.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule }   from '../shared/modules/shared.module';
import { routing }  from './vendor.routing';
import { CreateVendorComponent } from './create-vendor/create-vendor.component';
import { VendorService } from '../shared/services/vendor.service';
import { FormsModule,ReactiveFormsModule}  from '@angular/forms';

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
  declarations: [VendorComponent, CreateVendorComponent],
  providers: [VendorService]
})
export class VendorModule { }


