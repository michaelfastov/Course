import { Component, OnInit, Inject } from '@angular/core';
import {
    Http,
    Headers
} from '@angular/http';
import {
    InvoiceService
} from '../../shared/services/invoice.service'
import {
    Router,
    ActivatedRoute
} from '@angular/router';


//import { Router } from '@angular/router';
//import { ConfigService } from '../utils/config.service';

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent {
    public invoicelistCompany: any[];
    public invoicelistVendor: any[];
    public isAccepted: string;

    errorMessage: any;
    public invoice: any[];

    constructor(public http: Http, private _router: Router, private _invoiceService: InvoiceService, private _Activatedroute: ActivatedRoute) {

        this.getInvoicesCompany();
        this.getInvoicesVendor();
    }
    setDelivered(id: number) {

        this._invoiceService.getInvoiceById(id).subscribe(data => {
            //this.invoice = data;
            data.isDelivered = true;
            this._invoiceService.updateInvoice(id, data)
                .subscribe((data1) => {
                    this.getInvoicesCompany();
                }, error => this.errorMessage = error)
        });
    }
    setAccepted(id: number) {

        this._invoiceService.getInvoiceById(id).subscribe(data => {
            //this.invoice = data;
            data.isAccepted = true;
            this._invoiceService.updateInvoice(id, data)
                .subscribe((data1) => {
                    this.getInvoicesVendor();
                }, error => this.errorMessage = error)
        });
    }
    getInvoicesCompany() {
        this._invoiceService.GetInvoicesCompany().subscribe(data => {
            this.invoicelistCompany = data;
            console.log(this.invoicelistCompany);
        },
            error => {
                console.log(error);
            })
    }
    getInvoicesVendor() {
        this._invoiceService.GetInvoicesVendor().subscribe(data => {
            this.invoicelistVendor = data;
            console.log(this.invoicelistVendor);
        },
            error => {
                console.log(error);
            })
    }
    deleteInvoice(Id: number) {
        //this.checkIsAccpected(Id);


            var ans = confirm("Do you want to delete invoice with Id: " + Id);
            if (ans) {
                this._invoiceService.deleteInvoice(Id).subscribe((data) => {
                    this.getInvoicesCompany();
                }, error => console.error(error))
            }


        
    }

    checkIsAccpected(id: number): boolean {
        this._invoiceService.getInvoiceById(id).subscribe(data => {
            this.isAccepted = data.isAccepted+"";
            console.log(this.isAccepted);
        },
            error => {
                console.log(error);
            });

        if (this.isAccepted=="true") {
            return true;
        }
        if (this.isAccepted=="false") {
            this.deleteInvoice(id);
            return false;
        }
    }
}
