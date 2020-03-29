import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../core/auth-guard.service';
import { ApiService } from '../shared/api.service';
import { SharedModule } from '../shared/shared.module';
import { Admin1Component } from './admin1.component';
import { HomeComponent } from './home.component';
import { PublicComponent } from './public.component';

@NgModule({
  declarations: [
    Admin1Component,
    HomeComponent,
    PublicComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'admin1', component: Admin1Component, canActivate: [AuthGuard] },
      { path: 'public', component: PublicComponent },
    ]),
  ],
  providers: [
    ApiService,
  ],
})
export class BasicsModule { }
