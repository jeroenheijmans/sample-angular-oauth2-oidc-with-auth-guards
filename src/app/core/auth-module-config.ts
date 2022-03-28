import { OAuthModuleConfig } from 'angular-oauth2-oidc';

export const authModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    allowedUrls: ['https://demo.duendesoftware.com/api'],
    sendAccessToken: true,
  }
};
