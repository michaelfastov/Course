import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../globals';

import {
    NgForm,
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import {
    Router,
    ActivatedRoute
} from '@angular/router';

import {
    InvoiceItemService
} from './../../shared/services/invoiceItem.service';
import {
    InvoiceService
} from './../../shared/services/invoice.service';

@Component({
    selector: 'app-create-invoiceItem',
    templateUrl: './create-invoiceItem.component.html',
    styleUrls: ['./create-invoiceItem.component.css']
})
export class CreateInvoiceItemComponent implements OnInit {
    invoiceItemForm: FormGroup;
    title: string = "Create";
    id: number;
    errorMessage: any;
    public productlist: any[];
    public invoiceItemlist: any[];
    selectedCompany: number;
    selectedVendor: number;
    selectedProduct: number;
    public isAccepted: boolean;

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute, private _invoiceItemService: InvoiceItemService, private _invoiceService: InvoiceService, private _router: Router, private globals: Globals) {
        //globals.email = _avRoute.snapshot.params[];
        if (this._avRoute.snapshot.params["InvoiceID"]) {
            this.id = this._avRoute.snapshot.params["InvoiceID"];
        }

        console.log(this._avRoute.snapshot.params);

        this.invoiceItemForm = this._fb.group({
            id: 0,
            productID: [''],
            productQuantity: ['']
        })

        this.getProducts();
        this.getInvoiceItemsOfInvoice();
        // this.checkiIsAccpected();

    }

    ngOnInit() {
        //   if (this.id > 0) {  
        //       this.title = "Edit";  
        //       this._invoiceItemService.getInvoiceItemById(this.id).subscribe(resp => this.invoiceItemForm.setValue(resp), error => this.errorMessage = error);  
        //   }  
    }
    checkIsAccpected(id: number) {
        this._invoiceService.getInvoiceById(id).subscribe(data => {
            this.isAccepted = data.isAccepted;
        });
        if (this.isAccepted) this.title = "";
        else this.title = "Create";
    }


    getInvoiceItemsOfInvoice() {
        this._invoiceItemService.getInvoiceItemsOfInvoice(this.id).subscribe(data => {
            this.invoiceItemlist = data;
            console.log(this.invoiceItemlist);
        },
            error => {
                console.log(error);
            });
    }

    getProducts() {
        this._invoiceService.getProducts().subscribe(data => {
            this.productlist = data;
            console.log(this.productlist);
        },
            error => {
                console.log(error);
            });

    }

    saveInvoiceItem() {
        this.invoiceItemForm.value.productID = this.selectedProduct;
        this.invoiceItemForm.value.invoiceID = this.id;
        this.invoiceItemForm.value.productWeight = 0;
        console.log(this.invoiceItemForm.value);
        if (!this.invoiceItemForm.valid) {
            return;
        }

        if (this.title == "Create") {
            this._invoiceItemService.saveInvoiceItem(this.invoiceItemForm.value).subscribe((data) => {
            }, error => this.errorMessage = error)
        }
        this.getInvoiceItemsOfInvoice();
    }


    deleteInvoiceItem(invoiceItemId) {
        if (this.title == "Create") {
            this._invoiceItemService.deleteInvoiceItem(invoiceItemId).subscribe((data) => {
                this.getInvoiceItemsOfInvoice();
            }, error => console.error(error))
        }
    }

    cancel() {
        this._router.navigate(['/invoiceitem']);
    }
}


