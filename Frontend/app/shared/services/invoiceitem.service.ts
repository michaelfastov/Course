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
export class InvoiceItemService {  
    myAppUrl: string = "";  
    constructor(private _http: Http, private configService: ConfigService) {  
        this.myAppUrl = configService.getApiURI();
    }  

    // GetInvoiceItemsCompany(){
    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     let authToken = localStorage.getItem('auth_token');
    //     headers.append('Authorization', `Bearer ${authToken}`);
    //     return this._http.get(this.myAppUrl + "/invoices/GetInvoicesCompany",{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    
    // }
    // GetInvoiceItemsVendor(){
    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     let authToken = localStorage.getItem('auth_token');
    //     headers.append('Authorization', `Bearer ${authToken}`);
    //     return this._http.get(this.myAppUrl + "/invoices/GetInvoicesVendor",{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    
    // }

    getInvoiceItems() {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.get(this.myAppUrl + "/invoiceItems",{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    }  
    getInvoiceItemsOfInvoice(InvoiceItemID: number) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.get(this.myAppUrl + "/invoiceItems/GetInvoiceItemsOfInvoice/" + InvoiceItemID,{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    }  
    getInvoiceItemById(InvoiceItemID: number) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.get(this.myAppUrl + "/invoiceItems/" + InvoiceItemID,{headers}).map((response: Response) => response.json()).catch(this.errorHandler)  
    }  
    deleteInvoiceItem(InvoiceItemID: number) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.delete(this.myAppUrl + "/invoiceItems/" + InvoiceItemID,{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    }  
    updateInvoiceItem(InvoiceItemID: number,invoiceItem: any) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.put(this.myAppUrl + '/invoiceItems/'+ InvoiceItemID, invoiceItem,{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    }  
    saveInvoiceItem(invoiceItem: any) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.post(this.myAppUrl + '/invoiceItems', invoiceItem,{headers}).map((response: Response) => response.json()).catch(this.errorHandler)  
    }  
    errorHandler(error: Response) {          
        console.log(error);  
        return Observable.throw(error.json().error || 'Server error');  
    }  
}  
