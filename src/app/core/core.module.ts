import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthConfig, JwksValidationHandler, OAuthModule, OAuthModuleConfig, OAuthStorage, ValidationHandler } from 'angular-oauth2-oidc';

import { authConfig } from './auth-config';
import { AuthGuardWithForcedLogin } from './auth-guard-with-forced-login.service';
import { AuthGuard } from './auth-guard.service';
import { authModuleConfig } from './auth-module-config';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    HttpClientModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    { provide: AuthConfig, useValue: authConfig },
    { provide: OAuthModuleConfig, useValue: authModuleConfig },
    { provide: ValidationHandler, useClass: JwksValidationHandler },
    { provide: OAuthStorage, useValue: localStorage },
    AuthService,
    AuthGuard,
    AuthGuardWithForcedLogin,
  ],
})
export class CoreModule { }
