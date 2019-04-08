import { Component, OnInit,Inject } from '@angular/core';
import {  
  Http,  
  Headers  
} from '@angular/http';  
import {  
  InvoiceItemService  
} from '../../shared/services/invoiceItem.service'   
import {  
  Router,  
  ActivatedRoute  
} from '@angular/router';  


//import { Router } from '@angular/router';
//import { ConfigService } from '../utils/config.service';

@Component({
  selector: 'app-invoiceItem',
  templateUrl: './invoiceItem.component.html',
  styleUrls: ['./invoiceItem.component.css']
})

export class InvoiceItemComponent {
  public invoiceItemlist: any[]; 

  errorMessage: any;
  public invoiceItem: any[];  
  constructor(public http: Http, private _router: Router, private _invoiceItemService:InvoiceItemService,private _Activatedroute:ActivatedRoute) {  

    this.getInvoiceItems();

  }  
  
  getInvoiceItems() {  
    this._invoiceItemService.getInvoiceItems().subscribe(data => {
    this.invoiceItemlist = data;
    console.log(this.invoiceItemlist);
    }, 
    error=> {
        console.log(error);
    });

}  

  deleteInvoiceItem(Id: number) {  
      var ans = confirm("Do you want to delete invoiceItem with Id: " + Id);  
      if (ans) {  
          this._invoiceItemService.deleteInvoiceItem(Id).subscribe((data) => {  
              //this.getInvoicesCompany();  
          }, error => console.error(error))  
      }  
  }   
}  