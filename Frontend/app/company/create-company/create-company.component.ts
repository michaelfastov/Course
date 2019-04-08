import { Component, OnInit } from '@angular/core';
import { Http,Headers } from '@angular/http';
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
// import {  
//   PlayerComponent  
// } from '../players.component';  
import {  
  CompanyService  
} from './../../shared/services/company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {
  companyForm: FormGroup;  
  title: string = "Create";  
  id: number;  
  errorMessage: any;  
  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute, private _companyService: CompanyService, private _router: Router,private globals:Globals) {  
    //globals.email = _avRoute.snapshot.params[];
    if (this._avRoute.snapshot.params["CompanyID"]) {  
          this.id = this._avRoute.snapshot.params["CompanyID"];  
      }  
      this.companyForm = this._fb.group({  
          id: 0,  
          name:['',Validators.required],
          description:['']
      })  
  }  

  ngOnInit() {  
      if (this.id > 0) {  
          this.title = "Edit";  
          this._companyService.getCompanyById(this.id).subscribe(resp => this.companyForm.setValue(resp), error => this.errorMessage = error);  
      }  
  }  
  save() {  
      if (!this.companyForm.valid) {  
          return;  
      }  
      if (this.title == "Create") {  
          this._companyService.saveCompany(this.companyForm.value).subscribe((data) => {  
              this._router.navigate(['/companies']);  
          }, error => this.errorMessage = error)  
      } else if (this.title == "Edit") {  
          this._companyService.updateCompany(this.id,this.companyForm.value).subscribe((data) => {  
              this._router.navigate(['/companies']);  
          }, error => this.errorMessage = error)  
      }  
    }
   
  cancel() {  
      this._router.navigate(['/companies']);  
  }  
  get name() {  
      return this.companyForm.get('name');  
  }  
  get description() {  
      return this.companyForm.get('description');  
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


