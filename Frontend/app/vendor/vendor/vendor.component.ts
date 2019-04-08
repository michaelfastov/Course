import { Component, OnInit,Inject } from '@angular/core';
import {  
  Http,  
  Headers  
} from '@angular/http';  
import {  
  VendorService  
} from '../../shared/services/vendor.service'   
import {  
  Router,  
  ActivatedRoute  
} from '@angular/router';  


//import { Router } from '@angular/router';
//import { ConfigService } from '../utils/config.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})

export class VendorComponent {
  public vendorlist: any[];  
  public myvendorlist: any[];   
  constructor(public http: Http, private _router: Router, private _vendorService: VendorService,private _Activatedroute:ActivatedRoute) {  
      this.getVendors();  
      this.getMyVendors();
  }  
  getVendors() {  
      this._vendorService.getVendors().subscribe(data => {
      this.vendorlist = data;
      console.log(this.vendorlist);
      }, 
      error=> {
          console.log(error);
      })
  }  
  getMyVendors() {  
    this._vendorService.getMyVendors().subscribe(data => {
    this.myvendorlist = data;
    console.log(this.myvendorlist);
    }, 
    error=> {
        console.log(error);
    });

}  
  deleteVendor(Id: number) {  
      var ans = confirm("Do you want to delete vendor with Id: " + Id);  
      if (ans) {  
          this._vendorService.deleteVendor(Id).subscribe((data) => {  
              this.getVendors();  
          }, error => console.error(error))  
      }  
  }   
}  
