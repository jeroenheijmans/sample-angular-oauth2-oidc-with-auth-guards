import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div class="container">
    <app-menu></app-menu>
    <div class="container mt-2">
      <h1>Welcome</h1>
      <p>This is part of the app.component. Below is the router outlet.</p>
      <hr><router-outlet></router-outlet><hr>
      <p>You can <a routerLink="/url-without-route">go to a url without a route</a> to see the fallback route.</p>
    </div>
  </div>`,
})
export class AppComponent {
}
