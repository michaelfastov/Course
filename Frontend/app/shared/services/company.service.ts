import {  
    Injectable,  
    Inject  
} from '@angular/core';  
import {  
    Http,  
    Response,
    Headers
} from '@angular/http';  
import {  
    Observable  
} from 'rxjs/Observable';  
import {  
    Router  
} from '@angular/router';  
import { ConfigService } from '../../shared/utils/config.service';
import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/catch';  
import 'rxjs/add/observable/throw';


@Injectable()  
export class CompanyService {  
    myAppUrl: string = "";  
    constructor(private _http: Http, private configService: ConfigService) {  
        this.myAppUrl = configService.getApiURI();
    }  

    getCompanies() {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.get(this.myAppUrl + "/companies",{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    }  
    getCompanyInvoiceItems(CompanyID: number) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.get(this.myAppUrl + "/companies/getCompanyInvoiceItems/" + CompanyID,{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    } 
    getMyCompanies() {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.get(this.myAppUrl + "/companies/getmycompanies",{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    } 
    getCompanyById(CompanyID: number) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.get(this.myAppUrl + "/companies/" + CompanyID,{headers}).map((response: Response) => response.json()).catch(this.errorHandler)  
    }  
    deleteCompany(CompanyID: number) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.delete(this.myAppUrl + "/companies/" + CompanyID,{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    }  
    updateCompany(CompanyID: number,company: any) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.put(this.myAppUrl + '/companies/'+CompanyID, company,{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    }  
    saveCompany(company: any) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.post(this.myAppUrl + '/companies', company,{headers}).map((response: Response) => response.json()).catch(this.errorHandler)  
    }  
    buyProduct(product: any) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.post(this.myAppUrl + '/companies/buyProduct', product,{headers}).map((response: Response) => response.json()).catch(this.errorHandler)  
    } 
    errorHandler(error: Response) {          
        console.log(error);  
        return Observable.throw(error.json().error || 'Server error');  
    }  
}  