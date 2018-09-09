import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthConfig, JwksValidationHandler, OAuthModule, OAuthModuleConfig, OAuthStorage, ValidationHandler } from 'angular-oauth2-oidc';

import { ApiService } from './api.service';
import { authModuleConfig } from './app-module-config';
import { authConfig } from './auth-config';
import { AuthGuardWithForcedLogin } from './auth-guard-with-forced-login.service';
import { AuthGuard } from './auth-guard.service';

import { Admin1Component } from './admin1.component';
import { Admin2Component } from './admin2.component';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { FallbackComponent } from './fallback.component';
import { HomeComponent } from './home.component';
import { MenuComponent } from './menu.component';
import { PublicComponent } from './public.component';
import { ShouldLoginComponent } from './should-login.component';

@NgModule({
  declarations: [
    AppComponent,
    Admin1Component,
    Admin2Component,
    MenuComponent,
    HomeComponent,
    FallbackComponent,
    PublicComponent,
    ShouldLoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot(authModuleConfig),
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'admin1', component: Admin1Component, canActivate: [AuthGuard] },
      { path: 'admin2', component: Admin2Component, canActivate: [AuthGuardWithForcedLogin] },
      { path: 'public', component: PublicComponent },
      { path: 'should-login', component: ShouldLoginComponent },
      { path: '**', component: FallbackComponent },
    ]),
  ],
  providers: [
    { provide: AuthConfig, useValue: authConfig },
    { provide: OAuthModuleConfig, useValue: authModuleConfig },
    { provide: ValidationHandler, useClass: JwksValidationHandler },
    { provide: OAuthStorage, useValue: localStorage },

    AuthService,
    AuthGuard,
    AuthGuardWithForcedLogin,
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
