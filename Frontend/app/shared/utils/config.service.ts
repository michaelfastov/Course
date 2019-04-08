import { Injectable } from '@angular/core';
 
@Injectable()
export class ConfigService {
     
    _apiURI : string;
 
    constructor() {
        this._apiURI = 'http://192.168.12.230:45455/api';
        //'http://localhost:5000/api';
     }
 
     getApiURI() {
         return this._apiURI;
     }    
}
 