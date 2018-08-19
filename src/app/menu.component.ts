import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  template: `<nav class="navbar navbar-expand-sm navbar-light bg-light">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" routerLinkActive="active" routerLink="/home">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLinkActive="active" routerLink="/public">Public</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLinkActive="active" routerLink="/admin">
          Admin
          <span *ngIf="!(isAuthenticated | async)">🔒</span>
        </a>
      </li>
    </ul>
  </nav>`,
})
export class MenuComponent {
  isAuthenticated: Observable<boolean>;

  constructor(authService: AuthService) {
    this.isAuthenticated = authService.isAuthenticated;
  }
}
