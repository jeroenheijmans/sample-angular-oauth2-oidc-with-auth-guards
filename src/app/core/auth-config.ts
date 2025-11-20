import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

export const authConfig: AuthConfig = {
  // ForgeRock issuer URL (from environment)
  issuer: environment.auth.issuer,

  // OAuth2 Client ID (from environment)
  clientId: environment.auth.clientId,

  // Authorization Code Flow (PKCE is automatic with angular-oauth2-oidc)
  responseType: 'code',

  // Redirect URIs (must be whitelisted in ForgeRock client config)
  redirectUri: window.location.origin + '/',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

  // Scopes to request (from environment)
  scope: environment.auth.scope,

  // Silent refresh configuration
  useSilentRefresh: true,
  silentRefreshTimeout: 5000,
  timeoutFactor: 0.75, // Refresh when 75% of token lifetime has passed

  // Session management
  sessionChecksEnabled: true,

  // Security settings
  requireHttps: true, // Force HTTPS in production

  // Debug settings (disable in production)
  showDebugInformation: !environment.production,

  // Compatibility settings
  clearHashAfterLogin: false,

  // ForgeRock compatibility - some ForgeRock instances may not have all standard OIDC discovery fields
  strictDiscoveryDocumentValidation: false,

  // Use 'semicolon' separator for better compatibility
  nonceStateSeparator: 'semicolon'
};
