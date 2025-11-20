// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // ForgeRock OAuth2/OIDC Configuration
  auth: {
    // ForgeRock issuer URL - format: https://{host}/am/oauth2/realms/root/realms/{realm}
    // Example: 'https://openam.example.com/am/oauth2/realms/root/realms/myrealm'
    // Or for root realm: 'https://openam.example.com/am/oauth2'
    issuer: 'https://your-forgerock-instance.com/am/oauth2',

    // OAuth2 Client ID (registered in ForgeRock)
    clientId: 'angular-spa-client',

    // Scopes to request from ForgeRock
    scope: 'openid profile email',

    // Resource server URLs (where to send access tokens)
    resourceServerUrls: [
      'https://your-api.com/api',
      'https://your-forgerock-instance.com/api'
    ]
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
