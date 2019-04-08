import { Component, OnInit } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {  
    CompanyService  
  } from '../../shared/services/company.service'  
  import {  
   VendorService  
  } from '../../shared/services/vendor.service'  
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
import {  
  InvoiceService  
} from './../../shared/services/invoice.service';



@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {
    invoiceForm: FormGroup;  
    invoiceItemForm: FormGroup;

  title: string = "Create";  
  id: number;  
  errorMessage: any;
  selectedCompany:number;
  selectedVendor:number;
  selectedProduct:number;
  public invoice: any;

  public mycompanylist: any[];    
  public vendorlist: any[];
  public productlist: any[];
  public invoiceItemlist: any[];

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute, private _invoiceService: InvoiceService, private _companyService: CompanyService,private _vendorService: VendorService, private _router: Router) {  
      if (this._avRoute.snapshot.params["InvoiceID"]) {  
          this.id = this._avRoute.snapshot.params["InvoiceID"];  
      }  

      this.invoiceForm = this._fb.group({  
          id: 0,  
          CompanyID:[''],
          VendorID:['']
      });
      this.getMyCompanies();
      this.getVendors();
      this.getProducts();
      
  }  

  getMyCompanies() {  
    this._companyService.getMyCompanies().subscribe(data => {
    this.mycompanylist = data;
    console.log(this.mycompanylist);
    }, 
    error=> {
        console.log(error);
    });

} 
getProducts() {  
    this._invoiceService.getProducts().subscribe(data => {
    this.productlist = data;
    console.log(this.productlist);
    }, 
    error=> {
        console.log(error);
    });

} 
getVendors() {  
    this._vendorService.getVendors().subscribe(data => {
    this.vendorlist = data;
    console.log(this.vendorlist);
    }, 
    error=> {
        console.log(error);
    });

} 

  ngOnInit() {  
    //   if (this.id > 0) {  
    //       this.title = "Edit";  
    //       this._invoiceService.getInvoiceById(this.id).subscribe(resp => this.invoiceForm.setValue(resp), error => this.errorMessage = error);  
    //   }  
  }  
  save() {  
    this.invoiceForm.value.CompanyID =  this.selectedCompany;
    this.invoiceForm.value.VendorID =  this.selectedVendor;

      if (!this.invoiceForm.valid) {  
          return;  
      }  

      if (this.title == "Create") {  
          this._invoiceService.saveInvoice(this.invoiceForm.value).subscribe((data) => {  
          }, error => this.errorMessage = error)  
      } else if (this.title == "Edit") {  
          this._invoiceService.updateInvoice(this.id,this.invoiceForm.value).subscribe((data) => {  
          }, error => this.errorMessage = error)
      }  
    }


  cancel() {  
      this._router.navigate(['/invoice']);  
  }  
}

