import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-should-login',
  template: `<h2>Unauthorized</h2>
    <p class="alert alert-dark">You need to be logged in to view requested page.</p>
    <p>Please <a href="#" class="btn btn-sm btn-success" (click)="login($event)">log in</a> before continuing.</p>`,
})
export class ShouldLoginComponent {
  constructor(private authService: OAuthService) { }

  public login($event) {
    $event.preventDefault();
    this.authService.initImplicitFlow();
  }
}
