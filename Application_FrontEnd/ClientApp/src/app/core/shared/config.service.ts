import { Injectable } from '@angular/core';
 
@Injectable()
export class ConfigService {    

    constructor() {}

    get authApiURI() {
        return 'https://localhost:7052/auth';
    }    
     
    get resourceApiURI() {
        return 'https://localhost:7051/api';
    }  
}