import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AuthGuard } from './core/services/auth-guard.service';
import { AuthService } from './core/services/auth.service';
import { ConfigService } from './core/shared/config.service';
import { CoreModule } from './core/core.module';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    CoreModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'auth-callback', component: AuthCallbackComponent},
      { path: 'counter', component: CounterComponent ,canActivate: [AuthGuard]},
      { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuard] },
    ])
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }

