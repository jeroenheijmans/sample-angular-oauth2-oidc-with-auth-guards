import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin.component';
import { FallbackComponent } from './fallback.component';
import { HomeComponent } from './home.component';
import { MenuComponent } from './menu.component';
import { PublicComponent } from './public.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    MenuComponent,
    HomeComponent,
    FallbackComponent,
    PublicComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'public', component: PublicComponent },
      { path: '**', component: FallbackComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
