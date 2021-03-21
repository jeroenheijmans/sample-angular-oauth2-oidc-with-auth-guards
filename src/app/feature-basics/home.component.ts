import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-home',
  template: `<p class="alert alert-primary">
    This is the <strong>🏠 HOME</strong> component.
    - {{ apiResponse | async }}
  </p>`,
})
export class HomeComponent implements OnInit {
  apiResponse!: Observable<string>;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiResponse = this.apiService.getProtectedApiResponse();
  }
}
