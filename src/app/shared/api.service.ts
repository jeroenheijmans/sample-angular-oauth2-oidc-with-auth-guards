import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  getProtectedApiResponse(): Observable<string> {
    return this.http.get<any>('https://demo.identityserver.io/api/test')
      .pipe(
        map(response => response.find(i => i.type === 'iss').value),
        map(iss => '☁ API Success from ' + iss),
        catchError((e: HttpErrorResponse) => of(`🌩 API Error: ${e.status} ${e.statusText}`)),
      );
  }
}
