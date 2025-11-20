import { OAuthModuleConfig } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

export const authModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    // URLs where the access token should be automatically included
    // These URLs must match your backend API endpoints
    allowedUrls: environment.auth.resourceServerUrls,
    sendAccessToken: true,
  }
};
