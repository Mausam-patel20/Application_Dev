import { Injectable, NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { BehaviorSubject } from 'rxjs'; 

import { BaseService } from "../shared/base.service"; 
import { ConfigService } from '../shared/config.service';

// ...
@Injectable({
    providedIn: 'root'
  })
  export class AuthService extends BaseService  {
    // Observable navItem source
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    // Observable navItem stream
    authNavStatus$ = this._authNavStatusSource.asObservable();

    private manager = new UserManager(getClientSettings());
    private user : User | null | undefined;

    constructor(private http: HttpClient, private configService: ConfigService) { 
        super();     
        
        this.manager.getUser().then(user => { 
        this.user = user;      
        this._authNavStatusSource.next(this.isAuthenticated());
        });
    }

    login() { 
        
        this.manager.signinRedirect().then(result=>{
            this.completeAuthentication();
            return true;
        })
    }

    async completeAuthentication() {
        this.user = await this.manager.signinRedirectCallback();
        this._authNavStatusSource.next(this.isAuthenticated());      
    }  

    register(userRegistration: any) {    
        return this.http.post(this.configService.authApiURI + '/account', userRegistration).pipe(catchError(this.handleError));
    }

    isAuthenticated(): boolean {
        console.log(this.user);
        return this.user != null && !this.user.expired;
    }

    get authorizationHeaderValue(): string {
        return `${this.user?.token_type} ${this.user?.access_token}`;
    }

    get name(): string {
        return this.user != null ? this.user.profile.name! : '';
    }

    async signout() {
        await this.manager.signoutRedirect();
    }
  }  
  export function getClientSettings(): UserManagerSettings {
    return {
        authority: 'https://localhost:7052',
        client_id: 'angular_spa',
        redirect_uri: 'https://localhost:44447/auth-callback',
        post_logout_redirect_uri: 'https://localhost:44447/',
        response_type:"id_token token",
        scope:"openid profile email",
        filterProtocolClaims: true,
        loadUserInfo: true,
        automaticSilentRenew: true,
        silent_redirect_uri: 'http://localhost:44447/'
    };
  }