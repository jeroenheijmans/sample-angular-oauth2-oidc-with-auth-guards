import { Component } from '@angular/core';
import { AuthService } from './auth.service';

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
      <strong>AccessToken</strong><pre>{{accessToken}}</pre>
      <strong>IdToken</strong><pre>{{idToken}}</pre>
      <strong>IdentityClaims</strong><pre>{{identityClaims | json}}</pre>
    </div>
  </div>`,
})
export class AppComponent {
  constructor (
    private authService: AuthService,
  ) {
    this.authService.kickOffLoginProcess();
  }

  public login() { this.authService.login(); }
  public logoff() { this.authService.logoff(); }
  public refresh() { this.authService.refresh(); }
  public reload() { window.location.reload(); }

  public reset() {
    localStorage.clear();
    this.reload();
  }

  public get accessToken() { return this.authService.accessToken; }
  public get identityClaims() { return this.authService.identityClaims; }
  public get idToken() { return this.authService.idToken; }
}
