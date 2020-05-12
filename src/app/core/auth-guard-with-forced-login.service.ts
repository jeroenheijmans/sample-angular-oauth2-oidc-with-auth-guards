import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardWithForcedLogin implements CanActivate {


  constructor(
    private authService: AuthService,
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.authService.isDoneLoading$
      .pipe(withLatestFrom(this.authService.isAuthenticated$))
      .pipe(filter(isDone => isDone))
      .pipe(tap([_, isAuthenticated] => isAuthenticated || this.authService.login(state.url)))
      .pipe(map([_, isAuthenticated] => isAuthenticated));
  }
}
