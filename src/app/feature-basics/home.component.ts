import { Component } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  template: `<p class="alert alert-primary">
    This is the <strong>🏠 HOME</strong> component.
    - {{ apiResponse | async }}
  </p>`,
})
export class HomeComponent {
  apiResponse: Observable<string>;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiResponse = this.apiService.getProtectedApiResponse();
  }
}
