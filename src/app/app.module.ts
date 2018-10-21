import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppMenuComponent } from './app-menu.component';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FallbackComponent } from './fallback.component';

@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent,
    FallbackComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'basics/home', pathMatch: 'full' },
      { path: 'basics', loadChildren: './feature-basics/basics.module#BasicsModule' },
      { path: 'extras', loadChildren: './feature-extras/extras.module#ExtrasModule' },
      { path: '**', component: FallbackComponent },
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
