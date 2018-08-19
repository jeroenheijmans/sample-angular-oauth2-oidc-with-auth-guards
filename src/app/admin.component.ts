import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

@Component({
  selector: 'app-admin',
  template: `<p class="alert alert-danger">This is the <strong>⚙ ADMIN</strong> component. (API Result: '{{item | async}}')</p>`,
})
export class AdminComponent implements OnInit {
  item: Observable<string>;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.item = this.apiService.getRandomItem();
  }
}
