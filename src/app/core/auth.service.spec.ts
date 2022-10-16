import { fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EventType, OAuthEvent, OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

class FakeComponent {}
const loginUrl = '/should-login';

describe('AuthService', () => {
  let mockOAuthEvents: Subject<OAuthEvent>;
  let mockOAuthService: jasmine.SpyObj<OAuthService>;
  let router: Router;

  beforeEach(() => {
    mockOAuthEvents = new Subject<OAuthEvent>();
    mockOAuthService = jasmine.createSpyObj<OAuthService>({
      configure: void 0,
      hasValidAccessToken: false,
      loadDiscoveryDocument: Promise.resolve(new OAuthSuccessEvent('discovery_document_loaded')),
      loadDiscoveryDocumentAndLogin: Promise.resolve(false),
      loadDiscoveryDocumentAndTryLogin: Promise.resolve(false),
      loadUserProfile: Promise.resolve({ }),
      restartSessionChecksIfStillLoggedIn: void 0,
      setupAutomaticSilentRefresh: void 0,
      silentRefresh: Promise.resolve(new OAuthSuccessEvent('silently_refreshed')),
      stopAutomaticRefresh: void 0,
      tryLogin: Promise.resolve(false),
      tryLoginCodeFlow: Promise.resolve(void 0),
      tryLoginImplicitFlow: Promise.resolve(false),
    }, {
      events: mockOAuthEvents.asObservable(),
    });

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        { path: 'should-login', component: FakeComponent },
      ])],
      providers: [
        AuthService,
        { provide: OAuthService, useValue: mockOAuthService },
      ]
    });
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
  });

  describe('constructor', () => {
    // This set of tests needs to .inject(AuthService) after some
    // additional 'Arrange' phase stuff. So each test does it on
    // its own.

    it('should initialize isAuthenticated$ based on hasValidAccessToken===false', fakeAsync(() => {
      let latestIsAuthenticatedValue: any = null;
      mockOAuthService.hasValidAccessToken.and.returnValue(false);
      const service = TestBed.inject(AuthService);
      service.isAuthenticated$.subscribe(x => latestIsAuthenticatedValue = x);
      expect(latestIsAuthenticatedValue).toEqual(false);
    }));

    it('should initialize isAuthenticated$ based on hasValidAccessToken===true', fakeAsync(() => {
      let latestIsAuthenticatedValue: any = null;
      mockOAuthService.hasValidAccessToken.and.returnValue(true);
      const service = TestBed.inject(AuthService);
      service.isAuthenticated$.subscribe(x => latestIsAuthenticatedValue = x);
      expect(latestIsAuthenticatedValue).toEqual(true);
    }));
  });

  describe('in general', () => {
    let service: AuthService;
    beforeEach(() => service = TestBed.inject(AuthService));

    it('should react on OAuthService events', () => {
      mockOAuthEvents.next({type: 'silently_refreshed'});
      mockOAuthEvents.next({type: 'token_received'});

      expect(mockOAuthService.loadUserProfile).toHaveBeenCalled();
      expect(mockOAuthService.hasValidAccessToken).toHaveBeenCalledTimes(3); // one extra time in constructor
    });

    ['session_terminated', 'session_error'].forEach(eventType => {
      it(`should react on OAuthService event ${eventType} and redirect to login`, () => {
        mockOAuthEvents.next({type: eventType as EventType});

        expect(router.navigateByUrl).toHaveBeenCalledWith(loginUrl);
      });
    });

    it('should handle storage event and update isAuthenticated status', () => {
      mockOAuthService.hasValidAccessToken.and.returnValue(false);

      window.dispatchEvent(new StorageEvent('storage', {key: 'access_token'}));

      expect(router.navigateByUrl).toHaveBeenCalledWith(loginUrl);
      service.isAuthenticated$.subscribe(isAuthenticated => expect(isAuthenticated).toBe(false));
    });
  });

  describe('runInitialLoginSequence', () => {
    let service: AuthService;
    beforeEach(() => service = TestBed.inject(AuthService));

    it('should login via hash if token is valid', waitForAsync (() => {
      mockOAuthService.hasValidAccessToken.and.returnValue(true);

      service.runInitialLoginSequence().then(() => {
        expect(mockOAuthService.tryLogin).toHaveBeenCalled();
        expect(mockOAuthService.silentRefresh).not.toHaveBeenCalled();
      });
    }));

    it('should silent login via refresh and navigate to state url when required user interaction', waitForAsync (() => {
      mockOAuthService.state = '/some/url';

      service.runInitialLoginSequence().then(() => {
        expect(mockOAuthService.tryLogin).toHaveBeenCalled();
        expect(mockOAuthService.silentRefresh).toHaveBeenCalled();
        expect(router.navigateByUrl).toHaveBeenCalledWith('/some/url');
      });
    }));

    it('should silent login via refresh without redirect', waitForAsync (() => {
      service.runInitialLoginSequence().then(() => {
        expect(mockOAuthService.tryLogin).toHaveBeenCalled();
        expect(mockOAuthService.silentRefresh).toHaveBeenCalled();
        expect(router.navigateByUrl).not.toHaveBeenCalled();
      });
    }));
  });
});
