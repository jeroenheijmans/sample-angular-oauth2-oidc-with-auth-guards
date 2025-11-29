import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-admin',
  template: `<p class="alert alert-danger">
    This is the <strong>⚙ ADMIN</strong> component.
    It will not redirect you to the login server.
    - {{ apiResponse | async }}
  </p>`,
  standalone: false
})
export class Admin1Component implements OnInit {
  private apiService = inject(ApiService);

  apiResponse!: Observable<string>;

  ngOnInit() {
    this.apiResponse = this.apiService.getProtectedApiResponse();
  }
}
