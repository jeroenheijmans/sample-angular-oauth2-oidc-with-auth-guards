import { Injectable } from '@angular/core';
import { OAuthService, OAuthErrorEvent } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor (private oauthService: OAuthService) {
  }

  public kickOffLoginProcess() {
    // Useful for debugging:
    this.oauthService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error(event);
      } else {
        console.warn(event);
      }
    });

    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(e => this.oauthService.loadUserProfile());

    this.oauthService.setupAutomaticSilentRefresh();

    // 0. LOAD CONFIG:
    // First we have to check to see how the IdServer is
    // currently configured:
    this.oauthService.loadDiscoveryDocument()

      // 1. HASH LOGIN:
      // Try to log in via hash fragment after redirect back
      // from IdServer from initImplicitFlow:
      .then(() => this.oauthService.tryLogin())

      .then(tryLoginResult => {
        if (this.oauthService.hasValidAccessToken()) {
          return tryLoginResult;
        }

        // 2. SILENT LOGIN:
        // Try to log in via silent refresh because the IdServer
        // might have a cookie to remember the user, so we can
        // prevent doing a redirect:
        return this.oauthService.silentRefresh()
          .catch(result => {
            // Subset of situations from https://openid.net/specs/openid-connect-core-1_0.html#AuthError
            // Only the ones where it's reasonably sure that sending the
            // user to the IdServer will help.
            const errorResponsesRequiringUserInteraction = [
              'interaction_required',
              'login_required',
              'account_selection_required',
              'consent_required',
            ];

            if (result
              && result.reason
              && errorResponsesRequiringUserInteraction.indexOf(result.reason.error) >= 0) {

              // 3. ASK FOR LOGIN:
              // At this point we know for sure that we have to ask the
              // user to log in, so we redirect them to the IdServer to
              // enter credentials:
              this.oauthService.initImplicitFlow();

              // Just in case initImplicitFlow ever turns out to be(come) async.
              return Promise.resolve();
            }

            // We can't handle the truth, just pass on the problem to the
            // next handler.
            return Promise.reject(result);
          });
      });
  }

  // These methods currently just proxy to the inner service, but
  // in real scenarios they might also mutate app/local state.
  public login() { this.oauthService.initImplicitFlow(); }
  public logoff() { this.oauthService.logOut(); }
  public refresh() { this.oauthService.silentRefresh(); }
  public isAuthenticated() { return this.oauthService.hasValidIdToken(); }

  // These normally won't be exposed from a service like this, but
  // for debugging it makes sense.
  public get accessToken() { return this.oauthService.getAccessToken(); }
  public get identityClaims() { return this.oauthService.getIdentityClaims(); }
  public get idToken() { return this.oauthService.getIdToken(); }
}
