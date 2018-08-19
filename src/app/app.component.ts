import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `<div class="container-fluid">
    <app-menu></app-menu>
    <div class="container-fluid mt-2">
      <h1>Welcome</h1>
      <p>This is part of the app.component. Below is the router outlet.</p>
      <hr><router-outlet></router-outlet>
      <hr><p>You can <a routerLink="/url-without-route">go to a url without a route</a> to see the fallback route.</p>
      <hr>
      <p>
        <button class="btn btn-success mr-1" (click)='login()'>login</button>
        <button class="btn btn-primary mr-4" (click)='logoff()'>logout</button>
        <button class="btn btn-warning mr-4" (click)='refresh()'>force silent refresh</button>
        <button class="btn btn-secondary mr-4" (click)='reload()'>force reload page</button>
        <button class="btn btn-danger mr-1" (click)='reset()'>reset everything locally</button>
      </p>
      <hr>
      <strong>isAuthenticated</strong><pre>{{isAuthenticated | async}}</pre>
      <strong>HasValidToken</strong><pre>{{hasValidToken}}</pre>
      <strong>AccessToken</strong><pre>{{accessToken}}</pre>
      <strong>IdToken</strong><pre>{{idToken}}</pre>
      <strong>IdentityClaims</strong><pre>{{identityClaims | json}}</pre>
    </div>
  </div>`,
})
export class AppComponent {
  isAuthenticated: Observable<boolean>;

  constructor (
    private authService: AuthService,
  ) {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.runInitialLoginSequence();
  }

  login() { this.authService.login(); }
  logoff() { this.authService.logoff(); }
  refresh() { this.authService.refresh(); }
  reload() { window.location.reload(); }

  reset() {
    localStorage.clear();
    this.reload();
  }

  get hasValidToken() { return this.authService.hasValidToken(); }
  get accessToken() { return this.authService.accessToken; }
  get identityClaims() { return this.authService.identityClaims; }
  get idToken() { return this.authService.idToken; }
}
