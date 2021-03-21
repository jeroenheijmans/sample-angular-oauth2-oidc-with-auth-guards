import { LoginOptions, OAuthEvent, OAuthService, OAuthSuccessEvent, ParsedIdToken, TokenResponse, UserInfo } from 'angular-oauth2-oidc';
import { Observable, Subject } from 'rxjs';

export class MockOAuthService implements Partial<OAuthService> {

  private _events = new Subject<OAuthEvent>();
  events: Observable<OAuthEvent> = this._events.asObservable();
  state?: string;

  private _isTokenValid = false;

  /**
   * Helper method to simulate events
   *
   * @param event
   */
  emulateEvent(event: OAuthEvent) {
    this._events.next(event);
  }

  /**
   * Helper method to pass value to hasValidAccessToken
   *
   * @param value
   */
  updateTokenValidity(value: boolean) {
    this._isTokenValid = value;
  }

  authorizationHeader(): string {
    return '';
  }

  checkSession(): void {
  }

  createAndSaveNonce(): Promise<string> {
    return Promise.resolve('');
  }

  getAccessToken(): string {
    return '';
  }

  getAccessTokenExpiration(): number {
    return 0;
  }

  getCustomTokenResponseProperty(requestedProperty: string): any {
  }

  getGrantedScopes(): Record<string, unknown> {
    return { };
  }

  getIdToken(): string {
    return '';
  }

  getIdTokenExpiration(): number {
    return 0;
  }

  getIdentityClaims(): Record<string, unknown> {
    return { };
  }

  getRefreshToken(): string {
    return '';
  }

  hasValidAccessToken(): boolean {
    return this._isTokenValid;
  }

  hasValidIdToken(): boolean {
    return false;
  }

  initCodeFlow(additionalState?: string, params?: Record<string, unknown>): void {
  }

  initImplicitFlow(additionalState?: string, params?: string | Record<string, unknown>): void {
  }

  initImplicitFlowInPopup(options?: { height?: number; width?: number }): Promise<unknown> {
    return new Promise((_) => { });
  }

  initImplicitFlowInternal(additionalState?: string, params?: string | Record<string, unknown>): void {
  }

  initLoginFlow(additionalState?: string, params?: Record<string, unknown>): void {
  }

  initLoginFlowInPopup(options?: { height?: number; width?: number }): Promise<unknown> {
    return new Promise((_) => { });
  }

  loadDiscoveryDocument(fullUrl?: string): Promise<OAuthSuccessEvent> {
    return new Promise((_) => { });
  }

  loadUserProfile(): Promise<UserInfo> {
    return new Promise((_) => { });
  }

  logOut(): void {

  }

  processIdToken(idToken: string, accessToken: string, skipNonceCheck?: boolean): Promise<ParsedIdToken> {
    return new Promise((_) => { });
  }

  refreshToken(): Promise<TokenResponse> {
    return new Promise((_) => { });
  }

  resetImplicitFlow(): void {
  }


  silentRefresh(params?: Record<string, unknown>, noPrompt?: boolean): Promise<OAuthEvent> {
    return new Promise((_) => { });
  }

  setupAutomaticSilentRefresh(params?: Record<string, unknown>, listenTo?: 'access_token' | 'id_token' | 'any', noPrompt?: boolean): void {
  }

  stopAutomaticRefresh(): void {
  }

  tryLogin(options?: LoginOptions): Promise<boolean> {
    return Promise.resolve(false);
  }

  tryLoginCodeFlow(options?: LoginOptions): Promise<void> {
    return new Promise((_) => { });
  }

  tryLoginImplicitFlow(options?: LoginOptions): Promise<boolean> {
    return Promise.resolve(false);
  }

}
