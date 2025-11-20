export const environment = {
  production: true,

  // ForgeRock OAuth2/OIDC Configuration - PRODUCTION
  auth: {
    // Production ForgeRock issuer URL
    issuer: 'https://prod-forgerock.example.com/am/oauth2',

    // Production OAuth2 Client ID
    clientId: 'angular-spa-client-prod',

    // Scopes to request from ForgeRock
    scope: 'openid profile email',

    // Production resource server URLs
    resourceServerUrls: [
      'https://api.example.com/api',
      'https://prod-forgerock.example.com/api'
    ]
  }
};
