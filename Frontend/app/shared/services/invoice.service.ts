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
export class InvoiceService {  
    myAppUrl: string = "";  
    constructor(private _http: Http, private configService: ConfigService) {  
        this.myAppUrl = configService.getApiURI();
    }  

    getProducts() {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.get(this.myAppUrl + "/products",{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    }  
    GetInvoicesCompany(){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.get(this.myAppUrl + "/invoices/GetInvoicesCompany",{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    
    }
    GetInvoicesVendor(){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.get(this.myAppUrl + "/invoices/GetInvoicesVendor",{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    
    }

    getInvoices() {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.get(this.myAppUrl + "/invoices",{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    }  
    getInvoiceById(InvoiceID: number) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.get(this.myAppUrl + "/invoices/" + InvoiceID,{headers}).map((response: Response) => response.json()).catch(this.errorHandler)  
    }  
    deleteInvoice(InvoiceID: number) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.delete(this.myAppUrl + "/invoices/" + InvoiceID,{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    }  
    updateInvoice(InvoiceID: number,invoice: any) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.put(this.myAppUrl + '/invoices/'+ InvoiceID, invoice,{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    }  
    saveInvoice(invoice: any) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.post(this.myAppUrl + '/invoices', invoice,{headers}).map((response: Response) => response.json()).catch(this.errorHandler)  
    }  
    errorHandler(error: Response) {          
        console.log(error);  
        return Observable.throw(error.json().error || 'Server error');  
    }  
}  