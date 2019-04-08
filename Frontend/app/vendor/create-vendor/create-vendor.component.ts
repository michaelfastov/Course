import { Component, OnInit } from '@angular/core';
import { Http,Headers } from '@angular/http';

 
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
  VendorService  
} from './../../shared/services/vendor.service';

@Component({
  selector: 'app-create-cvendorompany',
  templateUrl: './create-vendor.component.html',
  styleUrls: ['./create-vendor.component.css']
})
export class CreateVendorComponent implements OnInit {
    vendorForm: FormGroup;  
  title: string = "Create";  
  id: number;  
  errorMessage: any;  
  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute, private _vendorService: VendorService, private _router: Router) {  
      if (this._avRoute.snapshot.params["VendorID"]) {  
          this.id = this._avRoute.snapshot.params["VendorID"];  
      }  
      this.vendorForm = this._fb.group({  
          id: 0,  
          name:['',Validators.required],
          description:['']
      })  
  }  



  ngOnInit() {  
      if (this.id > 0) {  
          this.title = "Edit";  
          this._vendorService.getVendorById(this.id).subscribe(resp => this.vendorForm.setValue(resp), error => this.errorMessage = error);  
      }  
  }  
  save() {  
      if (!this.vendorForm.valid) {  
          return;  
      }  
      if (this.title == "Create") {  
          this._vendorService.saveVendor(this.vendorForm.value).subscribe((data) => {  
              this._router.navigate(['/vendors']);  
          }, error => this.errorMessage = error)  
      } else if (this.title == "Edit") {  
          this._vendorService.updateVendor(this.id,this.vendorForm.value).subscribe((data) => {  
              this._router.navigate(['/vendors']);
          }, error => this.errorMessage = error)
      }  
    }
   
  cancel() {  
      this._router.navigate(['/vendors']);  
  }  
  get name() {  
      return this.vendorForm.get('name');  
  }  
  get description() {  
      return this.vendorForm.get('description');  
  }  
  
  //private apiUrl= 'http://localhost:5000/api/companies';
  
  //data: any={};

  // constructor(private http: Http){//, private configService: ConfigService) {
  //   //this.apiUrl = configService.getApiURI();
  //   //this.GetCompanies();
  //   CreateCompany();
  //   //this.getData();
  //  }

// CreateCompany(company: any){
//   let headers = new Headers();
//   headers.append('Content-Type', 'application/json');
//   let authToken = localStorage.getItem('auth_token');
//   headers.append('Authorization', `Bearer ${authToken}`);
//   return this.http.post(this.apiUrl, company,{headers}).map((response: any) => response.json());
//   }








  // ngOnInit() {
  // }

}


