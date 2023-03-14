import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'app';
  constructor() {} //public oidcSecurityService: OidcSecurityService

  ngOnInit() {
    //this.oidcSecurityService.authorize();
    //this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData}) => console.log(userData));
  }

  // login() {
  //   //this.oidcSecurityService.authorize();
  // }

  // logout() {
  //   this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  // }
}

