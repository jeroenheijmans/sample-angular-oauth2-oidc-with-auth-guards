import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { ApiService } from './api.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CoreModule,
  ],
  providers: [
    ApiService,
  ]
})
export class SharedModule { }
