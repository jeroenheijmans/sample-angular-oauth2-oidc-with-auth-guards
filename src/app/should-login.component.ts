import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-should-login',
  template: `<p class="alert alert-dark">You need to be logged in to view requested page.</p>
    <p>Please <a href="#" (click)="login($event)">log in</a> before continuing.</p>`,
})
export class ShouldLoginComponent {
  constructor(private authService: OAuthService) { }

  public login($event: any) {
    $event.preventDefault();
    this.authService.initLoginFlow();
  }
}
