import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-menu',
  template: `<nav class="navbar navbar-expand-sm navbar-light bg-light">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" routerLinkActive="active" routerLink="basics/home">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLinkActive="active" routerLink="basics/public">Public</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLinkActive="active" routerLink="basics/admin1">
          <span *ngIf="(isAuthenticated$ | async) === false">🔒</span>
          Admin-1
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLinkActive="active" routerLink="extras/admin2">
          <span *ngIf="(isAuthenticated$ | async) === false">🔒</span>
          Admin-2
        </a>
      </li>
    </ul>
    <button class="btn btn-sm btn-default" (click)="login()" *ngIf="(isAuthenticated$ | async) === false">Log in</button>
    <span *ngIf="isAuthenticated$ | async" id="email">{{email}}</span>
    <button *ngIf="isAuthenticated$ | async" href="#" (click)="logout()" class="btn btn-link">(log out)</button>
  </nav>`,
})
export class AppMenuComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = authService.isAuthenticated$;
  }

  login() {
 this.authService.login();
}
  logout() {
 this.authService.logout();
}

  get email(): string {
    return this.authService.identityClaims
    ? (this.authService.identityClaims as any)['email']
    : '-';
  }
}
