import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-admin',
  template: `<p class="alert alert-danger">
    This is the <strong>⚙ ADMIN</strong> component.
    It will not redirect you to the login server.
    - {{ apiResponse | async }}
  </p>`,
})
export class Admin1Component implements OnInit {
  apiResponse!: Observable<string>;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiResponse = this.apiService.getProtectedApiResponse();
  }
}
