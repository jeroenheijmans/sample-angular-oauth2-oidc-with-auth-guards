import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuardWithForcedLogin } from '../core/auth-guard-with-forced-login.service';
import { SharedModule } from '../shared/shared.module';
import { Admin2Component } from './admin2.component';

@NgModule({
  declarations: [
    Admin2Component,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'admin2', component: Admin2Component, canActivate: [AuthGuardWithForcedLogin] },
    ]),
  ],
})
export class ExtrasModule { }
