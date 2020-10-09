import { LoginOptions, OAuthEvent, OAuthService, OAuthSuccessEvent, ParsedIdToken, TokenResponse, UserInfo } from 'angular-oauth2-oidc';
import { Observable, Subject } from 'rxjs';

export class MockOAuthService implements Partial<OAuthService> {

  private _events = new Subject<OAuthEvent>();
  events: Observable<OAuthEvent> = this._events.asObservable();

  state?: string;

  private _isTokenValid = false;

  /**
   * Helper method to simulate events
   * @param event
   */
  emulateEvent(event: OAuthEvent) {
    this._events.next(event);
  }

  /**
   * Helper method to pass value to hasValidAccessToken
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

  getGrantedScopes(): object {
    return undefined;
  }

  getIdToken(): string {
    return '';
  }

  getIdTokenExpiration(): number {
    return 0;
  }

  getIdentityClaims(): object {
    return undefined;
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

  initCodeFlow(additionalState?: string, params?: {}): void {
  }

  initImplicitFlow(additionalState?: string, params?: string | object): void {
  }

  initImplicitFlowInPopup(options?: { height?: number; width?: number }): Promise<unknown> {
    return Promise.resolve(undefined);
  }

  initImplicitFlowInternal(additionalState?: string, params?: string | object): void {
  }

  initLoginFlow(additionalState?: string, params?: {}): void {
  }

  initLoginFlowInPopup(options?: { height?: number; width?: number }): Promise<unknown> {
    return Promise.resolve(undefined);
  }

  loadDiscoveryDocument(fullUrl?: string): Promise<OAuthSuccessEvent> {
    return Promise.resolve(undefined);
  }

  loadUserProfile(): Promise<UserInfo> {
    return Promise.resolve(undefined);
  }

  logOut(): void {

  }

  processIdToken(idToken: string, accessToken: string, skipNonceCheck?: boolean): Promise<ParsedIdToken> {
    return Promise.resolve(undefined);
  }

  refreshToken(): Promise<TokenResponse> {
    return Promise.resolve(undefined);
  }

  resetImplicitFlow(): void {
  }


  silentRefresh(params?: object, noPrompt?: boolean): Promise<OAuthEvent> {
    return Promise.resolve(undefined);
  }

  setupAutomaticSilentRefresh(params?: object, listenTo?: 'access_token' | 'id_token' | 'any', noPrompt?: boolean): void {
  }

  stopAutomaticRefresh(): void {
  }

  tryLogin(options?: LoginOptions): Promise<boolean> {
    return Promise.resolve(false);
  }

  tryLoginCodeFlow(options?: LoginOptions): Promise<void> {
    return Promise.resolve(undefined);
  }

  tryLoginImplicitFlow(options?: LoginOptions): Promise<boolean> {
    return Promise.resolve(false);
  }

}
