import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { OAuthStorage, ValidationHandler, JwksValidationHandler, AuthConfig, OAuthModuleConfig, OAuthModule } from 'angular-oauth2-oidc';

import { authConfig } from './auth-config';
import { AuthGuard } from './auth-guard.service';
import { authModuleConfig } from './app-module-config';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin.component';
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

    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
