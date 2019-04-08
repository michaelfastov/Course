import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule }   from '../shared/modules/shared.module';
import { routing }  from './buy.routing';
import { BuyComponent }    from './buy/buy.component';
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
  declarations: [BuyComponent],
  providers: [VendorService]
})
export class BuyModule { }


