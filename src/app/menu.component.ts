import { Component } from '@angular/core';

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
        <a class="nav-link" routerLinkActive="active" routerLink="/admin">Admin</a>
      </li>
    </ul>
  </nav>`,
})
export class MenuComponent {
}
