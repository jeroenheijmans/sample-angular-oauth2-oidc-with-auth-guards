import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { OAuthService, AuthConfig, OAuthErrorEvent } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  template: `<div class="container">
    <app-menu></app-menu>
    <div class="container mt-2">
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
        <button class="btn btn-danger mr-1" (click)='reset()'>reset everything</button>
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
    private authService: OAuthService,
    private authConfig: AuthConfig,
  ) {
    this.authService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error(event);
      } else {
        console.warn(event);
      }
    });

    this.authService.configure(authConfig);

    this.authService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(e => this.authService.loadUserProfile());

    this.authService.loadDiscoveryDocumentAndTryLogin();
  }

  public login() { this.authService.initImplicitFlow(); }
  public logoff() { this.authService.logOut(); }
  public refresh() { this.authService.silentRefresh(); }
  public reload() { window.location.href = window.location.href; }

  public reset() {
    localStorage.clear();
    this.reload();
  }

  public get accessToken() { return this.authService.getAccessToken(); }
  public get identityClaims() { return this.authService.getIdentityClaims(); }
  public get idToken() { return this.authService.getIdToken(); }
}
