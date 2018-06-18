import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { of, Observable } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private authService: OAuthService) { }

  getRandomItem(): Observable<string> {
    if (this.authService.hasValidAccessToken()) {
      console.log('OK! We have a valid access token.');
    } else {
      console.error('ERROR! No valid access token for calling the API.');
    }

    return of<string>('Fake API result');
  }
}
