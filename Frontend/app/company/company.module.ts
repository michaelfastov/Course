import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company/company.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule }   from '../shared/modules/shared.module';
import { routing }  from './company.routing';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { CompanyService } from '../shared/services/company.service';
import { FormsModule,ReactiveFormsModule}  from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    routing,SharedModule,
    CommonModule,
    FormsModule,
    routing,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,

    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [CompanyComponent, CreateCompanyComponent],
  providers: [CompanyService]
})
export class CompanyModule { }


