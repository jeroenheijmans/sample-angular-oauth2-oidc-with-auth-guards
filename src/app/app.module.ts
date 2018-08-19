import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthConfig, JwksValidationHandler, OAuthModule, OAuthModuleConfig, OAuthStorage, ValidationHandler } from 'angular-oauth2-oidc';

import { ApiService } from './api.service';
import { authModuleConfig } from './app-module-config';
import { authConfig } from './auth-config';
import { AuthGuard } from './auth-guard.service';

import { AdminComponent } from './admin.component';
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
    AdminComponent,
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
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
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
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
