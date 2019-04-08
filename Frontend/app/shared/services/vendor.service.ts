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
export class VendorService {  
    myAppUrl: string = "";  
    constructor(private _http: Http, private configService: ConfigService) {  
        this.myAppUrl = configService.getApiURI();
    }  

    getVendors() {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.get(this.myAppUrl + "/vendors",{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    }  
    getMyVendors() {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.get(this.myAppUrl + "/vendors/getmyvendors",{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    } 
    getVendorById(VendorID: number) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.get(this.myAppUrl + "/vendors/" + VendorID,{headers}).map((response: Response) => response.json()).catch(this.errorHandler)  
    }  
    deleteVendor(VendorID: number) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.delete(this.myAppUrl + "/vendors/" + VendorID,{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    }  
    updateVendor(VendorID: number,vendor: any) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.put(this.myAppUrl + '/vendors/'+ VendorID, vendor,{headers}).map((response: Response) => response.json()).catch(this.errorHandler);  
    }  
    saveVendor(vendor: any) {  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return this._http.post(this.myAppUrl + '/vendors', vendor,{headers}).map((response: Response) => response.json()).catch(this.errorHandler)  
    }  
    errorHandler(error: Response) {          
        console.log(error);  
        return Observable.throw(error.json().error || 'Server error');  
    }  
}  