import { NgModule } from '@angular/core';

import { ApiService } from './api.service';

@NgModule({
  providers: [
    ApiService,
  ]
})
export class SharedModule { }
