import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { OAuthService } from 'angular-oauth2-oidc';
import { MockOAuthService } from '../../testing/mocks';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockService: MockOAuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        {provide: OAuthService, useClass: MockOAuthService}
      ]
    });

    service = TestBed.inject(AuthService);
    mockService = <any>TestBed.inject(OAuthService) as MockOAuthService;
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl').and.stub();
  });

  it('should react on OAuthService events', () => {
    spyOn(mockService, 'hasValidAccessToken');
    spyOn(mockService, 'loadUserProfile');

    mockService.emulateEvent({type: 'silently_refreshed'});
    mockService.emulateEvent({type: 'token_received'});

    expect(mockService.loadUserProfile).toHaveBeenCalled();
    expect(mockService.hasValidAccessToken).toHaveBeenCalledTimes(2);

    mockService.emulateEvent({type: 'session_terminated'});
    mockService.emulateEvent({type: 'session_error'});

    expect(router.navigateByUrl).toHaveBeenCalledTimes(2);
  });

  it('should handle storage event and update isAuthenticated status', () => {
    mockService.updateTokenValidity(false);

    window.dispatchEvent(new StorageEvent('storage', {key: 'access_token'}));

    expect(router.navigateByUrl).toHaveBeenCalled();
    service.isAuthenticated$.subscribe(isAuthenticated => expect(isAuthenticated).toBe(false));

  });

  describe('runInitialLoginSequence', () => {
    it('should login via hash if token is valid', async (() => {
      spyOn(mockService, 'tryLogin');
      spyOn(mockService, 'silentRefresh');
      mockService.updateTokenValidity(true);

      service.runInitialLoginSequence().then(() => {
        expect(mockService.tryLogin).toHaveBeenCalled();
        expect(mockService.silentRefresh).not.toHaveBeenCalled();
      });
    }));

    it('should silent login via refresh and navigate to state url when required user interaction', async (() => {
      spyOn(mockService, 'tryLogin');
      spyOn(mockService, 'silentRefresh').and.returnValue(Promise.resolve({
        type: 'silently_refreshed',
        reason: {error: 'login_required'}
      }));
      mockService.state = '/some/url';

      service.runInitialLoginSequence().then(() => {
        expect(mockService.tryLogin).toHaveBeenCalled();
        expect(mockService.silentRefresh).toHaveBeenCalled();
        expect(router.navigateByUrl).toHaveBeenCalledWith('/some/url');
      });
    }));

    it('should silent login via refresh without redirect', async (() => {
      spyOn(mockService, 'tryLogin');
      spyOn(mockService, 'silentRefresh');

      service.runInitialLoginSequence().then(() => {
        expect(mockService.tryLogin).toHaveBeenCalled();
        expect(mockService.silentRefresh).toHaveBeenCalled();
        expect(router.navigateByUrl).not.toHaveBeenCalled();
      });
    }));
  });
});
