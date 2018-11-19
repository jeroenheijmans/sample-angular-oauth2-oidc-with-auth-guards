import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppMenuComponent } from './app-menu.component';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FallbackComponent } from './fallback.component';
import { ShouldLoginComponent } from './should-login.component';

@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent,
    FallbackComponent,
    ShouldLoginComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'basics/home', pathMatch: 'full' },
      { path: 'basics', loadChildren: './feature-basics/basics.module#BasicsModule' },
      { path: 'extras', loadChildren: './feature-extras/extras.module#ExtrasModule' },
      { path: 'should-login', component: ShouldLoginComponent },
      { path: '**', component: FallbackComponent },
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
