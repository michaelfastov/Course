import { Component, OnInit,Inject } from '@angular/core';
import {  
  Http,  
  Headers  
} from '@angular/http';  
import {  
  CompanyService  
} from '../../shared/services/company.service'   
import {  
  Router,  
  ActivatedRoute  
} from '@angular/router';  
import {TranslateService} from '@ngx-translate/core';



//import { Router } from '@angular/router';
//import { ConfigService } from '../utils/config.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent {
  public companylist: CompanyList[];  
  public mycompanylist: CompanyList[];  
  constructor(public http: Http, private _router: Router, private _companyService: CompanyService,private _Activatedroute:ActivatedRoute,private translate: TranslateService) {  
      //globals.TeamId=this._Activatedroute.snapshot.params['teamID'];
      translate.setDefaultLang('en');
      this.getCompanies();  
      this.getMyCompanies();
  }  
  switchLanguage(language: string) {
    this.translate.use(language);
  }

  getCompanies() {  
      this._companyService.getCompanies().subscribe(data => {
      this.companylist = data;
      console.log(this.companylist);
      }, 
      error=> {
          console.log(error);
      });
  
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
  
  deleteCompany(Id: number) {

      var ans = confirm("Do you want to delete company with Id: " + Id);  
      if (ans) {  
          this._companyService.deleteCompany(Id).subscribe((data) => {  
              this.getCompanies();  
          }, error => console.error(error))  
      }  
  }   

}  
interface CompanyList {  
  Id: number;  
  Name: string;  
  Description: string;  
}  