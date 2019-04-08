import { Component, OnInit } from '@angular/core';
import { Http,    Response,
  Headers } from '@angular/http';
import {
  CompanyService
} from '../../shared/services/company.service'

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
// import {  
//   PlayerComponent  
// } from '../players.component';  

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
data:any;
signature:any;
  id: number;
  invoiceItemForm: FormGroup;
  payForm: FormGroup; 
  public invoiceItemlist: any[];
  selectedProduct: number;
  public productlist: any[];
  errorMessage: any; 

  constructor(private _fb: FormBuilder,private _http: Http, private _avRoute: ActivatedRoute, private _companyService: CompanyService, private _router: Router) {

    if (this._avRoute.snapshot.params["CompanyID"]) {
      this.id = this._avRoute.snapshot.params["CompanyID"];
    }

    this.invoiceItemForm = this._fb.group({
      id: 0,
      productID: [''],
      productQuantity: ['']
    })
    console.log(this.id);

    this.payForm = this._fb.group({
      data: [''],
      signature: ['']
    })
    this.GetCompanyInvoiceItems(this.id);
  }


  GetCompanyInvoiceItems(id: number) {
    this._companyService.getCompanyInvoiceItems(id).subscribe(data => {
      this.invoiceItemlist = data;
    });
  }

  ngOnInit() {
    //   if (this.id > 0) {  
    //       this.title = "Edit";  
    //       this._invoiceService.getInvoiceById(this.id).subscribe(resp => this.invoiceForm.setValue(resp), error => this.errorMessage = error);  
    //   }  
  }
  buyProduct() {
    this.invoiceItemForm.value.productID = this.selectedProduct;
    this.invoiceItemForm.value.invoiceID = this.id;
    this.invoiceItemForm.value.productWeight = 0;
    console.log(this.invoiceItemForm.value);
    if (!this.invoiceItemForm.valid) {
      return;
    }


    this._companyService.buyProduct(this.invoiceItemForm.value).subscribe((data) => {
      //this._router.navigate(['/companies']);  

      this.data = data.data;
      this.signature = data.signature;
      //console.log(this.data);
      this.GetCompanyInvoiceItems(this.id);



    }, error => this.errorMessage = error);



    
  }

  LiqPay(){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
  
      this.payForm.value.data = this.data;
      this.payForm.value.signature = this.signature;
  //console.log(this.payForm.value.data);
      this._http.post('https://www.liqpay.ua/api/3/checkout', 
      this.payForm,{headers}).map((response: Response) => response.json());
     // this._router.navigate(['https://www.liqpay.ua/api/3/checkout']);
  }


  cancel() {
    this._router.navigate(['/invoice']);
  }
}

